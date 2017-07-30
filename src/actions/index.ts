export const START_ROUND_ACTION = "START_ROUND";
export const ANIMATION_STEP_ACTION = "ANIMATION_STEP";

export interface IStartRoundAction 
{
    type: typeof START_ROUND_ACTION;
} 

export interface IAnimatedStepAction {
    type: typeof ANIMATION_STEP_ACTION;
    tick: number;
}

export type Action = IStartRoundAction | IAnimatedStepAction;