//import { combineReducers } from 'redux';
import { pacmanReducer } from './Pacman';
import { ghostReducer } from './Ghost';
import { gameReducer } from './Game';
import { roundReducer } from './Round';
import { heatReducer } from './Heat';
import { Store } from '../model';
import { Action } from "../actions/index";
import { getMazeNavigator } from "../model/cache";
import { GameEvent } from "./Events";

export const rootReducer = (state: Store.App = Store.defaultApp(), action: Action) : Store.App => {
  const mazeNavigator = getMazeNavigator(state);
  let events: GameEvent[] = [];

  const pacman = pacmanReducer(state.heat.pacman, action, state.round.dots, state.round.pellets, mazeNavigator, events);
  const ghosts = ghostReducer(state.heat.ghosts, action, pacman, mazeNavigator, events);

  const heat = heatReducer(state.heat, action, pacman, ghosts, events);

  const round = roundReducer(state.round, action, heat, events);

  const game = gameReducer(state.game, action, events);
  return {
    heat: heat,
    game: game,
    round: round,
  }
};