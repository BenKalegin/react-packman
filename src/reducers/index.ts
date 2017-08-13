import { combineReducers } from 'redux';
import { pacmanReducer, mazeReducer } from './Pacman';
import { Store } from '../model';

export const rootReducer = combineReducers<Store.All>({pacman: pacmanReducer, maze: mazeReducer});