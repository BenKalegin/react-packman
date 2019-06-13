import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../model';
import './Hud.css';

type ConnectedState = {
  score: number;
  lives: number;
};

type ConnectedDispatch = {
};

type OwnProps = {
};

type OwnState = {
};

const mapStateToProps = (state: Store.App, ownProps: OwnProps): ConnectedState => ({
  score: state.game.score,
  lives: state.game.lives
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.App>): ConnectedDispatch => ({
});

class HudView extends React.Component<ConnectedState, OwnState> {

  render() {
    return (
      <div className="hud">
        <div className="score">
          <span className="label">Score</span>
          <span className="value">{this.props.score}</span>
        </div>
        <div className="lives">
          <span className="label">Lives</span>
          <span className="value">{this.props.lives}</span>
        </div>
      </div>
    );
  }
}

export const Hud: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(HudView);
