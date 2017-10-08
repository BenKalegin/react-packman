import * as React from 'react';
import * as redux from 'redux';
import { Point, Direction } from '../geometry';
import { Path, Group, Circle } from 'react-konva';
import { connect } from 'react-redux';
import { Store } from '../model';


type ConnectedState = {
  cellSize: Point;
  position: Point;
  direction: Direction;
}

type OwnProps = {
  index: number
}

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  cellSize: state.game.maze.cellSize,
  position: state.heat.ghosts[ownProps.index].position,
  direction: state.heat.ghosts[ownProps.index].direction,
});

interface ConnectedDispatch {
}
const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
})

class GhostView extends React.Component<ConnectedState & OwnProps, {}> {

  color() : string {
    switch(this.props.index) {
      case 0:
        return "red"; // blinky
      case 1:
        return "orange"; // clyde
      case 2:
        return "pink"; // pinky
      case 3:
        return "cyan"; // inky
    }
    return "";
  } 

  render() {
    const props = this.props;
    const absPos = props.position.scale(props.cellSize).offset(props.cellSize.negate.scale(0.5));

    const eyeOffset = Point.vector(this.props.direction).scale(2);

    let leftEye = new Point(8, 13).offset(eyeOffset);
    let rightEye = new Point(20, 13).offset(eyeOffset);

    const padding = 4;
    const scaleX = 2 * (props.cellSize.x - padding) / 28;
    const scaleY = 2 * (props.cellSize.y - padding) / 28;

    return (
      <Group x={absPos.x + padding} y={absPos.y + padding} scaleX={scaleX} scaleY={ scaleY}>
      <Path data="M0 28 L0 14 C0 6 6 0 14 0 C22 0 28 6 28 14 L28 28 L23.333 23.333 L18.666 28 L14 23.333 L9.333 28 L4.666 23.333 L0 28"
        fill={this.color()}
        stroke="black" strokeWidth={1/scaleX} />
      <Path data="M8 8 C5 8 4 11 4 13 C4 15 5 18 8 18 C11 18 12 15 12 13 C12 11 11 8 8 8 M20 8 C17 8 16 11 16 13 C16 15 17 18 20 18 C23 18 24 15 24 13 C24 11 23 8 20 8"
              fill="white"
              stroke="black" strokeWidth={1/scaleX}/>
        <Circle radius={2} x={rightEye.x} y={rightEye.y} fill="black" />
        <Circle radius={2} x={leftEye.x} y={leftEye.y} fill="black" />
      </Group>

    );

  }
}

export const Ghost: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(GhostView);
