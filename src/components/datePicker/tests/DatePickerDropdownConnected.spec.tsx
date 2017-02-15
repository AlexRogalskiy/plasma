import { mount, ReactWrapper } from 'enzyme';
import { Store } from 'react-redux';
import { clearState } from '../../../utils/ReduxUtils';
import { IReactVaporState } from '../../../ReactVapor';
import { TestUtils } from '../../../utils/TestUtils';
import { Provider } from 'react-redux';
import { DatePickerDropdownConnected } from '../DatePickerDropdownConnected';
import { IDatePickerDropdownProps, DatePickerDropdown } from '../DatePickerDropdown';
import { toggleDropdown, closeDropdown } from '../../dropdown/DropdownActions';
import { addDatePicker, changeDatePickerLowerLimit, applyDatePicker } from '../DatePickerActions';
import { IDatePickerState } from '../DatePickerReducers';
import { addOptionPicker, changeOptionPicker } from '../../optionPicker/OptionPickerActions';
import { DatePickerBox } from '../DatePickerBox';
import * as _ from 'underscore';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { MONTH_PICKER_ID, YEAR_PICKER_ID, DEFAULT_YEARS } from '../../calendar/Calendar';
import { addOptionsCycle, changeOptionsCycle } from '../../optionsCycle/OptionsCycleActions';
import { DateUtils } from '../../../utils/DateUtils';

