import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Circle, Group } from 'react-konva';
import { Store } from "../model";
import { connect } from 'react-redux';

export type DotsProps = {
  dotPositions: Point[];
  cellSize: Point;
  gridOffset: Point;
}

type ConnectedDispatch = {
}


const mapStateToProps = (state: Store.All): DotsProps => ({
  dotPositions: state.round.dots,
  cellSize: state.game.maze.cellSize,
  gridOffset: state.game.maze.gridOffset
});

const DotsView = (props: DotsProps, disp: ConnectedDispatch) => {
  const bounds =
    props.dotPositions.map(p => p.scale(props.cellSize).offset(props.gridOffset).toRectangle(props.cellSize));

  return (
    <Group> 
      {bounds.map(b => <Circle
        x={b.center.x}
        y={b.center.y}
        fill="darkgray"
        stroke="darkgray"
        radius={b.dx / 10}/>)}
    </Group>
  );
}

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
    });


export const Dots = connect(mapStateToProps, mapDispatchToProps)(DotsView);

