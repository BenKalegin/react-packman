import { Component } from 'react';
import * as React from 'react';
import Point from '../geometry/Point';
import { Group } from 'react-konva';
import {ICellProps} from "./Cell";
import Cell  from "./Cell";
import Rectangle from '../geometry/Rectangle';

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
        const {x, y} = this.props.gridOffset;
        const dx = this.props.cellSize.x;
        const dy = this.props.cellSize.y;

        let cells = new Array<ICellProps>();
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
                const kind: CellKind = row[cellIndex];
                var cell: ICellProps = {
                    kind: kind,
                    bounds: new Rectangle(x + dx * cellIndex, y + dy * rowIndex, dx, dy)
                };
                cells.push(cell);
            }
        }


        return (
            <Group>
                {cells.map(c => c.kind === CellKind.Impassable ? null: <Cell {...c}/>)}
            </Group>
        );
    }
}