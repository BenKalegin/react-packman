import { Component } from 'react';
import * as React from 'react';
import { CellKind } from './Field';
import { Point, Rectangle } from '../geometry';
import { Circle } from 'react-konva';


export interface ICellProps {
    kind: CellKind;
    gridPos: Point;
    cellSize: Point;
    gridOffset: Point;
}

export default class Cell extends Component<ICellProps, {}> {
    render(): any {
        const gridPos = this.props.gridPos;
        let dx = this.props.cellSize.x;
        let dy = this.props.cellSize.y;
        const bounds = new Rectangle(this.props.gridOffset.x + dx * gridPos.x, this.props.gridOffset.y + dy * gridPos.y, dx, dy)

        return (
            <Circle x={bounds.x + bounds.dx / 2} y={bounds.y + bounds.dy /2} fill="darkgray" stroke="darkgray" radius={bounds.dx / 10}/>
        );
    }
}

