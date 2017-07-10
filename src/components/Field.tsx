import { Component } from 'react';
import * as React from 'react';
import { Point} from '../geometry';
import { Group } from 'react-konva';
import {ICellProps} from './Cell';
import Cell from './Cell';
import Wall from './Wall';
import { IWallProps } from './Wall';
import WallAggregator from '../geometry/WallAggregator';

export enum CellKind {
    Impassable,
    Noscore,
    Score,
    Gate,
    GhostsOnly,
    Fruit
}

export interface IFieldProps {
    gridOffset: Point,
    gridSize: Point,
    cellSize: Point,
    cells: CellKind[][];
}

export default class Field extends Component<IFieldProps, {}> {

    render(): any {
        // const aisleProps: IWallProps = { rects: this.props.aisles[0] };
        const rows = this.props.cells;

        let cells = new Array<ICellProps>();
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
                const kind: CellKind = row[cellIndex];
                var cell: ICellProps = {
                    kind: kind,
                    gridPos: new Point(cellIndex, rowIndex),
                    cellSize: this.props.cellSize,
                    gridOffset: this.props.gridOffset
                };
                cells.push(cell);
            }
        }
        var walls: IWallProps[] = WallAggregator.aggregate(
            cells.filter(c => c.kind === CellKind.Impassable).map(c => { return c.gridPos; }))
            .map(ps => { return {
                cellSize: this.props.cellSize,
                gridOffset: this.props.gridOffset,
                points: ps
            } });
        return (
            <Group>
                {walls.map(w => <Wall {...w}/>)}
                {cells.map(c => c.kind === CellKind.Impassable ? null: <Cell {...c}/>)}
            </Group>
        );
    }
}