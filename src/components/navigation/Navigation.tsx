import { IReduxStatePossibleProps } from '../../utils/ReduxUtils';
import { LoadingConnected } from '../loading/LoadingConnected';
import { Loading } from '../loading/Loading';
import { NavigationPaginationConnected } from './pagination/NavigationPaginationConnected';
import { NavigationPerPageConnected } from './perPage/NavigationPerPageConnected';
import { NavigationPagination, INavigationPaginationProps } from './pagination/NavigationPagination';
import { NavigationPerPage, INavigationPerPageProps, PER_PAGE_NUMBERS } from './perPage/NavigationPerPage';
import * as React from 'react';

export interface INavigationOwnProps extends React.ClassAttributes<Navigation> {
  id?: string;
  totalPages: number;
  totalEntries: number;
  loadingIds?: string[];
}

export interface INavigationChildrenProps {
  numberOfPagesToShow?: number;
  previousLabel?: string;
  nextLabel?: string;
  onPageClick?: (pageNb: number) => void;
  perPageLabel?: string;
  perPageNumbers?: number[];
  onPerPageClick?: () => void;
  hidePages?: boolean;
  currentPerPage?: number;
  currentPage?: number;
}

export interface INavigationStateProps extends IReduxStatePossibleProps {
  isLoading?: boolean;
}

export interface INavigationProps extends INavigationOwnProps, INavigationChildrenProps, INavigationStateProps { }

export class Navigation extends React.Component<INavigationProps, any> {
  static defaultProps: Partial<INavigationProps> = {
    perPageNumbers: PER_PAGE_NUMBERS,
  };

  render() {
    const paginationProps: INavigationPaginationProps = {
      totalPages: this.props.totalPages,
      numberOfPagesToShow: this.props.numberOfPagesToShow,
      previousLabel: this.props.previousLabel,
      nextLabel: this.props.nextLabel,
      hidePages: this.props.hidePages
    };
    const pagination: JSX.Element = this.props.withReduxState
      ? <NavigationPaginationConnected id={'pagination-' + this.props.id} loadingIds={this.props.loadingIds} {...paginationProps} />
      : <NavigationPagination currentPage={this.props.currentPage} onPageClick={this.props.onPageClick} {...paginationProps} />;
    const paginationClass: string = this.props.totalPages > 1 ? '' : 'hidden';

    const perPageProps: INavigationPerPageProps = {
      label: this.props.perPageLabel,
      perPageNumbers: this.props.perPageNumbers,
      totalEntries: this.props.totalEntries
    };
    if (this.props.currentPerPage) {
      perPageProps.currentPerPage = this.props.currentPerPage;
    }
    const perPage: JSX.Element = this.props.withReduxState
      ? <NavigationPerPageConnected id={this.props.id} loadingIds={this.props.loadingIds} {...perPageProps} />
      : <NavigationPerPage onPerPageClick={this.props.onPerPageClick} {...perPageProps} />;
    const perPageClass = this.props.perPageNumbers.length && this.props.totalEntries > this.props.perPageNumbers[0] ? '' : 'hidden';

    let navigationClasses: string = 'pagination-container' + (this.props.isLoading ? ' loading-view' : '');
    let loading: JSX.Element = this.props.withReduxState ? <LoadingConnected id={'loading-' + this.props.id} /> : <Loading />;

    return (
      <div className={navigationClasses}>
        <div className={perPageClass}>
          {perPage}
        </div>
        <div className='flex-auto'>
          {loading}
        </div>
        <div className={paginationClass}>
          {pagination}
        </div>
      </div>
    );
  }
}
