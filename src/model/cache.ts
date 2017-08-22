import { createSelector } from 'reselect';
import { Store } from ".";
import { createMazeNavigator } from "./MazeNavigator";


export const getMazeNavigator = createSelector(
  (state: Store.All) => state.game.maze,
  (maze) => createMazeNavigator(maze)
);