import classNames from 'classnames';
import {ReactNode, Children, PureComponent} from 'react';

import {TooltipPlacement} from '../../../utils/TooltipUtils';
import {Svg} from '../../svg/Svg';
import {ITooltipProps, Tooltip} from '../../tooltip/Tooltip';

export interface ISelectedOptionProps {
    value: string;
    label: ReactNode;
    selectedTooltip: ITooltipProps;
    onRemoveClick?: (value: string) => void;
    readOnly?: boolean;
    prepend?: ReactNode;
}

export class SelectedOption extends PureComponent<ISelectedOptionProps> {
    handleOnRemove = () => {
        this.props.onRemoveClick?.(this.props.value);
    };

    render() {
        const tooltipContent = Children.count(this.props.children) > 0 ? this.props.children : this.props.label;
        const tooltipLabel = typeof this.props.label === 'string' ? this.props.label : '';
        const tooltipCustomLabel = this.props.selectedTooltip?.title;
        const tooltipPosition = this.props.selectedTooltip?.placement;
        return (
            <div className="selected-option" key={this.props.value} role="listitem">
                {this.props.prepend}
                <Tooltip
                    delayShow={300}
                    {...this.props.selectedTooltip}
                    title={tooltipCustomLabel ?? tooltipLabel}
                    placement={tooltipPosition ?? TooltipPlacement.Top}
                    className={classNames('selected-option-value', {readOnly: this.props.readOnly})}
                >
                    {tooltipContent}
                </Tooltip>

                {!this.props.readOnly && (
                    <div className="remove-option" onClick={this.handleOnRemove} role="button">
                        <Svg svgName="clear" svgClass="icon mod-small" />
                    </div>
                )}
            </div>
        );
    }
}
