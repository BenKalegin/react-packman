import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { Stage, Layer } from 'react-konva';
import { WallProps } from ".";
import Wall from './Wall';
import {Dots, Pellets} from ".";
import { Pacman } from './Pacman';
import { Ghost } from './Ghost';
import { Store } from '../model';

type ConnectedState = {
  maze: Store.Maze
}

type OwnProps = {
}

type ConnectedDispatch = {
  load: () => void
}

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  maze: state.game.maze
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
  load: () => {}
});

class MazeView extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  render() {
    const maze = this.props.maze;
    const bounds = maze.gridSize.scale(maze.cellSize).asRectangleSize();
    const walls : WallProps[] = maze.walls.map((w,i) => {
      return {
        key: i,
        bounds: w.position.scale(maze.cellSize).toRectangle(maze.cellSize),
        type: w.type
    }});

    return (
      <Stage width={bounds.dx} height={bounds.dy}>
        <Layer>
          {walls.map(w => <Wall {...w} />)}
        </Layer>
        <Layer>
          <Dots />
          <Pellets/>
        </Layer>
        <Layer>
          {[0, 1, 2, 3].map(i => <Ghost key={i} index={i} />)}
          <Pacman />
        </Layer>
      </Stage>
    );
  }
}

export const Maze: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(MazeView)
