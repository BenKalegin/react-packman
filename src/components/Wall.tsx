import { Component } from 'react';
import * as React from 'react';
import Rectangle from '../geometry/Rectangle';
import PathGenerator from '../geometry/PathGenerator';
import { Path } from 'react-konva';

export interface IWallProps {
    rects: Rectangle[];
}

export default class Wall extends Component<IWallProps, {}> {
    private path: string;
    constructor(props: IWallProps) {
        super(props);
        this.path = PathGenerator.mergeRectangles(props.rects);
    }

    render(): any {
        return (
            <Path data={this.path} fill="darkgray" stroke="black"/>
        );
    }
}

