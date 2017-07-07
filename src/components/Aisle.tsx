import { Component } from 'react';
import * as React from 'react';
import Rectangle from '../geometry/Rectangle';
import PathGenerator from '../geometry/PathGenerator';
import { Path } from 'react-konva';

export interface IAisleProps {
    rects: Rectangle[];
}

export default class Aisle extends Component<IAisleProps, {}> {
    private path: string;
    constructor(props: IAisleProps) {
        super(props);
        this.path = PathGenerator.mergeRectangles(props.rects);
    }

    render(): any {
        return (
            <Path data={this.path} fill="darkgray" stroke="black"/>
        );
    }
}

