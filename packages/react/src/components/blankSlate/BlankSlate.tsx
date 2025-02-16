import classNames from 'classnames';
import {ClassAttributes, ReactNode, Component} from 'react';
import * as _ from 'underscore';

import {IBaseActionOptions} from '../actions/Action';
import {Button} from '../button/Button';
import {OptionalSvgChildProps, SvgChild} from '../svg/SvgChild';

export interface IBlankSlateProps extends ClassAttributes<BlankSlate>, Omit<OptionalSvgChildProps, 'title'> {
    /**
     * Title of the blank slate
     */
    title?: ReactNode;
    /**
     * Description template to add to the blank slate
     */
    description?: ReactNode;
    /**
     * Additionnal child to add to the blank slate
     */
    additionalSection?: ReactNode;
    /**
     * Array of buttons to add to the blank slate
     */
    buttons?: IBaseActionOptions[];
    /**
     * Whether the blank slate should have the css style to fit a modal
     *
     * @default false
     *
     */
    withModal?: boolean;
    /**
     * Additional css classes that the blank slate should have
     */
    classes?: string[];
    /**
     * Additional css classes the container should have
     */
    containerClasses?: string[];
    /**
     * Additional css classes the description should have
     */
    descriptionClassName?: string;
    /**
     * Additional css classes the buttons should have
     */
    buttonClasses?: string[];
}

export class BlankSlate extends Component<IBlankSlateProps> {
    static defaultProps: Partial<IBlankSlateProps> = {
        title: null,
        description: null,
        additionalSection: null,
        buttons: [],
        withModal: false,
        classes: [],
        containerClasses: [],
        descriptionClassName: '',
    };

    private getSvgTemplate() {
        return (
            <SvgChild
                svgName={this.props.svgName}
                svgClass={`icon mod-4x ${this.props.svgClass}`}
                svgChild={this.props.svgChild}
            />
        );
    }

    private getDescriptionTemplate(): JSX.Element {
        return this.props.description ? (
            <p className={this.props.descriptionClassName}>{this.props.description}</p>
        ) : null;
    }

    private getButtonsTemplate(): JSX.Element[] {
        return _.map(this.props.buttons, (buttonProps: IBaseActionOptions) => (
            <Button key={buttonProps.name} {...buttonProps} classes={this.props.buttonClasses} />
        ));
    }

    render() {
        const marginClasses: string = this.props.withModal ? 'mt2 mb2' : 'm2';
        const blankSlateClasses: string = `blankslate ${marginClasses} ${this.props.classes.join(' ')}`;
        const modalClasses: string = classNames(
            {'mod-header-padding': this.props.withModal},
            this.props.containerClasses
        );

        return (
            <div className={modalClasses}>
                <div className={blankSlateClasses}>
                    {this.getSvgTemplate()}
                    <h4>{this.props.title}</h4>
                    {this.getDescriptionTemplate()}
                    {this.getButtonsTemplate()}
                    {this.props.additionalSection}
                </div>
            </div>
        );
    }
}
