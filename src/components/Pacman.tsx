import { Component } from 'react';
import * as React from 'react';
import { Point, Direction } from '../geometry';
import { Arc } from 'react-konva';

export interface IPacmanProps {
    direction: Direction;
    cellSize: Point;
    position: Point;
    gridOffset: Point;
    eatAnimation: boolean;
}

interface IPacmanState {
    animationTick: number;
    mouthAngle: number;
}

export default class Pacman extends Component<IPacmanProps, IPacmanState> {

    private timer: number;
    private renderedTick = 0;
    private tickCounter = 0;

    constructor(props: IPacmanProps) {
        super(props);
        this.state = {
            animationTick: 0,
            mouthAngle: 90
        };
    }

    componentWillMount() {
        if (!this.props.eatAnimation) {
            return;
        }


        const clock = () => {
            this.timer = window.setTimeout(() => {
                this.tickCounter++;
                const animationSpan = 10; 
                let angle = 90 * Math.abs(this.tickCounter % animationSpan - animationSpan / 2) / (animationSpan / 2);
                // prevent flicking when angle reaches 0
                if (angle <= 0)
                    angle = 0.1;
                this.setState({
                    animationTick: this.tickCounter,
                    mouthAngle: angle
                });
                clock();
            }, 30);
        };

        clock();
    }

    componentWillUnmount() {
        if (!this.props.eatAnimation) {
            return;
        }
        clearTimeout(this.timer);
    }

    shouldComponentUpdate(nextProps: Readonly<IPacmanProps>, nextState: Readonly<IPacmanState>, nextContext: any): boolean{
        if (this.props.eatAnimation) { 
            if (this.renderedTick !== this.state.animationTick) {
                if (this.state.animationTick > 0)
                    this.renderedTick = this.state.animationTick;
                return true;
            }
            return false; 
        }
        return false;
    }

    render(): any {
        const absPos = this.props.position.scale(this.props.cellSize).offset(this.props.gridOffset).offset(this.props.cellSize.scale(.5));

        const calcRotation = (dir: Direction) => {
            switch (dir) {
            case Direction.Up:
                return -90;
            case Direction.Down:
                return 90;
            case Direction.Left:
                return 180;
            case Direction.Right:
            default:
                return 0;
            }
        }

        const rotation = calcRotation(this.props.direction) + this.state.mouthAngle / 2; 
        return (
            <Arc
                x={absPos.x}
                y={absPos.y}
                angle={-this.state.mouthAngle}
                rotation={rotation}
                innerRadius={0}
                outerRadius={this.props.cellSize.y / 2}
                fill="yellow"
                stroke="red"
            />
        );
    }
}