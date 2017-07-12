import { Component } from 'react';
import * as React from 'react';
import { Point, Rectangle, PathGenerator } from '../geometry';
import { Rect, Group } from 'react-konva';

export interface IWallProps {
    points: Point[];
    cellSize: Point;
    gridOffset: Point;
}

export default class Wall extends Component<IWallProps, {}> {
    private path: string;
    constructor(props: IWallProps) {
        super(props);
        this.path = PathGenerator.outlinePoints(props.points, props.gridOffset, props.cellSize);
    }

    private getRandomColor() : string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render(): any {
        const {x,y} = this.props.gridOffset;
        const dx = this.props.cellSize.x;
        const dy = this.props.cellSize.y;
        const rects = this.props.points.map(p => new Rectangle(x + dx * p.x, y + dy * p.y, dx, dy));
        const randomColor = this.getRandomColor();
        const props = rects.map(r => {
            return {
                x: r.x,
                y: r.y,
                width: r.dx,
                height: r.dy,
                fill: randomColor
            };
        });
        return (
            <Group>
                {props.map(p => <Rect {...p}/>)} 
            </Group>
        );

//            <Path data={this.path} fill="darkgray" stroke="black"/>
    }
}

