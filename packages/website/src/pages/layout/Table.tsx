import code from '@examples/Table/main.example.tsx';
import withLoading from '@examples/Table/withLoading.example.tsx';
import withBlankslate from '@examples/Table/withBlankslate.example.tsx';

import * as React from 'react';

import {PageLayout} from '../../building-blocs/PageLayout';

const isServer = `
    import * as React from 'react';
    import {Badge, TableHOC, TableRowConnected} from '@coveord/plasma-react';

    export default () => (
        <TableHOC
            id={'tableId'}
            className="table"
            data={data}
            renderBody={() => renderRows}
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
        <TableRowConnected id={item.id} tableId={'tableId'} key={item.id}>
            <td key="city">{item.city}</td>
            <td key="username">{item.username.toLowerCase()}</td>
            <td>
                <Badge label={'🥔 King'} extraClasses={['mod-small mod-success']} />
            </td>
        </TableRowConnected>
    ));
`;

const TableExamples = () => (
    <PageLayout
        id="TableHOC"
        componentSourcePath="/table-hoc/TableHOC.tsx"
        title="Table"
        section="Layout"
        description="A table displays large quantities of items or data in a list format. Filtering features and actions may be added."
        code={code}
        examples={{
            withLoading: {code: withLoading, title: 'Loading table'},
            withBlankslate: {code: withBlankslate, title: 'Table blankslate'},
        }}
    />
);
export default TableExamples;
