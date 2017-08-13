import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { Stage, Layer } from 'react-konva';
import { CellProps, WallProps, BorderProps } from ".";
import Border from './Border';
import Wall from './Wall';
import Cell from './Cell';
import { Pacman } from './Pacman';
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
  maze: state.maze
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
  load: () => {}
});

class MazeView extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  render() {
    const maze = this.props.maze;
    const bounds = maze.gridSize.scale(maze.cellSize).toRectangle().inflate(maze.borderWidth).moveBy(new Point(maze.borderWidth, maze.borderWidth));
    const borderProps: BorderProps = { bounds: bounds, width: maze.borderWidth };
    const fieldRect = bounds.inflate(-maze.borderWidth);
    const walls : WallProps[] = maze.walls.map((w,i) => {
      return {
        key: i,
        points: w.points,
        cellSize: maze.cellSize,
        gridOffset: fieldRect.p1
    }});
    const passes : CellProps[] = maze.passes.map((w,i) => {
      return {
        key: i,
        kind: w.kind,
        gridPos: w.gridPos,
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
          {passes.map(c => <Cell {...c} />)}
          <Pacman/>
        </Layer>
      </Stage>
    );
  }
}

export const Maze: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(MazeView)
