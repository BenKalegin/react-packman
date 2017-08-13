import { createSelector } from 'reselect';
import { Store } from ".";
import { createMazePath } from "./derivatives";


export const getMazePath = createSelector(
  (state: Store.All) => state.maze,
  (maze) => createMazePath(maze)
);