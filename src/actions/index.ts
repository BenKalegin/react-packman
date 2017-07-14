export const START_ROUND = "START_ROUND";

export interface IAction {
    type: string;
}

export class StartRoundAction implements IAction
{
    type: string = START_ROUND;

} 
