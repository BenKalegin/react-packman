import { Component } from 'react';
import * as React from 'react';
import { Group, Rect } from 'react-konva';
import Rectangle from '../geometry/Rectangle';

export interface IBorderProps {
    bounds: Rectangle;
    width: number;
}

class Border extends Component<IBorderProps, {}> {
    private outer: Rectangle;
    private inner: Rectangle;
    private lineWidth = 1;
    private outerRadius: number;
    private innerRadius: number;

    constructor(props: IBorderProps) {
        super(props);
        this.outer = props.bounds;
        this.inner = this.outer.inflate(-(props.width - 2 * this.lineWidth - 1));
        this.outerRadius = 15;
        this.innerRadius = this.outerRadius - props.width - this.lineWidth;
    }

    render(): any {
        return (
            <Group>
                <Rect x={this.outer.x} y={this.outer.y} width={this.outer.dx} height={this.outer.dy} cornerRadius={this.outerRadius} stroke="black" />
                <Rect x={this.inner.x} y={this.inner.y} width={this.inner.dx} height={this.inner.dy} cornerRadius={9} stroke="black" />
            </Group>
        );
    }
}

export default Border;