import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../model';
import './Hud.css';

type ConnectedState = {
  score: number;
}

type ConnectedDispatch = {
}

type OwnProps = {
}

type OwnState = {
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  score: state.game.score
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
});

class HudView extends React.Component<ConnectedState, OwnState> {

  render(): any {
    return (
      <div className="hud">
        <span className="score-label">Score</span>
        <span className="score-value">{this.props.score}</span>
      </div>
    );
  }
}

export const Hud: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(HudView);
