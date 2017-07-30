import { combineReducers } from 'redux';
import { pacmanReducer } from './Pacman';
import { IAppProps } from "../components/App";

export const rootReducer = combineReducers<IAppProps>({pacman: pacmanReducer});