import { Component } from 'react';
import * as React from 'react';
import { Point, Direction } from '../geometry';
import { Arc } from 'react-konva';

export interface IPacmanProps {
    angle: number;
    direction: Direction;
    cellSize: Point;
    position: Point;
    gridOffset: Point;
}

export default class Pacman extends Component<IPacmanProps, {}> {
    constructor(props: IPacmanProps) {
        super(props);
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

        const rotation = calcRotation(this.props.direction) + this.props.angle / 2; 
        return (
            <Arc
                x={absPos.x}
                y={absPos.y}
                width={this.props.cellSize.x}
                height={this.props.cellSize.y}
                angle={-this.props.angle}
                rotation={rotation}
                innerRadius={0}
                outerRadius={this.props.cellSize.y / 2}
                fill="yellow"
                stroke="red"
            />
        );
    }
}