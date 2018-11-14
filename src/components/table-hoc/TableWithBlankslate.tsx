import * as React from 'react';
import {keys} from 'ts-transformer-keys/index';
import * as _ from 'underscore';
import {IReactVaporState} from '../../ReactVapor';
import {ReduxConnect} from '../../utils/ReduxUtils';
import {BlankSlate, IBlankSlateProps} from '../blankSlate/BlankSlate';
import {ITableHOCOwnProps} from './TableHOC';

export interface ITableWithBlankSlateStateProps {
    isEmpty: boolean;
}

export interface ITableWithBlankSlateProps extends Partial<ITableWithBlankSlateStateProps> {}

const TableWithBlankSlatePropsToOmit = keys<ITableWithBlankSlateStateProps>();

export const tableWithBlankSlate = (config: IBlankSlateProps = {}) => (Component: React.ComponentClass<ITableHOCOwnProps>): React.ComponentClass<ITableWithBlankSlateProps & React.HTMLAttributes<HTMLTableElement>> => {
    const mapStateToProps = (state: IReactVaporState, ownProps: ITableHOCOwnProps): ITableWithBlankSlateStateProps | ITableHOCOwnProps => {
        const isEmpty = ownProps.data !== null && (!ownProps.data || ownProps.data.length === 0);
        return {
            isEmpty,
            data: isEmpty ? null : ownProps.data,
        };
    };

    @ReduxConnect(mapStateToProps)
    class TableWithBlankSlate extends React.Component<ITableHOCOwnProps & ITableWithBlankSlateProps> {

        render() {
            const newProps = {
                ..._.omit(this.props, [...TableWithBlankSlatePropsToOmit]),
                renderData: this.props.isEmpty ? (): any => null : this.props.renderData,
            };
            return (
                <Component {...newProps}>
                    {this.props.isEmpty ? <BlankSlate {...config} /> : this.props.children}
                </Component>
            );
        }
    }

    return TableWithBlankSlate;
};
