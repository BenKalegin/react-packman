import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { Maze } from './Maze';
import { Store } from '../model';
import { animatedStepAction } from '../actions/index';

type OwnProps = Store.All;

type OwnState = {
};

type ConnectedDispatch = {
  animatedStep: () => void;
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): Store.All => (state);

let tick = 0;
function mapDispatchToProps(dispatch: redux.Dispatch<Store.All>): ConnectedDispatch
{
  return {
    animatedStep: () => dispatch(animatedStepAction(++tick))
  }
};

class AppView extends React.Component<OwnProps & ConnectedDispatch, OwnState> {

  unsubscribe: () => void;

  componentDidMount() {
    this.startTicker();
    // this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  startTicker = () => {
    let ticker = () => {
      /*if (this.state.tickerStarted)*/ {
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