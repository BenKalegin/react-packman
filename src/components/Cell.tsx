import { Component } from 'react';
import * as React from 'react';
import { CellKind } from './Field';
import Rectangle from '../geometry/Rectangle';
import { Circle } from 'react-konva';


export interface ICellProps {
    kind: CellKind;
    bounds: Rectangle;
}

export default class Cell extends Component<ICellProps, {}> {
    render(): any {
        const bounds = this.props.bounds;
        return (
            <Circle x={bounds.x + bounds.dx / 2} y={bounds.y + bounds.dy /2} fill="darkgray" stroke="darkgray" radius={bounds.dx / 10}/>
        );
    }
}

