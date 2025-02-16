import {connect} from 'react-redux';
import {IReduxActionsPayload} from '../../PlasmaState';
import {IReduxAction, ReduxUtils} from '../../utils/ReduxUtils';
import {ILoadingDispatchProps, ILoadingOwnProps, Loading} from './Loading';
import {addLoading, removeLoading} from './LoadingActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (
    dispatch: (action: IReduxAction<IReduxActionsPayload>) => void,
    ownProps: ILoadingOwnProps
): ILoadingDispatchProps => ({
    onRender: () => dispatch(addLoading(ownProps.id)),
    onDestroy: () => dispatch(removeLoading(ownProps.id)),
});

export const LoadingConnected = connect(mapStateToProps, mapDispatchToProps, ReduxUtils.mergeProps)(Loading);
