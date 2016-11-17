
import { IActionOptions } from './Action';
import { ActionBarActions } from './ActionBarActions';
import { IReduxAction, IReduxActionPayload } from '../../utils/ReduxUtils';

export interface IActionBarState {
  id: string;
  actions: IActionOptions[];
}

export const actionBarInitialState: IActionBarState = { id: undefined, actions: [] };
export const actionBarsInitialState: IActionBarState[] = [];

export const actionBarReducer = (state: IActionBarState = actionBarInitialState, action: IReduxAction<IReduxActionPayload>): IActionBarState => {
  switch (action.type) {
    case ActionBarActions.addActions:
      if (state.id !== action.payload.id) {
        return state;
      }
      return _.extend({}, state, {
        actions: action.payload.actions
      });
    case ActionBarActions.add:
      return _.extend({}, state, {
        id: action.payload.id
      });
    default:
      return state;
  }
};

export const actionBarsReducer = (state: IActionBarState[] = actionBarsInitialState, action: IReduxAction<IReduxActionPayload>): IActionBarState[] => {
  switch (action.type) {
    case ActionBarActions.addActions:
      return state.map(bar =>
        actionBarReducer(bar, action)
      );
    case ActionBarActions.add:
      return [
        ...state,
        actionBarReducer(undefined, action)
      ];
    case ActionBarActions.remove:
      return _.reject(state, (bar) => {
        return action.payload.id === bar.id;
      });
    default:
      return state;
  }
};
