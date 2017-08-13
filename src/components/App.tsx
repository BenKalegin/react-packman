import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { Maze } from './Maze';
import { Store } from '../model';
import { animatedStepAction, changeDirectionAction } from '../actions/index';
import { Direction } from '../geometry/';
type OwnProps = Store.All;

type OwnState = {
};

type ConnectedDispatch = {
  animatedStep: () => void;
  changeDirection: (direction: Direction) => void;
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): Store.All => (state);

let tick = 0;
function mapDispatchToProps(dispatch: redux.Dispatch<Store.All>): ConnectedDispatch
{
  return {
    animatedStep: () => dispatch(animatedStepAction(++tick)),
    changeDirection: (direction) => dispatch(changeDirectionAction(direction)) 
  }
};

class AppView extends React.Component<OwnProps & ConnectedDispatch, OwnState> {
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
    //case 'U+0020':
    default:
      // no op
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

    let ticker = () => {
      if (this.tickerStarted) {
        if (tick < 1000){
          this.props.animatedStep();

          window.requestAnimationFrame(ticker);
        }
        // setTimeout(ticker, 500);
      }
    };

    /*if (!store.getState().tickerStarted)*/ {
      console.log("Starting ticker");
      //store.dispatch(tickerStarted());
      ticker();
    }
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