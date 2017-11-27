import { ITableState } from './TableReducers';
import { convertUndefinedAndNullToEmptyString } from '../../utils/FalsyValuesUtils';
import { TABLE_PREDICATE_DEFAULT_VALUE, TableSortingOrder, TableChildComponent } from './TableConstants';
import * as _ from 'underscore';
import { ITableOwnProps } from './Table';
import { modifyState } from './TableActions';
import { turnOffLoading } from '../loading/LoadingActions';
import { getLoadingIds, getChildComponentId } from './TableUtils';
import { changeLastUpdated } from '../lastUpdated/LastUpdatedActions';


export const TableDataModifyerMethods = {
  default(tableState: ITableState): ITableState {
    const tableDataById = tableState.data.byId;
    let nextDisplayedDataIds = tableState.data.allIds;

    // predicates default logic
    if (tableState.predicates) {
      _.pairs(tableState.predicates).forEach((keyValuePair: string[]) => {
        const attributeName = keyValuePair[0];
        const attributeValue = keyValuePair[1];

        if (attributeValue !== TABLE_PREDICATE_DEFAULT_VALUE) {
          nextDisplayedDataIds = nextDisplayedDataIds.filter((dataId: string) =>
            tableDataById[dataId][attributeName] === attributeValue);
        }
      });
    }

    // filter default logic
    if (tableState.filter) {
      tableState.headingAttributes.forEach((headingAttribute: string) => {
        nextDisplayedDataIds = nextDisplayedDataIds.filter((dataId: string) => {
          const cleanAttributeValue = convertUndefinedAndNullToEmptyString(tableDataById[dataId][headingAttribute]);
          _.contains(
            cleanAttributeValue.toString().toLowerCase(),
            tableState.filter.toLowerCase(),
          );
        });
      });
    }

    // pagination logic
    const startingIndex = tableState.page * tableState.perPage;
    const endingIndex = startingIndex + tableState.perPage;
    nextDisplayedDataIds = nextDisplayedDataIds.slice(startingIndex, endingIndex);

    // sort default logic
    const { sortState } = tableState;
    if (sortState && sortState.order !== TableSortingOrder.UNSORTED) {
      nextDisplayedDataIds = _.sortBy(
        nextDisplayedDataIds,
        (displayedId: string) => {
          const cleanAttributeValue = convertUndefinedAndNullToEmptyString(tableDataById[displayedId][sortState.attribute]);
          return cleanAttributeValue.toString().toLowerCase();
        },
      );

      if (sortState.order === TableSortingOrder.DESCENDING) {
        nextDisplayedDataIds.reverse();
      }
    }

    return {
      ...tableState,
      data: {
        ...tableState.data,
        displayedIds: nextDisplayedDataIds,
      },
    };
  },
  thunkDefault(tableOwnProps: ITableOwnProps) {
    return (dispatch: any) => {
      dispatch(modifyState(tableOwnProps.id, TableDataModifyerMethods.default));
      dispatch(turnOffLoading(getLoadingIds(tableOwnProps.id)));
      dispatch(changeLastUpdated(getChildComponentId(tableOwnProps.id, TableChildComponent.LAST_UPDATED)));
    };
  },
  server(tableState: ITableState): ITableState {
    // todo
    return undefined;
  },
  thunkServer(tableOwnProps: ITableOwnProps) {
    return (dispatch: any) => {
      // todo
    };
  }
};
