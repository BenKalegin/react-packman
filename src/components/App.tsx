import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { Maze } from './Maze';
import { Store } from '../model';
import { animatedStepAction, changeDirectionAction, pauseCommandAction } from '../actions/index';
import { Direction } from '../geometry/';
type OwnProps = Store.All;

type OwnState = {
};

type ConnectedState = {
  paused: boolean;
}

type ConnectedDispatch = {
  animatedStep: (timestamp: number, priorTimestamp: number) => void;
  changeDirection: (direction: Direction) => void;
  pause: () => void;
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  paused: state.game.paused
});

function mapDispatchToProps(dispatch: redux.Dispatch<Store.All>): ConnectedDispatch
{
  return {
    animatedStep: (timestamp: number, period: number) => dispatch(animatedStepAction(timestamp, period)),
    changeDirection: (direction) => dispatch(changeDirectionAction(direction)),
    pause: () => dispatch(pauseCommandAction())
  }
};

class AppView extends React.Component<OwnProps & ConnectedDispatch & ConnectedState, OwnState> {
  tickerStarted: boolean; 

  addKeyboardListeners(): void {
      window.addEventListener('keydown', (e) => this.keydown(e));
      window.addEventListener('keyup', (e) => this.keyup(e));
  }

  removeKeyboardListeners(): void {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }


  componentDidMount() {
    this.startTicker();
    this.addKeyboardListeners();
  }

  componentWillUnmount() {
    this.stopTicker();
    this.removeKeyboardListeners();
  }

  keydown(event: KeyboardEvent) : void {
    let key = event.key;

    switch (key) {
    case 'ArrowRight':
      this.props.changeDirection(Direction.Right);
      break;
    case 'ArrowLeft':
      this.props.changeDirection(Direction.Left);
      break;
    case 'ArrowDown':
      this.props.changeDirection(Direction.Down);
      break;
    case 'ArrowUp':
      this.props.changeDirection(Direction.Up);
      break;
    case ' ':
      this.props.pause();
      break;
    }
  }

  keyup(event: KeyboardEvent) {
    let key = event.key;

    switch (key) {
    default:
      // no op
    }
  }

  stopTicker = () => {
    this.tickerStarted = false;
  }
  startTicker = () => {
    this.tickerStarted = true;

    let priorTimestamp = performance.now();

    let ticker = (timestamp: number) => {

      if (this.tickerStarted) {
        if (!this.props.paused) {
          let period = timestamp - priorTimestamp;
          if (period < 0)
            period = 0;
          if (period > 16)
            period = 16;

          this.props.animatedStep(timestamp, period);
        }
        priorTimestamp = timestamp;
        window.requestAnimationFrame(ticker);
      }
    };

    window.requestAnimationFrame(ticker);
  }
//  startPacmanChomp = () => {
//    const { store } = this.context; //todo make typed and move to member
//    store.dispatch(startPacmanChomp());
//  }

//  stopPacmanChomp = () => {
//    const { store } = this.context;
//    store.dispatch(stopPacmanChomp());
//  }

  render() {
    return (
      <div className="App">
        <Maze/>
        <br/>
      </div>
    );
  }
}

export const App: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppView);