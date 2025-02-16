import classNames from 'classnames';
import {ReactNode, FunctionComponent, useRef, useState} from 'react';
import * as _ from 'underscore';

import {ILinkSvgProps, LinkSvg} from '../svg/LinkSvg';
import {Tooltip} from '../tooltip/Tooltip';

export interface ITitleProps {
    prefix?: string;
    text: ReactNode;
    withTitleTooltip?: boolean;
    documentationLink?: ILinkSvgProps;
    classes?: string[];
    htmlId?: string;
}

export const Title: FunctionComponent<ITitleProps> = (props) => {
    const ref = useRef<HTMLHeadingElement>();

    const [isTruncated, setIsTruncated] = useState(false);
    const linkClasses = classNames(
        'inline-doc-link m1',
        props.documentationLink && props.documentationLink.linkClasses
    );
    const titleClasses: string = classNames('bolder', 'truncate', props.classes);
    const prefixClasses: string = classNames({mr1: !_.isEmpty(props.prefix)});
    const linkIcon = props.documentationLink && <LinkSvg {...props.documentationLink} linkClasses={[linkClasses]} />;
    const tooltipProps = _.isString(props.text) ? {title: props.text} : {};

    const detection = () => {
        const titleOffSetWidth = ref.current.offsetWidth;
        const titleScrollWidth = ref.current.scrollWidth;

        setIsTruncated(titleOffSetWidth < titleScrollWidth);
    };

    const title =
        props.withTitleTooltip || isTruncated ? (
            <Tooltip {...tooltipProps} placement="left">
                {props.text}
            </Tooltip>
        ) : (
            props.text
        );

    return (
        <div className="flex flex-center full-content-x" onMouseEnter={detection}>
            <h4 ref={ref} className={titleClasses} id={props.htmlId}>
                <span className={prefixClasses}>{props.prefix}</span>
                {title}
            </h4>
            {linkIcon}
            {props.children}
        </div>
    );
};

Title.defaultProps = {
    prefix: '',
    withTitleTooltip: false,
};
