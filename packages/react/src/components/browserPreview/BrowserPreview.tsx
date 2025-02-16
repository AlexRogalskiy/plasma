import {FunctionComponent} from 'react';
import {truncate} from 'underscore.string';

import {TooltipPlacement} from '../../utils';
import {Svg} from '../svg';
import {Tooltip} from '../tooltip';

export interface BrowserPreviewProps {
    /**
     * Text that will be displayed in the tooltip on the i icon
     *
     * @default The final look in your search page may differ due to the customization you made in your page.
     *
     */
    headerDescription?: string;
    /**
     * Title of the browser preview
     */
    title?: string;
}

export const BrowserPreview: FunctionComponent<BrowserPreviewProps> = ({children, headerDescription, title}) => (
    <div className="browser-preview flex flex-column">
        <BrowserPreviewHeader tooltipTitle={headerDescription ?? DefaultHeaderDescription} title={title ?? ''} />
        <div className="browser-preview__content flex flex-column flex-auto px4 py3">{children}</div>
    </div>
);

const BrowserPreviewHeader: FunctionComponent<{tooltipTitle: string; title?: string}> = ({title, tooltipTitle}) => (
    <div className="browser-preview__header flex space-between px2 py1">
        <div>
            <span className="bolder">Preview</span>
            <Tooltip title={tooltipTitle} placement={TooltipPlacement.Right}>
                <Svg svgName="info" svgClass="icon mod-14 ml1" />
            </Tooltip>
        </div>
        <div>
            <span className="bolder">{truncate(title, TitleMaxLength)}</span>
        </div>
        <div>
            <span className="white-dot" />
            <span className="white-dot" />
            <span className="white-dot" />
        </div>
    </div>
);

const DefaultHeaderDescription =
    'The final look in your search page may differ due to the customization you made in your page.';
const TitleMaxLength = 20;
