import classNames from 'classnames';
import {svg} from '@coveord/plasma-style';
import * as React from 'react';
import {connect} from 'react-redux';
import {removeValueStringList} from '../../../reusableState/customList/StringListActions';
import {ConfigSupplier, HocUtils} from '../../../utils/HocUtils';
import {IDispatch} from '../../../utils/ReduxUtils';
import {Button, IButtonProps} from '../../button/Button';
import {Svg} from '../../svg/Svg';
import {
    IMultilineBoxDispatchProps,
    IMultilineBoxOwnProps,
    IMultilineParentProps,
    IMultilineSingleBoxProps,
    MultilineBox,
} from '../MultilineBox';

export interface IMultilineBoxWithRemoveButtonSupplierProps<T = any> {
    containerNode?: (
        child: React.ReactNode,
        getRemoveButton: (props?: Partial<IButtonProps>) => React.ReactNode,
        data: Array<IMultilineSingleBoxProps<T>>,
        index: number
    ) => React.ReactNode;
}

export interface IMultilineBoxWithRemoveButtonProps<T>
    extends IMultilineBoxWithRemoveButtonSupplierProps<T>,
        IMultilineBoxOwnProps<T>,
        Partial<IMultilineBoxDispatchProps> {}

const defaultContainerNode = (
    child: React.ReactNode,
    getRemoveButton: (props?: Partial<IButtonProps>) => React.ReactNode,
    data: IMultilineSingleBoxProps[],
    index: number
) => (
    <React.Fragment key={`${(data.length && data[index].id) || index}RemoveButton`}>
        {child}
        {getRemoveButton()}
    </React.Fragment>
);

export const defaultMultilineBoxRemoveButtonClasses: string = 'center-align mod-no-border';

export const multilineBoxWithRemoveButton = (
    supplier: ConfigSupplier<IMultilineBoxWithRemoveButtonSupplierProps> = {containerNode: defaultContainerNode}
) => (Component: typeof MultilineBox): typeof MultilineBox => {
    const mapDispatchToProps = (dispatch: IDispatch, ownProps: IMultilineBoxOwnProps) => ({
        removeBox: (id: string) => dispatch(removeValueStringList(ownProps.id, id)),
    });

    class MultilineBoxWithRemoveButton<T> extends React.PureComponent<
        IMultilineBoxWithRemoveButtonProps<T> & ReturnType<typeof mapDispatchToProps>
    > {
        static defaultProps = {
            renderBody: () => <div />,
        };

        private getRemoveButtonNode(
            data: Array<Partial<IMultilineSingleBoxProps<T>>>,
            props: Partial<IButtonProps> = {},
            index: number
        ) {
            const isLastMeaningfulEntry = data.length <= 1;
            const isDisabled = this.props.disabled || isLastMeaningfulEntry || data[index].isLast;
            return (
                <Button
                    classes={[classNames(defaultMultilineBoxRemoveButtonClasses)]}
                    style={{
                        visibility: isDisabled ? 'hidden' : 'visible',
                    }}
                    onClick={() => this.props.removeBox(data[index].id)}
                    enabled={!isDisabled}
                    {...props}
                >
                    <Svg
                        svgName={svg.remove.name}
                        className="icon mod-18"
                        style={{
                            visibility: isDisabled ? 'hidden' : 'visible',
                        }}
                    />
                </Button>
            );
        }

        private getWrapper(children: React.ReactNode, data: Array<IMultilineSingleBoxProps<T>>) {
            return React.Children.map(children, (child: React.ReactNode, index: number) =>
                HocUtils.supplyConfig(supplier).containerNode(
                    child,
                    (props?: Partial<IButtonProps>) => this.getRemoveButtonNode(data, props, index),
                    data,
                    index
                )
            );
        }

        render() {
            return (
                <Component
                    {...this.props}
                    renderBody={(boxProps: Array<IMultilineSingleBoxProps<T>>, parentProps: IMultilineParentProps) =>
                        this.getWrapper(this.props.renderBody(boxProps, parentProps), boxProps)
                    }
                />
            );
        }
    }

    return connect<null, ReturnType<typeof mapDispatchToProps>, IMultilineBoxWithRemoveButtonProps<any>>(
        undefined,
        mapDispatchToProps
    )(MultilineBoxWithRemoveButton as any);
};
