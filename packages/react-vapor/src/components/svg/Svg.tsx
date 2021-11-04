import * as VaporSVG from 'coveo-styleguide';
import * as React from 'react';

// import {SvgNames} from './SvgNames';

export interface ISvgTagProps {
    svgClass?: string;
    svgName: string;
}

export interface ISvgProps extends ISvgTagProps, React.HTMLAttributes<HTMLSpanElement> {}

export const Svg: React.FunctionComponent<ISvgProps> = ({svgClass = '', svgName, ...props}) => {
    // eslint-disable-next-line arrow-body-style
    const setSvgClass = (svgStr: string): string => {
        return svgStr
            .replace('<svg ', `<svg class="${svgClass}" role="img" aria-label="${svgName} icon" `)
            .replace('<svg>', `<svg class="${svgClass}">`);
    };

    if (VaporSVG.svg[svgName]) {
        return <span {...props} dangerouslySetInnerHTML={{__html: setSvgClass(VaporSVG.svg[svgName].svgString)}} />;
    }

    return (
        <span {...props}>
            <svg className={svgClass} aria-label={`icon-${svgName}`} />
        </span>
    );
};
