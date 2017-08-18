import * as React from 'react';
import * as redux from 'redux';
import { Point, Direction } from '../geometry';
import { Path, Group, Circle } from 'react-konva';
import { connect } from 'react-redux';
import { Store } from '../model';


type ConnectedState = {
  cellSize: Point;
  position: Point;
  gridOffset: Point;
  direction: Direction;
}

type OwnProps = {
  index: number
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  cellSize: state.maze.cellSize,
  gridOffset: state.maze.gridOffset,
  position: state.ghosts[ownProps.index].position,
  direction: state.ghosts[ownProps.index].direction,
});

interface ConnectedDispatch {
}
const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
})

class GhostView extends React.Component<ConnectedState & OwnProps, {}> {

  render() {
    const props = this.props;
    const absPos = props.position.scale(props.cellSize).offset(props.gridOffset).offset(props.cellSize.scale(.58));
    //const data = `M ${mouth1.x} ${mouth1.y} A ${radius} ${radius}, 0, 1, 0, ${mouth2.x} ${mouth2.y} L ${position.x} ${position.y} Z`;

//    ctx.fillStyle = 'black';
//    ctx.beginPath();
//    ctx.arc(18, 14, 2, 0, Math.PI * 2, true);
//    ctx.fill();
//
//    ctx.beginPath();
//    ctx.arc(6, 14, 2, 0, Math.PI * 2, true);
//    ctx.fill();

    return (
      <Group x={absPos.x} y={absPos.y} width={20}>
      <Path data="M0 28 L0 14 C0 6 6 0 14 0 C22 0 28 6 28 14 L28 28 L23.333 23.333 L18.666 28 L14 23.333 L9.333 28 L4.666 23.333 L0 28"
        fill="yellow"
        stroke="black" />
      <Path data="M8 8 C5 8 4 11 4 13 C4 15 5 18 8 18 C11 18 12 15 12 13 C12 11 11 8 8 8 M20 8 C17 8 16 11 16 13 C16 15 17 18 20 18 C23 18 24 15 24 13 C24 11 23 8 20 8"
              fill="white"
              stroke="black" />
        <Circle radius={2} x={18} y={14} fill="black" />
        <Circle radius={2} x={6} y={14} fill="black" />
      </Group>

    );

  }
}

export const Ghost: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(GhostView);
