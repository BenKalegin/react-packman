import { Action, ANIMATION_STEP_ACTION } from "../actions";
import { Store } from "../model";
import { IMazePath } from "../model/derivatives";


export function ghostReducer(state: Store.Ghost[] = Store.initial().ghosts, action: Action, mazePath: IMazePath): Store.Ghost[] {
  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      return state;
    default:
      return state;
  }
}
