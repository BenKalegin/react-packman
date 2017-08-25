import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Circle, Group } from 'react-konva';
import { Store } from "../model";
import { connect } from 'react-redux';

export type DotsProps = {
  dots: Store.Loot[];
  cellSize: Point;
  gridOffset: Point;
}

export type DotProps = {
  center: Point;
  radius: number;
  visible: boolean;
}

type ConnectedDispatch = {
}


const mapStateToProps = (state: Store.All): DotsProps => ({
  dots: state.round.dots,
  cellSize: state.game.maze.cellSize,
  gridOffset: state.game.maze.gridOffset
});

class DotView extends React.Component<DotProps> {
  public shouldComponentUpdate(nextProps: DotProps, nextState: {}) {
    return nextProps.visible  !== this.props.visible;
  }

  render() {
    return (
      <Circle
        x={this.props.center.x}
        y={this.props.center.y}
        visible={this.props.visible}
        fill="darkgray"
        stroke="darkgray"
        radius={this.props.radius}/>);
  }
}

class DotsView extends React.Component<DotsProps> {
  static countVisible = (props: DotsProps): number => props.dots.reduce((a, l) => a + (l.collected ? 0 : 1), 0);
 
  render() {
    const dots =
      this.props.dots.map(p => ({
        bounds: p.position.scale(this.props.cellSize).offset(this.props.gridOffset).toRectangle(this.props.cellSize),
        visible: !p.collected
      }));

    return (
      <Group>
        {dots.map((b, i) => <DotView key={i} center={b.bounds.center} visible={b.visible} radius={b.bounds.dx / 10} />)}
      </Group>
    );
  }
}

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({});


export const Dots = connect(mapStateToProps, mapDispatchToProps)(DotsView);

