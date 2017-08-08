import { combineReducers } from 'redux';
import { pacmanReducer } from './Pacman';
import { Store } from '../model';

export const rootReducer = combineReducers<Store.All>({pacman: pacmanReducer});