describe('Date picker', () => {
  describe('<DatePickerDropdownConnected />', () => {
    const DATE_PICKER_DROPDOWN_BASIC_PROPS: IDatePickerDropdownProps = {
      id: 'dropdown',
      datesSelectionBoxes: []
    };

    let wrapper: ReactWrapper<any, any>;
    let datePickerDropdown: ReactWrapper<IDatePickerDropdownProps, any>;
    let store: Store<IReactVaporState>;

    beforeEach(() => {
      store = TestUtils.buildStore();

      wrapper = mount(
        <Provider store={store}>
          <DatePickerDropdownConnected {...DATE_PICKER_DROPDOWN_BASIC_PROPS} />
        </Provider>,
        { attachTo: document.getElementById('App') }
      );
      datePickerDropdown = wrapper.find(DatePickerDropdown).first();
    });

    afterEach(() => {
      store.dispatch(clearState());
      wrapper.unmount();
      wrapper.detach();
    });

    it('should get an id as a prop', () => {
      let idProp = datePickerDropdown.props().id;

      expect(idProp).toBeDefined();
      expect(idProp).toBe(DATE_PICKER_DROPDOWN_BASIC_PROPS.id);
    });

    it('should get if it is opened as a prop', () => {
      let isOpenedProp = datePickerDropdown.props().isOpened;

      expect(isOpenedProp).toBeDefined();
      expect(isOpenedProp).toBe(false);
    });

    it('should get the date picker as a prop', () => {
      let datePickerProp = datePickerDropdown.props().datePicker;

      expect(datePickerProp).toBeDefined();
      expect(datePickerProp).toBe(null);
    });

    it('should get if it has a redux state as a prop', () => {
      let withReduxStateProp = datePickerDropdown.props().withReduxState;

      expect(withReduxStateProp).toBeDefined();
      expect(withReduxStateProp).toBe(true);
    });

    it('should get what to do on render as a prop', () => {
      let onRenderProp = datePickerDropdown.props().onRender;

      expect(onRenderProp).toBeDefined();
    });

    it('should get what to do on destroy as a prop', () => {
      let onDestroyProp = datePickerDropdown.props().onDestroy;

      expect(onDestroyProp).toBeDefined();
    });

    it('should get what to do on click as a prop', () => {
      let onClickProp = datePickerDropdown.props().onClick;

      expect(onClickProp).toBeDefined();
    });

    it('should get what to do on aply as a prop', () => {
      let onApplyProp = datePickerDropdown.props().onApply;

      expect(onApplyProp).toBeDefined();
    });

    it('should get what to do on cancel as a prop', () => {
      let onCancelProp = datePickerDropdown.props().onCancel;

      expect(onCancelProp).toBeDefined();
    });

    it('should get what to do on document click as a prop', () => {
      let onDocumentClickProp = datePickerDropdown.props().onDocumentClick;

      expect(onDocumentClickProp).toBeDefined();
    });

    it('should return isOpen if the dropdown is opened', () => {
      store.dispatch(toggleDropdown(DATE_PICKER_DROPDOWN_BASIC_PROPS.id));

      expect(datePickerDropdown.props().isOpened).toBe(true);

      store.dispatch(closeDropdown(DATE_PICKER_DROPDOWN_BASIC_PROPS.id));

      expect(datePickerDropdown.props().isOpened).toBe(false);
    });

    it('should return the first date picker with the id starting with the dropdown id for the datePicker prop', () => {
      let firstDatePickerId: string = DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '6868';
      store.dispatch(addDatePicker(firstDatePickerId, false));
      store.dispatch(addDatePicker(DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '32', false));
      store.dispatch(addDatePicker('1', false));

      expect(datePickerDropdown.props().datePicker.id).toBe(firstDatePickerId);
    });

    it('should call onRender prop when mounted', () => {
      wrapper.unmount();
      store.dispatch(clearState());

      expect(store.getState().dropdowns.length).toBe(0);

      wrapper.mount();

      expect(store.getState().dropdowns.length).toBe(1);
    });

    it('should call onDestroy prop when will unmount', () => {
      wrapper.unmount();

      expect(store.getState().dropdowns.length).toBe(0);
    });

    it('should toggle the open property of the dropdown when calling the onClick prop', () => {
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(false);

      datePickerDropdown.props().onClick();
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(true);
    });

    it('should close the dropdown menu when calling onDocumentClick prop', () => {
      store.dispatch(toggleDropdown(DATE_PICKER_DROPDOWN_BASIC_PROPS.id));
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(true);

      datePickerDropdown.props().onDocumentClick();
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(false);
    });

    it('should apply the dates when calling onApply prop', () => {
      let pickerId: string = DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '6868';
      let newLowerLimit: Date = new Date(new Date().setDate(new Date().getDate() - 20));

      store.dispatch(addDatePicker(pickerId, false));
      store.dispatch(changeDatePickerLowerLimit(pickerId, newLowerLimit));

      datePickerDropdown.props().onApply();

      expect(_.findWhere(store.getState().datePickers, { id: pickerId }).appliedLowerLimit).toEqual(newLowerLimit);
    });

    it('should reset the dates when calling onCancel prop', () => {
      let pickerId: string = DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '6868';
      let newLowerLimit: Date = new Date(new Date().setDate(new Date().getDate() - 20));

      store.dispatch(addDatePicker(pickerId, false));
      store.dispatch(changeDatePickerLowerLimit(pickerId, newLowerLimit));

      datePickerDropdown.props().onCancel(0, 0);

      let datePicker: IDatePickerState = _.findWhere(store.getState().datePickers, { id: pickerId });
      expect(datePicker.appliedLowerLimit).not.toEqual(newLowerLimit);
      expect(datePicker.lowerLimit).toEqual(datePicker.appliedLowerLimit);
    });

    it('should close the dropdown when calling onApply prop', () => {
      store.dispatch(toggleDropdown(DATE_PICKER_DROPDOWN_BASIC_PROPS.id));
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(true);

      datePickerDropdown.props().onApply();
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(false);
    });

    it('should close the dropdown when calling onCancel prop', () => {
      store.dispatch(toggleDropdown(DATE_PICKER_DROPDOWN_BASIC_PROPS.id));
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(true);

      datePickerDropdown.props().onCancel(1, 1);
      expect(_.findWhere(store.getState().dropdowns, { id: DATE_PICKER_DROPDOWN_BASIC_PROPS.id }).opened).toBe(false);
    });

    it('should reset the option picker when calling onCancel prop', () => {
      let pickerId: string = DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '6868';
      let newValue: () => string = () => 'selected value';

      store.dispatch(addOptionPicker(pickerId));
      store.dispatch(changeOptionPicker(pickerId, newValue));

      expect(_.findWhere(store.getState().optionPickers, { id: pickerId }).selectedValue()).toBe(newValue());

      datePickerDropdown.props().onCancel(1, 1);

      expect(_.findWhere(store.getState().optionPickers, { id: pickerId }).selectedValue).toBeUndefined();
    });

    it('should reset the month when calling onCancel prop', () => {
      let cycleId: string = `calendar-${DATE_PICKER_DROPDOWN_BASIC_PROPS.id}${MONTH_PICKER_ID}`;

      store.dispatch(addOptionsCycle(cycleId));
      store.dispatch(changeOptionsCycle(cycleId, DateUtils.currentMonth + 1));

      datePickerDropdown.find('footer').find('button').last().simulate('click');

      expect(_.findWhere(store.getState().optionsCycles, { id: cycleId }).currentOption)
        .toBe(DateUtils.currentMonth);
    });

    it('should reset the year when calling onCancel prop', () => {
      let cycleId: string = `calendar-${DATE_PICKER_DROPDOWN_BASIC_PROPS.id}${YEAR_PICKER_ID}`;

      store.dispatch(addOptionsCycle(cycleId));
      store.dispatch(changeOptionsCycle(cycleId, DateUtils.currentYear + 1));

      datePickerDropdown.find('footer').find('button').last().simulate('click');

      expect(_.findWhere(store.getState().optionsCycles, { id: cycleId }).currentOption)
        .toBe(DEFAULT_YEARS.indexOf(DateUtils.currentYear.toString()));
    });

    it('should reset the month to the datepicker\'s lower limit when calling onCancelProp', () => {
      let pickerId: string = DATE_PICKER_DROPDOWN_BASIC_PROPS.id + '6868';
      let newLowerLimit: Date = new Date(new Date().setDate(new Date().getDate() - 700));
      let yearCycleId: string = `calendar-${DATE_PICKER_DROPDOWN_BASIC_PROPS.id}${YEAR_PICKER_ID}`;
      let monthCycleId: string = `calendar-${DATE_PICKER_DROPDOWN_BASIC_PROPS.id}${MONTH_PICKER_ID}`;

      store.dispatch(addDatePicker(pickerId, false));
      store.dispatch(changeDatePickerLowerLimit(pickerId, newLowerLimit));
      store.dispatch(applyDatePicker(pickerId));

      store.dispatch(addOptionsCycle(monthCycleId));
      store.dispatch(addOptionsCycle(yearCycleId));

      datePickerDropdown.find('footer').find('button').last().simulate('click');

      expect(_.findWhere(store.getState().optionsCycles, { id: monthCycleId }).currentOption)
        .toBe(newLowerLimit.getMonth());
      expect(_.findWhere(store.getState().optionsCycles, { id: yearCycleId }).currentOption)
        .toBe(DEFAULT_YEARS.indexOf(newLowerLimit.getFullYear().toString()));
    });

    it('should display a <DatePickerBox /> with a redux state a prop', () => {
      expect(datePickerDropdown.find(DatePickerBox).props().withReduxState).toBe(true);
    });
  });
});
