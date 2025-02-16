import classNames from 'classnames';
import {HTMLProps, FunctionComponent, useContext} from 'react';
import {CheckboxContext, CheckboxContextProps} from '../checkbox/CheckboxContext';

export interface ILabelProps {
    type?: string;
    classes?: string[];
    validMessage?: string;
    invalidMessage?: string;
}

export const Label: FunctionComponent<ILabelProps & HTMLProps<HTMLLabelElement>> = ({
    classes,
    validMessage,
    invalidMessage,
    children,
    ...attributes
}) => {
    const {labelId} = useContext<CheckboxContextProps>(CheckboxContext);
    return (
        <label
            className={classNames(classes)}
            data-valid-message={validMessage}
            data-invalid-message={invalidMessage}
            id={labelId}
            {...attributes}
        >
            {children}
        </label>
    );
};
