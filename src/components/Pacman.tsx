import * as React from 'react';
import * as redux from 'redux';
import { Point, Direction } from '../geometry';
import { Arc } from 'react-konva';
import { connect } from 'react-redux';
import { Store } from '../model';


type ConnectedState = {
  cellSize: Point;
  position: Point;
  gridOffset: Point;
  mouthAngle: number;
  direction: Direction;
}

type ConnectedDispatch = {
}

type OwnProps = {
}

type OwnState = {
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  cellSize: state.maze.cellSize,
  gridOffset: state.maze.gridOffset,
  position: state.pacman.position,
  direction: state.pacman.direction,
  mouthAngle: state.pacman.mouthAngle

});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
});


class PacmanView extends React.Component<ConnectedState, OwnState> {

  render() {
    const props = this.props;
    const absPos = props.position.scale(props.cellSize).offset(props.gridOffset).offset(props.cellSize.scale(.58));

    const calcRotation = (dir: Direction) => {
      switch (dir) {
      case Direction.Up:
        return -90;
      case Direction.Down:
        return 90;
      case Direction.Left:
        return 180;
      case Direction.Right:
      default:
        return 0;
      }
    }

    const rotation = calcRotation(props.direction) + props.mouthAngle / 2;
    return (
      <Arc
        x={absPos.x}
        y={absPos.y}
        angle={-props.mouthAngle}
        rotation={rotation}
        innerRadius={0}
        outerRadius={props.cellSize.y / 2}
        fill="yellow"
        stroke="red"/>
    );
  }
}

export const Pacman: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(PacmanView);
