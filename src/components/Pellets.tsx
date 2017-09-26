import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Circle, Group } from 'react-konva';
import { Store } from "../model";
import { connect } from 'react-redux';

export type PelletProps = {
  pellets: Store.Loot[];
  cellSize: Point;
};

type ConnectedDispatch = {
}

const PelletsView = (props: PelletProps, disp: ConnectedDispatch) => {
  const bounds =
    props.pellets.map(p => ({
      bounds: p.position.scale(props.cellSize).toRectangle(props.cellSize),
      visible: !p.collected,
}));

  return (
    <Group>
      {bounds.map((b, i) =>
        <Circle
            key={i}
            visible={b.visible}
            x={b.bounds.center.x}
            y={b.bounds.center.y}
            fill="darkgray"
            stroke="none"
            radius={b.bounds.dx / 3} />
      )}
    </Group>
  );
}

const mapStateToProps = (state: Store.All): PelletProps => ({
  pellets: state.round.pellets,
  cellSize: state.game.maze.cellSize,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
});


export const Pellets = connect(mapStateToProps, mapDispatchToProps)(PelletsView);

