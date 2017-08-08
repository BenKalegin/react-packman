import { Component } from 'react';
import * as React from 'react';
import { Point, Rectangle, PathGenerator } from '../geometry';
import { Rect, Group } from 'react-konva';

export type WallProps = {
    points: Point[];
    cellSize: Point;
    gridOffset: Point;
}

export default class Wall extends Component<WallProps, {}> {
    private path: string;
    constructor(props: WallProps) {
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
        const rects = this.props.points.map(p => {
            let rectangle = new Rectangle(x + dx * p.x, y + dy * p.y, dx, dy);
            if (!this.props.points.some(p1 => p1.y === p.y && p1.x === p.x - 1)) {
                rectangle.p1.x += dx / 2;
            }
            if (!this.props.points.some(p1 => p1.y === p.y && p1.x === p.x + 1)) {
                rectangle.p2.x -= dx / 2;
            }
            if (!this.props.points.some(p1 => p1.x === p.x && p1.y === p.y - 1)) {
                rectangle.p1.y += dy / 2;
            }
            if (!this.props.points.some(p1 => p1.x === p.x && p1.y === p.y + 1)) {
                rectangle.p2.y -= dy / 2;
            }
            return rectangle;
        });
        
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

