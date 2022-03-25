import * as React from 'react';
import {Badge, TableHOC, TableRowConnected} from '@coveord/plasma-react';
import {loremIpsum} from 'lorem-ipsum';

export default () => (
    <TableHOC
        id={'tableId'}
        className="table"
        data={dataForRows}
        renderBody={(data: any) => generateRows(data, 'tableId')}
        tableHeader={renderHeader()}
        showBorderTop
        showBorderBottom
    />
);

const renderHeader = () => (
    <thead>
        <tr>
            <th>City</th>
            <th>Username</th>
            <th>Password</th>
            <th>Badge</th>
        </tr>
    </thead>
);

const generateRows = (allData: IExampleRowData[], tableId: string) =>
    allData?.map((data: IExampleRowData) => (
        <TableRowConnected id={data.id} tableId={tableId} key={data.id}>
            <td key="city">{data.city}</td>
            <td key="username">{data.username.toLowerCase()}</td>
            <td key="password">{data.password.toLowerCase()}</td>
            <td>
                <Badge label={'🥔 King'} extraClasses={['mod-small mod-success']} />
            </td>
        </TableRowConnected>
    ));

interface IExampleRowData {
    city: string;
    username: string;
    password: string;
    id: string;
}

const generateData = (length: number): any[] =>
    Array.from(Array(length)).map(() => ({
        city: loremIpsum({count: 1, units: 'word'}),
        username: loremIpsum({count: 2, units: 'word'}),
        password: loremIpsum({count: 1, units: 'word'}),
        id: loremIpsum({count: 1, units: 'word'}),
    }));

const dataForRows = generateData(5);
