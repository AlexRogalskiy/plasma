import classNames from 'classnames';
import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import * as _ from 'underscore';

import {PlasmaState} from '../../PlasmaState';
import {IDispatch} from '../../utils/ReduxUtils';
import {removePrompt} from './InlinePromptActions';
import {Button} from '../button';

export interface IUserChoice {
    description?: string;
    cancel?: string;
    choices?: Record<string, string>;
    icon?: string;
}

export interface IInlinePromptOptions {
    onClick: () => void;
    userChoice: IUserChoice;
    isOpened?: boolean;
    className?: string;
}

export interface IInlinePromptProps {
    id?: string;
    options: IInlinePromptOptions;
}

export const InlinePrompt: FunctionComponent<IInlinePromptProps & Partial<ReturnType<typeof mapDispatchToProps>>> = ({
    options,
    onCancel,
}) => {
    const choices: JSX.Element[] = _.map(options.userChoice.choices, (choice: string) => (
        <Button classes="mod-danger ml1" onClick={options.onClick} key={choice}>
            {choice}
        </Button>
    ));

    const description: JSX.Element = options.userChoice.description ? (
        <span className="description">{options.userChoice.description}</span>
    ) : null;

    const cancel: JSX.Element = options.userChoice.cancel ? (
        <Button classes="cancel ml1" onClick={onCancel}>
            {options.userChoice.cancel}
        </Button>
    ) : null;

    const className = classNames(`prompt-${options.className ?? 'info'}`, {opened: options.isOpened});

    return (
        <span className={className}>
            <span className="label-confirmation">{description}</span>
            {choices}
            {cancel}
        </span>
    );
};

const mapDispatchToProps = (dispatch: IDispatch<PlasmaState>, ownProps: IInlinePromptProps) => ({
    onCancel: () => dispatch(removePrompt(ownProps.id)),
});

export const InlinePromptConnected = connect(null, mapDispatchToProps)(InlinePrompt);
