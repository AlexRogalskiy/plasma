import * as React from 'react';
import {
    ConfigSupplier,
    IDatesSelectionBox,
    ITableWithDatePickerConfig,
    TableHOC,
    TableRowConnected,
    tableWithDatePicker,
} from '@coveord/plasma-react';
import {compose} from 'redux';
import moment from 'moment';
import {loremIpsum} from 'lorem-ipsum';

export default () => (
    <TableComposed
        id={'tableId'}
        className="table"
        data={dataForRows}
        renderBody={(data: any) => generateRows(data, 'tableId')}
        tableHeader={renderHeader()}
        showBorderTop
        showBorderBottom
    />
);

const selectionOptions: IDatesSelectionBox[] = [
    {
        title: 'Select a date range',
        quickOptions: [
            {
                label: 'Last Week',
                value: () => moment().subtract(1, 'week').toDate().toString() + '%' + new Date().toString(),
            },
            {
                label: 'Last day',
                value: () => moment().subtract(1, 'day').toDate().toString() + '%' + new Date().toString(),
            },
        ],
        isRange: true,
        withTime: false,
        hasSetToNowButton: true,
    },
];

const tableDatePickerConfig: ConfigSupplier<ITableWithDatePickerConfig> = () => ({
    datesSelectionBoxes: selectionOptions,
    initialDateRange: [moment().subtract(75, 'years').toDate(), moment().toDate()],
});

const TableComposed = compose<any>(tableWithDatePicker(tableDatePickerConfig))(TableHOC);

const renderHeader = () => (
    <thead>
        <tr>
            <th>City</th>
            <th>Username</th>
            <th>Password</th>
        </tr>
    </thead>
);

const generateRows = (allData: IExampleRowData[], tableId: string) =>
    allData?.map((data: IExampleRowData) => (
        <TableRowConnected id={data.id} tableId={tableId} key={data.id}>
            <td key="city">{data.city}</td>
            <td key="username">{data.username.toLowerCase()}</td>
            <td key="password">{data.password.toLowerCase()}</td>
        </TableRowConnected>
    ));

interface IExampleRowData {
    city: string;
    username: string;
    password: string;
    id: string;
}

const generateData = (length: number) => {
    const data: any = [];
    Array.from(Array(length)).map(() => {
        data.push({
            city: loremIpsum({count: 1, units: 'word'}),
            username: loremIpsum({count: 2, units: 'word'}),
            password: loremIpsum({count: 1, units: 'word'}),
            id: loremIpsum({count: 1, units: 'word'}),
        });
    });
    return data;
};

const dataForRows = generateData(5);
