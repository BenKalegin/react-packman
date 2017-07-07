import { Component } from 'react';
import * as React from 'react';
import Rectangle from '../geometry/Rectangle';
import { Group, Rect } from 'react-konva';
import Aisle from './Aisle';
import { IAisleProps } from './Aisle';

export interface IFieldProps {
    bounds: Rectangle;
    aisles: Rectangle[][];
}

export default class Field extends Component<IFieldProps, {}> {

    render(): any {
        let bounds = this.props.bounds;
        const aisleProps: IAisleProps = { rects: this.props.aisles[0] };
        return (
            <Group>
                <Rect x={bounds.x} y={bounds.y} width={bounds.dx} height={bounds.dy} cornerRadius={8} fill="darkgray" />
                {this.props.aisles.map(a => <Aisle {...aisleProps}/>)}
            </Group>
        );
    }
}