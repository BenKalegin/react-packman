import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Circle, Group } from 'react-konva';
import { Store } from "../model";
import { connect } from 'react-redux';

export type PelletProps = {
  pelletsPositions: Point[];
  cellSize: Point;
  gridOffset: Point;
};

type ConnectedDispatch = {
}

const PelletsView = (props: PelletProps, disp: ConnectedDispatch) => {
  const bounds =
    props.pelletsPositions.map(p => p.scale(props.cellSize).offset(props.gridOffset).toRectangle(props.cellSize));

  return (
    <Group>
    {bounds.map(b => <Circle
                      x={b.center.x}
                      y={b.center.y}
                      fill="darkgray"
                      stroke="none"
                      radius={b.dx / 3} />)}
    </Group>
  );
}

const mapStateToProps = (state: Store.All): PelletProps => ({
  pelletsPositions: state.round.pellets,
  cellSize: state.game.maze.cellSize,
  gridOffset: state.game.maze.gridOffset
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
});


export const Pellets = connect(mapStateToProps, mapDispatchToProps)(PelletsView);

