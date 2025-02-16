import classNames from 'classnames';
import {ReactNode, FunctionComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {IClassName} from '../../utils/ClassNameUtils';
import {TabSelectors} from './TabSelectors';

export interface ITabPaneProps {
    groupId?: string;
    id?: string;
    className?: IClassName;
    children?: ReactNode;
    isActive?: boolean;
}

const makeMapStateToProps = () => createStructuredSelector({isActive: TabSelectors.getIsTabSelected});

export const TabPane: FunctionComponent<ITabPaneProps> = ({id, className, isActive, children}) => (
    <div
        id={`panel-${id}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`tab-${id}`}
        aria-hidden={!isActive}
        className={classNames('tab-pane', className, {active: isActive})}
    >
        {children}
    </div>
);
export const TabPaneConnected = connect<
    ReturnType<ReturnType<typeof makeMapStateToProps>>,
    Record<string, never>,
    ITabPaneProps
>(makeMapStateToProps)(TabPane as any);
