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

export default class Pacman extends Component<IPacmanProps> {

    private renderedTick = 0;

//    shouldComponentUpdate(nextProps: Readonly<IPacmanProps>, nextState: Readonly<any>, nextContext: any): boolean{
//        if (this.props.eatAnimation) { 
//            if (this.renderedTick !== this.state.animationTick) {
//                if (this.state.animationTick > 0)
//                    this.renderedTick = this.state.animationTick;
//                return true;
//            }
//            return false; 
//        }
//        return false;
//    }

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

        const rotation = calcRotation(this.props.direction) + this.props.mouthAngle / 2; 
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