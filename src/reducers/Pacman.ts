import { Action, ANIMATION_STEP_ACTION } from "../actions";
import { IPacmanState } from "../components/Pacman";


const defaultPacmanState: IPacmanState = {
    animationTick: 0,
    mouthAngle: 90
};

export function pacmanReducer(state: IPacmanState = defaultPacmanState, action: Action): IPacmanState {
    switch (action.type) {
        case ANIMATION_STEP_ACTION:
            const tick: number = action.tick;

            const animationSpan = 10;
            let angle = 90 * Math.abs(tick % animationSpan - animationSpan / 2) / (animationSpan / 2);
            // prevent flicking when angle reaches 0
            if (angle <= 0)
                angle = 0.1;

            return {
                ...state,
                animationTick: tick,
                mouthAngle: angle
            };
    default:
        return state;
    }
}