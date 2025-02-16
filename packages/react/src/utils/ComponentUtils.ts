import {ILinkSvgProps} from '../components/svg/LinkSvg';

export type ComponentId = string;

/**
 * DisplayClass is a reflection of the atomic display classes available in Vapor
 * see https://github.com/coveo/vapor/blob/04372c42cbabb06ddd79130c13902137a7956ad7/scss/utility/layout.scss
 * for more details
 */
export const DisplayClass = {
    BLOCK: 'block',
    INLINE: 'inline',
    INLINE_BLOCK: 'inline-block',
    HIDDEN: 'hidden',
    TABLE: 'table',
    TABLE_CELL: 'table-cell',
};

export interface IComponentBehaviour {
    isLoading?: boolean;
    disabled?: boolean;
}

export const getBasicDocumentLink = (url: string, title: string = ''): ILinkSvgProps => ({
    url,
    target: '_blank',
    svg: {
        svgName: 'help',
        svgClass: 'icon mod-20',
    },
    tooltip: {
        title,
        placement: 'bottom',
        container: 'body',
    },
});
