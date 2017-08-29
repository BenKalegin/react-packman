import { Component } from 'react';
import * as React from 'react';
import { Point, PathGenerator } from '../geometry';
import { Path } from 'react-konva';

export type WallProps = {
    points: Point[];
    cellSize: Point;
    gridOffset: Point;
}

export default class Wall extends Component<WallProps, {}> {

    private getRandomColor() : string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render(): any {
        return (
          <Path data={PathGenerator.outlinePoints(this.props.points, this.props.gridOffset, this.props.cellSize)}
                fill={this.getRandomColor()}
                stroke="black" 
            />
     );
    }
}

