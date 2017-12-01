import { ITableState, DEFAULT_TABLE_DATA, ITablesState } from './TableReducers';
import { convertUndefinedAndNullToEmptyString } from '../../utils/FalsyValuesUtils';
import { TABLE_PREDICATE_DEFAULT_VALUE, TableSortingOrder, TableChildComponent } from './TableConstants';
import * as _ from 'underscore';
import { ITableOwnProps, ITableHeadingAttribute } from './Table';
import { turnOnLoading, turnOffLoading } from '../loading/LoadingActions';
import { getLoadingIds, getTableChildComponentId } from './TableUtils';
import { changeLastUpdated } from '../lastUpdated/LastUpdatedActions';
import { setIsInError, modifyState } from './TableActions';
import { addActionsToActionBar } from '../actions/ActionBarActions';
import { unselectAllRows } from './TableRowActions';
import * as $ from 'jquery';

export const dispatchPreTableStateModification = (tableOwnProps: ITableOwnProps, dispatch: any) => {
  dispatch(unselectAllRows(tableOwnProps.id));
  dispatch(
    addActionsToActionBar(
      getTableChildComponentId(tableOwnProps.id, TableChildComponent.ACTION_BAR),
      [],
    ),
  );
  dispatch(turnOnLoading(getLoadingIds(tableOwnProps.id), tableOwnProps.id));
};

export const dispatchPostTableStateModification = (tableOwnProps: ITableOwnProps, dispatch: any) => {
  dispatch(turnOffLoading(getLoadingIds(tableOwnProps.id), tableOwnProps.id));
  dispatch(changeLastUpdated(getTableChildComponentId(tableOwnProps.id, TableChildComponent.LAST_UPDATED)));
};

export const defaultTableStateModifyer = (
  tableOwnProps: ITableOwnProps,
  shouldResetPage: boolean,
): ((tableState: ITableState) => ITableState) => {
  return (tableState: ITableState) => {
    const tableDataById = tableState.data.byId;

    let totalPages: number;
    let totalEntries: number;
    let nextDisplayedIds = [...tableState.data.allIds];

    // predicates default logic
    if (!_.isEmpty(tableState.predicates)) {
      _.pairs(tableState.predicates).forEach((keyValuePair: string[]) => {
        const attributeName = keyValuePair[0];
        const attributeValue = keyValuePair[1];

        if (attributeValue !== TABLE_PREDICATE_DEFAULT_VALUE) {
          nextDisplayedIds = nextDisplayedIds.filter((dataId: string) =>
            tableDataById[dataId][attributeName] === attributeValue);
        }
      });
    }

    // filter default logic
    if (tableState.filter) {
      const filterDefault = (dataId: string): boolean => {
        let shouldKeep = false;

        tableOwnProps.headingAttributes.forEach((headingAttribute: ITableHeadingAttribute) => {
          const { attributeName, attributeFormatter } = headingAttribute;
          const attributeValue = tableDataById[dataId][attributeName];
          const attributeValueToUse = attributeFormatter ? attributeFormatter(attributeValue) : attributeValue;
          shouldKeep =
            shouldKeep
            || attributeValueToUse
              .toString()
              .toLowerCase()
              .indexOf(tableState.filter.toLowerCase()) > -1;
        });

        return shouldKeep;
      };

      const filterMethod = tableOwnProps.filterMethod
        ? (dataId: string): boolean => tableOwnProps.filterMethod(tableDataById[dataId], tableOwnProps)
        : filterDefault;

      nextDisplayedIds = nextDisplayedIds.filter(filterMethod);
    }

    totalEntries = nextDisplayedIds.length;
    totalPages = Math.ceil(totalEntries / tableState.perPage);

    // pagination logic
    const startingIndex = tableState.page * tableState.perPage;
    const endingIndex = startingIndex + tableState.perPage;
    nextDisplayedIds = nextDisplayedIds.slice(startingIndex, endingIndex);

    // sort default logic
    const { sortState } = tableState;
    if (sortState && sortState.order !== TableSortingOrder.UNSORTED) {
      const defaultSortBy = (displayedId: string) => {
        const cleanAttributeValue = convertUndefinedAndNullToEmptyString(tableDataById[displayedId][sortState.attribute]);
        return cleanAttributeValue.toString().toLowerCase();
      };

      const sortByMethod = _.findWhere(tableOwnProps.headingAttributes, { attributeName: sortState.attribute }).sortByMethod || defaultSortBy;

      nextDisplayedIds = _.sortBy(nextDisplayedIds, sortByMethod);

      if (sortState.order === TableSortingOrder.DESCENDING) {
        nextDisplayedIds.reverse();
      }
    }

    return {
      ...tableState,
      data: {
        ...tableState.data,
        displayedIds: nextDisplayedIds,
        totalEntries,
        totalPages,
      },
      page: shouldResetPage ? 0 : tableState.page,
    };
  };
};

export const defaultTableStateModifyerThunk = (tableOwnProps: ITableOwnProps, shouldResetPage: boolean) => {
  return (dispatch: any) => {
    dispatchPreTableStateModification(tableOwnProps, dispatch);
    dispatch(modifyState(tableOwnProps.id, defaultTableStateModifyer(tableOwnProps, shouldResetPage)));
    dispatchPostTableStateModification(tableOwnProps, dispatch);
  };
};

export const serverTableStateModifyerThunk = (tableOwnProps: ITableOwnProps, shouldResetPage: boolean) => {
  return (dispatch: any, getState: () => { [globalStateProp: string]: any; tables: ITablesState; }) => {
    dispatchPreTableStateModification(tableOwnProps, dispatch);
    $.get(tableOwnProps.serverMode.url(getState().tables[tableOwnProps.id], tableOwnProps))
      .done(data => {
        dispatch(
          modifyState(
            tableOwnProps.id,
            (tableState: ITableState) =>
              ({ ...tableState, data: tableOwnProps.serverMode.rawDataToTableData(data), page: shouldResetPage ? 0 : tableState.page }),
          )
        );
      })
      .fail(error => {
        dispatch(setIsInError(tableOwnProps.id, true));
        dispatch(modifyState(
          tableOwnProps.id,
          (tableState: ITableState) => ({ ...tableState, data: DEFAULT_TABLE_DATA }),
        ));
      })
      .always(() => {
        dispatchPostTableStateModification(tableOwnProps, dispatch);
      });
  };
};
