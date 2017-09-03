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
    const fieldRect = maze.gridSize.scale(maze.cellSize).asRectangleSize().moveBy(maze.gridOffset);
    const bounds = fieldRect.inflate(maze.borderWidth*2);
    const borderProps: BorderProps = { bounds: bounds, width: maze.borderWidth };
    const walls : WallProps[] = maze.walls.map((w,i) => {
      return {
        key: i,
        points: w.points,
        cellSize: maze.cellSize,
        gridOffset: maze.gridOffset
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
          {[0, 1, 2, 3].map(i => <Ghost key={i} index={i} />)}
          <Pacman />
        </Layer>
      </Stage>
    );
  }
}

export const Maze: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(MazeView)
