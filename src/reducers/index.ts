//import { combineReducers } from 'redux';
import { pacmanReducer } from './Pacman';
import { ghostReducer } from './Ghost';
import { gameReducer } from './Game';
import { Store } from '../model';
import { Action } from "../actions/index";
import { getMazePath } from "../model/cache";

export const rootReducer = (state: Store.All, action: Action) : Store.All => {
  const mazePath = getMazePath(state);
  return {
    heat: {
      pacman: pacmanReducer(state.heat.pacman, action, mazePath),
      ghosts: ghostReducer(state.heat.ghosts, action, mazePath),
    },
    game: gameReducer(state.game, action),
    round: state.round,
  }
};