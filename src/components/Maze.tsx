import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { Stage, Layer } from 'react-konva';
import { WallProps, BorderProps } from ".";
import Border from './Border';
import Wall from './Wall';
import {Dots, Pellets} from ".";
import { Pacman } from './Pacman';
import { Ghost } from './Ghost';
import { Store } from '../model';
import { Point } from '../geometry';

type ConnectedState = {
  maze: Store.Maze
}

type OwnProps = {
}

type ConnectedDispatch = {
  load: () => void
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  maze: state.game.maze
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
  load: () => {}
});

class MazeView extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  render() {
    const maze = this.props.maze;
    const bounds = maze.gridSize.scale(maze.cellSize).asRectangleSize().inflate(maze.borderWidth).moveBy(new Point(maze.borderWidth, maze.borderWidth));
    const borderProps: BorderProps = { bounds: bounds, width: maze.borderWidth };
    const fieldRect = bounds.inflate(-maze.borderWidth);
    const walls : WallProps[] = maze.walls.map((w,i) => {
      return {
        key: i,
        points: w.points,
        cellSize: maze.cellSize,
        gridOffset: fieldRect.p1
    }});

    return (
      <Stage width={bounds.dx} height={bounds.dy}>
        <Layer>
          <Border {...borderProps}/>
          {walls.map(w => <Wall {...w} />)}
        </Layer>
        <Layer>
          <Dots />
          <Pellets/>
        </Layer>
        <Layer>
          {[0, 1, 2, 3].map(i => <Ghost index={i} />)}
          <Pacman />
        </Layer>
      </Stage>
    );
  }
}

export const Maze: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(MazeView)
