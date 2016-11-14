import { mount, ReactWrapper } from 'enzyme';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { INavigationPaginationProps, NavigationPagination } from '../NavigationPagination';
import { IReactVaporState, clearState } from '../../../../utils/ReduxUtils';
import { NavigationPaginationConnected } from '../NavigationPaginationConnected';
import { TestUtils } from '../../../../utils/TestUtils';
import { NavigationPaginationSelect } from '../NavigationPaginationSelect';
import { changePage, resetPaging } from '../NavigationPaginationActions';
import { addLoading, turnOffLoading } from '../../../loading/LoadingActions';
import * as _ from 'underscore';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

describe('<NavigationPaginationConnected />', () => {
  const navigationPaginationId: string = 'navigation-pagination';
  const loadingId = navigationPaginationId + '-loading';
  let totalPages: number;
  let wrapper: ReactWrapper<any, any>;
  let navigationPagination: ReactWrapper<INavigationPaginationProps, any>;
  let fewPagesNavigationPagination: ReactWrapper<INavigationPaginationProps, any>;
  let store: Store<IReactVaporState>;

  beforeEach(() => {
    totalPages = 20;

    store = TestUtils.buildStore();
    store.dispatch(addLoading(loadingId));
    store.dispatch(turnOffLoading([loadingId]));

    wrapper = mount(
      <Provider store={store}>
        <div>
          <NavigationPaginationConnected
            id={navigationPaginationId}
            totalPages={totalPages}
            loadingIds={[loadingId]}
            />
          <NavigationPaginationConnected
            id='few-pages-navigation-pagination'
            totalPages={3}
            />
        </div>
      </Provider>,
      { attachTo: document.getElementById('App') }
    );
    navigationPagination = wrapper.find(NavigationPagination).first();
    fewPagesNavigationPagination = wrapper.find(NavigationPagination).last();
  });

  afterEach(() => {
    store.dispatch(clearState());
    wrapper.unmount();
    wrapper.detach();
  });

  it('should get the number of pages as a prop', () => {
    let totalPagesProp = navigationPagination.props().totalPages;

    expect(totalPagesProp).toBeDefined();
    expect(totalPagesProp).toBe(totalPages);
  });

  it('should get the current page as a prop', () => {
    let currentPageProp = navigationPagination.props().currentPage;

    expect(currentPageProp).toBeDefined();
    expect(currentPageProp).toBe(0);
  });

  it('should get what to do on click as a prop', () => {
    let onPageClickProp = navigationPagination.props().onPageClick;

    expect(onPageClickProp).toBeDefined();
  });

  it('should render no more <TableNavigationPaginationSelectView /> than the total number of pages', () => {
    expect(navigationPagination.find(NavigationPaginationSelect).length).toBeLessThan(totalPages + 1);
    expect(fewPagesNavigationPagination.find(NavigationPaginationSelect).length).toBeLessThan(totalPages + 1);
  });

  it('should render no more <TableNavigationPaginationSelectView /> than the maximum of pages shown (7)', () => {
    expect(navigationPagination.find(NavigationPaginationSelect).length).toBeLessThan(8);
    expect(fewPagesNavigationPagination.find(NavigationPaginationSelect).length).toBeLessThan(8);
  });

  it('should set the previous arrow to disabled if on first page', () => {
    let previousArrow = navigationPagination.find('.flat-select-option').first();

    expect(previousArrow.hasClass('disabled')).toBe(true);

    store.dispatch(changePage(navigationPaginationId, 3));

    expect(previousArrow.hasClass('disabled')).toBe(false);
  });

  it('should set the next arrow to disabled if on last page', () => {
    let nextArrow = navigationPagination.find('.flat-select-option').last();

    expect(nextArrow.hasClass('disabled')).toBe(false);

    store.dispatch(changePage(navigationPaginationId, 3));

    expect(nextArrow.hasClass('disabled')).toBe(false);

    store.dispatch(changePage(navigationPaginationId, totalPages - 1));

    expect(nextArrow.hasClass('disabled')).toBe(true);
  });

  it('should show the last page if there are less pages left than half maximum number of pages shown (7)', () => {
    let lastPage = totalPages - 1;

    expect(navigationPagination.findWhere(select => select.prop('pageNb') === lastPage).length).toBe(0);

    store.dispatch(changePage(navigationPaginationId, lastPage - 4));

    expect(navigationPagination.findWhere(select => select.prop('pageNb') === lastPage).length).toBe(0);

    store.dispatch(changePage(navigationPaginationId, lastPage - 3));

    expect(navigationPagination.findWhere(select => select.prop('pageNb') === lastPage).length).toBe(1);
  });

  it('should add loading on page click', () => {
    expect(_.findWhere(store.getState().loadings, { id: loadingId }).isOn).toBe(false);

    navigationPagination.find('.flat-select-option').last().simulate('click');

    expect(_.findWhere(store.getState().loadings, { id: loadingId }).isOn).toBe(true);
  });

  it('should change the current page on page click', () => {
    expect(_.findWhere(store.getState().paginationComposite, { id: navigationPaginationId }).pageNb).toBe(0);

    navigationPagination.find('.flat-select-option').last().simulate('click');

    expect(_.findWhere(store.getState().paginationComposite, { id: navigationPaginationId }).pageNb).not.toBe(0);
  });

  it('should return to the first page when resetting the pagination', () => {
    store.dispatch(store.dispatch(changePage(navigationPaginationId, totalPages - 4)));
    expect(navigationPagination.props().currentPage).not.toBe(0);

    store.dispatch(resetPaging(navigationPaginationId));
    expect(navigationPagination.props().currentPage).toBe(0);
  });
});
