import { Action, PAUSE_COMMAND_ACTION } from "../actions";
import { Store } from "../model";

export function mazeReducer(state: Store.Maze, action: Action): Store.Maze {
  switch (action.type) {
  default:
    return state;
  }
}

export function gameReducer(state: Store.Game, action: Action, heat: Store.Heat): Store.Game {
  switch (action.type) {
    case PAUSE_COMMAND_ACTION:
      return {
        ...state, paused: !state.paused, maze: mazeReducer(state.maze, action)
      }

    default:
      return state;
  }
}
