import { Component } from 'react';
import * as React from 'react';
import { Group, Rect } from 'react-konva';
import { Rectangle } from '../geometry';

export type BorderProps = {
    bounds: Rectangle;
    width: number;
}

class Border extends Component<BorderProps, {}> {

    render(): any {
      const lineWidth = 1;
      const outer = this.props.bounds;
      const inner = outer.inflate(-(this.props.width - 2 * lineWidth - 1));
      const outerRadius = 15;
      const innerRadius = 9; //outerRadius - this.props.width - lineWidth;
        return (
            <Group>
                <Rect
                    x={outer.x}
                    y={outer.y}
                    width={outer.dx}
                    height={outer.dy}
                    cornerRadius={outerRadius}
                    stroke="black" />
                <Rect
                    x={inner.x}
                    y={inner.y}
                    width={inner.dx}
                    height={inner.dy}
                    cornerRadius={innerRadius}
                    stroke="black" />
            </Group>
        );
    }
}

export default Border;