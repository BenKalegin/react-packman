import { Component } from 'react';
import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import Border from "./Border";
import { IBorderProps } from './Border';
import { Rectangle, Point } from '../geometry';
import { IFieldProps, CellKind} from './Field';
import Field from './Field';

export interface IMapProps {
    width: number;
    height: number;
}

class Map extends Component<IMapProps, {}> {
    private borderWidth = 8;

    render() {
        const borderRect = new Rectangle(0, 0, this.props.width, this.props.height);
        const borderProps: IBorderProps = { bounds: borderRect, width: this.borderWidth };
        const fieldRect = borderRect.inflate(-this.borderWidth);
        const gridSize = new Point(26, 29);
        const _ = CellKind.Impassable; 
        // ReSharper disable once InconsistentNaming
        const X = CellKind.Score;
        const p = CellKind.Noscore;
        const g = CellKind.Gate;
        const o = CellKind.GhostsOnly;
        const f = CellKind.Fruit;
        const cells = [
            [X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X],
            [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, X],
            [f, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, f],
            [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, X],
            [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
            [X, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, X],
            [X, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, X],
            [X, X, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, X, X],
            [_, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, p, p, p, g, g, p, p, p, p, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, _, _, _, _, _, _, _, _, p, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, _, o, o, o, o, o, o, _, p, _, _, X, _, _, _, _, _],
            [p, p, p, p, p, X, p, p, p, _, o, o, o, o, o, o, _, p, p, p, X, p, p, p, p, p],
            [_, _, _, _, _, X, _, _, p, _, o, o, o, o, o, o, _, p, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, _, _, _, _, _, _, _, _, p, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, p, p, p, p, p, p, p, p, p, p, p, p, p, p, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, _, _, _, _, _, _, _, _, p, _, _, X, _, _, _, _, _],
            [_, _, _, _, _, X, _, _, p, _, _, _, _, _, _, _, _, p, _, _, X, _, _, _, _, _],
            [X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X],
            [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, X],
            [f, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, f],
            [X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X],
            [_, _, X, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, X, _, _],
            [_, _, X, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, X, _, _],
            [X, X, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, X, X],
            [X, _, _, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, X],
            [X, _, _, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, X],
            [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X]
        ];
        const fieldProps: IFieldProps = {
            gridOffset: borderRect.p1,
            gridSize: gridSize,
            cellSize: new Point(Math.round(fieldRect.dx / gridSize.x), Math.round(fieldRect.dy / gridSize.y)),
            cells: cells
        }
        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>
                    <Border {...borderProps} />
                    <Field {...fieldProps} />
                </Layer>
            </Stage>
        );
    }
}

export default Map;