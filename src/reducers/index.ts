//import { combineReducers } from 'redux';
import { pacmanReducer, mazeReducer } from './Pacman';
import { ghostReducer } from './Ghost';
import { Store } from '../model';
import { Action } from "../actions/index";
import { getMazePath } from "../model/cache";

export const rootReducer = (state: Store.All, action: Action) => {
  const mazePath = getMazePath(state);
  return {
    pacman: pacmanReducer(state.pacman, action, mazePath),
    ghosts: ghostReducer(state.ghosts, action, mazePath),
    maze: mazeReducer(state.maze, action)
  }
};