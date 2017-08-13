//import { combineReducers } from 'redux';
import { pacmanReducer, mazeReducer } from './Pacman';
import { Store } from '../model';
import { Action } from "../actions/index";
import { getMazePath } from "../model/cache";

export const rootReducer = (state: Store.All, action: Action) => {
  return {
    pacman: pacmanReducer(state.pacman, action, getMazePath(state)),
    maze: mazeReducer(state.maze, action)
  }
};