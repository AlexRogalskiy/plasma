import {FunctionComponent} from 'react';
import {compose} from 'redux';

import {
    Badge,
    BadgeType,
    TableHOC,
    TableRowConnected,
    tableWithBlankSlate,
    tableWithNewPagination,
} from '@coveord/plasma-react';

const TABLE_ID: string = 'withBlankslateTableId';

export default () => <WithBlankSlate />;

const WithBlankSlate: FunctionComponent = () => (
    <>
        <TableComposed
            id={TABLE_ID}
            className="table"
            data={[]}
            renderBody={() => renderRows}
            tableHeader={renderHeader()}
        />
    </>
);

const TableComposed = compose(
    tableWithBlankSlate({title: 'No data caused the table to be empty'}),
    tableWithNewPagination()
)(TableHOC);

const renderHeader = () => (
    <thead>
        <tr>
            <th>City</th>
            <th>Username</th>
            <th>Badge</th>
        </tr>
    </thead>
);

const data = [
    {
        city: 'Québec',
        username: 'germinator',
        id: 'id-1',
    },
    {
        city: 'Ottawa',
        username: 'canitalktoyouaboutvisualtesting',
        id: 'id-2',
    },
    {
        city: 'Toronto',
        username: 'kienposter',
        id: 'id-3',
    },
    {
        city: 'Montréal',
        username: 'notfound',
        id: 'id-3',
    },
];

const renderRows = data?.map((item) => (
    <TableRowConnected id={item.id} tableId={TABLE_ID} key={item.id}>
        <td key="city">{item.city}</td>
        <td key="username">{item.username.toLowerCase()}</td>
        <td>
            <Badge label={'King'} icon={'cloud'} isSmall type={BadgeType.Success} />
        </td>
    </TableRowConnected>
));
