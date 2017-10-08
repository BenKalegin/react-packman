import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../model';
import './Hud.css';

type ConnectedState = {
  score: number;
  lives: number;
}

type ConnectedDispatch = {
}

type OwnProps = {
}

type OwnState = {
}

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  score: state.game.score,
  lives: state.game.lives
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
});

class HudView extends React.Component<ConnectedState, OwnState> {

  render(): any {
    return (
      <div className="hud">
        <span className="score-label">Score</span>
        <span className="score-value">{this.props.score}</span>
        <span className="lives-label">Lives</span>
        <span className="lives-value">{this.props.lives}</span>
      </div>
    );
  }
}

export const Hud: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(HudView);
