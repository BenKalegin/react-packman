import * as React from 'react';
import * as redux from 'redux';
import { Point } from '../geometry';
import { Text } from 'react-konva';
import { connect } from 'react-redux';
import { Store } from '../model';


type ConnectedState = {
  mazeSize: Point;
  text?: string;
}

type ConnectedDispatch = {
}

type OwnProps = {
}

type OwnState = {
}

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  mazeSize: state.game.maze.gridSize.scale(state.game.maze.cellSize),
  text: state.game.modalText
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
});



class ModalTextView extends React.Component<ConnectedState, OwnState> {
  render() {
    const mazeSize = this.props.mazeSize;
    const textHeight = mazeSize.y / 20;

    return <Text
             x={0}
             y={mazeSize.y / 2 - textHeight / 2}
             fill="yellow"
             text={this.props.text || ''}
             visible={this.props.text != undefined}  
             fontSize={textHeight}
             fontStyle="bold"
             fontFamily='Comic Sans MS'
             width = {mazeSize.x}
             padding = {0}
             align = 'center'

            />;
  }
}

export const ModalText: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalTextView);



