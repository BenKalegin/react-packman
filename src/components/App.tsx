import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { Maze } from './Maze';
import { Hud } from './Hud';
import { Store } from '../model';
import { animatedStepAction, changeDirectionAction, pauseCommandAction, startApplicationAction } from '../actions';
import { Direction } from '../geometry/';
import * as Perf from 'react-addons-perf';


type OwnProps = Store.App;

type OwnState = {
};

type ConnectedState = {
  paused: boolean;
}

type ConnectedDispatch = {
  animatedStep: (timestamp: number, priorTimestamp: number) => void;
  changeDirection: (direction: Direction) => void;
  start : () => void;
  pause: () => void;
};

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  paused: state.game.paused 
});

function mapDispatchToProps(dispatch: redux.Dispatch<Store.App>): ConnectedDispatch
{
  return {
    animatedStep: (timestamp: number, period: number) => dispatch(animatedStepAction(timestamp, period)),
    changeDirection: (direction) => dispatch(changeDirectionAction(direction)),
    pause: () => dispatch(pauseCommandAction()),
    start: () => dispatch(startApplicationAction()),
  }
};

class AppView extends React.Component<OwnProps & ConnectedDispatch & ConnectedState, OwnState> {
  tickerStarted: boolean;

  constructor() {
    super();
    var w: any = window;
    w.Perf = Perf;
  }

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
    this.props.start();
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

  render() {
    return (
      <div className="App">
        <Maze />
        <Hud />
        <br/>
      </div>
    );
  }
}

export const App: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppView);