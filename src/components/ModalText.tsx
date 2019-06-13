import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Text } from 'react-konva';
import { connect } from 'react-redux';
import { Store } from '../model';

type ConnectedState = {
  mazeSize: Point;
  textCenter: Point;
  cellSize: Point;
  text?: string;
};

type ConnectedDispatch = {
};

type OwnProps = {
};

type OwnState = {
};

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  mazeSize: state.game.maze.gridSize.scale(state.game.maze.cellSize),
  textCenter: state.game.maze.textPos,
  cellSize: state.game.maze.cellSize,
  text: state.game.modalText
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
});

class ModalTextView extends React.Component<ConnectedState, OwnState> {
  render() {
    const mazeSize = this.props.mazeSize;

    return (
      <Text
        x={0}
        y={this.props.textCenter.scale(this.props.cellSize).y}
        fill="yellow"
        text={this.props.text || ''}
        visible={this.props.text !== undefined}  
        fontSize={this.props.cellSize.y * 1.5}
        fontStyle="bold"
        fontFamily="fantasy"
        width={mazeSize.x}
        padding={0}
        align="center"
      />);
  }
}

export const ModalText: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalTextView);