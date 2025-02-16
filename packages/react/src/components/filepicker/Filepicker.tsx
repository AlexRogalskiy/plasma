import {svg} from '@coveord/plasma-style';
import classNames from 'classnames';
import {ChangeEvent, FunctionComponent, InputHTMLAttributes, MouseEventHandler, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import {PlasmaState} from '../../PlasmaState';
import {IDispatch} from '../../utils';
import {FileMetadata, FileUtils} from '../../utils/FileUtils';
import {Svg} from '../svg';
import {FilepickerActions} from './FilepickerActions';
import {FilepickerSelectors} from './FilepickerSelectors';

export interface FilepickerProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * The unique identifier of the file picker
     */
    id: string;
}

const mapStateToProps = (state: PlasmaState, ownProps: FilepickerProps) => ({
    selectedFile: FilepickerSelectors.getFileMetadata(state, ownProps),
    isEmpty: FilepickerSelectors.isEmpty(state, ownProps),
});

const mapDispatchToProps = (dispatch: IDispatch, {id}: FilepickerProps) => ({
    addFilepicker: () => dispatch(FilepickerActions.add(id)),
    setFile: (file: FileMetadata) => dispatch(FilepickerActions.setFile(id, file)),
    clear: () => dispatch(FilepickerActions.clear(id)),
});

const FilepickerDisconnected: FunctionComponent<
    FilepickerProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>
> = (props) => {
    const {addFilepicker, setFile, clear, isEmpty, selectedFile, placeholder, capture, ...inputProps} = props;
    const input = useRef<HTMLInputElement>();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(FileUtils.serialize(e.target.files[0]));
    };

    const handleClear: MouseEventHandler<HTMLSpanElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFile(null);
        if (input.current) {
            input.current.value = null;
        }
    };

    useEffect(() => {
        addFilepicker();
        return () => void clear();
    }, []);

    return (
        <>
            <input
                ref={input}
                type="file"
                {...inputProps}
                capture={capture as any}
                className="filepicker"
                onChange={handleChange}
            />
            <label htmlFor={props.id} className={classNames('btn', {'mod-append reset-text-transform': !isEmpty})}>
                {selectedFile?.name ?? placeholder}
                {!isEmpty && (
                    <Svg
                        className="btn-append mod-icon"
                        svgName={svg.clear.name}
                        svgClass="icon mod-16"
                        onClick={handleClear}
                    />
                )}
            </label>
        </>
    );
};

export const Filepicker = connect(mapStateToProps, mapDispatchToProps)(FilepickerDisconnected);
