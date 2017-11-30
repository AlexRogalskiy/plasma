import { TableConnected } from '../TableConnected';
import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import * as _ from 'underscore';
import { generateTableId, ITableData } from '../TableReducers';
import { IDropdownOption } from '../../dropdownSearch/DropdownSearch';

const generateText = () => loremIpsum({ count: 1, sentenceUpperBound: 3 });

const tableDataById = _.range(0, 100).reduce((obj, number) => ({
  ...obj,
  ['row' + number]: {
    id: 'row' + number,
    attribute1: generateText(),
    attribute2: generateText(),
    attribute3: generateText(),
    attribute4: generateText(),
  }
}), {} as { [id: string]: any });

const perPageNumbers = [20, 40, 60];

const predicateOptionsAttribute4 = [{ value: 'ALL' }, ..._.keys(tableDataById).reduce((arr: IDropdownOption[], id: string) => [...arr, { value: tableDataById[id].attribute4 }], [])].slice(0, 10);
const predicateOptionsAttribute3 = [{ value: 'ALL' }, ..._.keys(tableDataById).reduce((arr: IDropdownOption[], id: string) => [...arr, { value: tableDataById[id].attribute3 }], [])].slice(0, 10);

const tableData: ITableData = {
  byId: tableDataById,
  allIds: _.keys(tableDataById),
  displayedIds: _.keys(tableDataById).slice(0, 10),
  totalEntries: _.keys(tableDataById).length,
  totalPages: Math.ceil(_.keys(tableDataById).length / perPageNumbers[0]),
};

const rawDataToTableData = (data: any): ITableData => JSON.parse(data).entries.slice(0, 1).reduce((tableData: ITableData, entry: any) => {
  return {
    byId: {
      ...tableData.byId,
      [entry.API]: {
        id: entry.API,
        attribute1: entry.API,
        ...entry,
      }
    },
    allIds: [...tableData.allIds, entry.API],
    displayedIds: [...tableData.displayedIds, entry.API],
  };
}, { byId: {}, allIds: [], displayedIds: [] });

export class TableExamples extends React.Component<any, any> {
  render() {
    return (
      <div className='mt2'>
        <div className='form-group'>
          <label className='form-control-label'>Table</label>
          <TableConnected
            id={generateTableId()}
            serverMode={{
              url: () => 'https://raw.githubusercontent.com/toddmotto/public-apis/master/json/entries.json',
              rawDataToTableData,
            }}
            initialTableData={tableData}
            headingAttributes={[
              {
                attributeName: 'attribute1',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
              {
                attributeName: 'attribute4',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
              {
                attributeName: 'attribute3',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
            ]}
            actionBar={{
              id: 'nice',
              extraContainerClasses: ['mod-border-top'],
            }}
            predicates={[
              { props: { id: 'predicaaaaate', maxWidth: 260, defaultSelectedOption: { value: 'ALL' }, defaultOptions: predicateOptionsAttribute4 }, attributeName: 'attribute4', attributeNameFormatter: (attributeName: string) => attributeName },
              { props: { id: 'predicaaaaaate', maxWidth: 260, defaultSelectedOption: { value: 'ALL' }, defaultOptions: predicateOptionsAttribute3 }, attributeName: 'attribute3', attributeNameFormatter: (attributeName: string) => attributeName },
            ]}
            filter={{ id: 'filtaaaaaa', containerClasses: ['ml1'] }}
            blankSlates={{
              noResults: { title: 'Oh no! No results!' },
              noResultsOnError: { title: 'i am on error!' },
            }}
            navigationChildren={{ perPageNumbers }}
            lastUpdated={{ id: 'hello' }}
          />
        </div>
        <div className='form-group'>
          <label className='form-control-label'>Table</label>
          <TableConnected
            id={generateTableId()}
            initialTableData={tableData}
            headingAttributes={[
              {
                attributeName: 'attribute1',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
              {
                attributeName: 'attribute4',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
              {
                attributeName: 'attribute3',
                titleFormatter: _.identity,
                sort: true,
                attributeFormatter: _.identity,
              },
            ]}
            actionBar={{
              id: 'nice',
              extraContainerClasses: ['mod-border-top'],
            }}
            predicates={[
              { props: { id: 'predicaaaaate', maxWidth: 260, defaultSelectedOption: { value: 'ALL' }, defaultOptions: predicateOptionsAttribute4 }, attributeName: 'attribute4', attributeNameFormatter: (attributeName: string) => attributeName },
              { props: { id: 'predicaaaaaate', maxWidth: 260, defaultSelectedOption: { value: 'ALL' }, defaultOptions: predicateOptionsAttribute3 }, attributeName: 'attribute3', attributeNameFormatter: (attributeName: string) => attributeName },
            ]}
            filter={{ id: 'filtaaaaaa', containerClasses: ['ml1'] }}
            blankSlates={{
              noResults: { title: 'Oh no! No results!' },
            }}
            navigationChildren={{ perPageNumbers: [5, 40, 60] }}
            lastUpdated={{ id: 'hello' }}
          />
        </div>

      </div>
    );
  }
}
