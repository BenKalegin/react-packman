//import { combineReducers } from 'redux';
import { pacmanReducer } from './Pacman';
import { ghostReducer } from './Ghost';
import { gameReducer } from './Game';
import { roundReducer } from './Round';
import { Store } from '../model';
import { Action } from "../actions/index";
import { getMazeNavigator } from "../model/cache";
import { GameEvent } from "./Events";

export const rootReducer = (state: Store.All = Store.initial(), action: Action) : Store.All => {
  const mazeNavigator = getMazeNavigator(state);
  let events: GameEvent[] = [];

  const pacman = pacmanReducer(state.heat.pacman, action, mazeNavigator);
  const ghosts = ghostReducer(state.heat.ghosts, action, mazeNavigator);

  const heat: Store.Heat = {
    pacman: pacman,
    ghosts: ghosts,
  };

  const round = roundReducer(state.round, action, heat, events);

  const game = gameReducer(state.game, action, events);
  return {
    heat: heat,
    game: game,
    round: round,
  }
};