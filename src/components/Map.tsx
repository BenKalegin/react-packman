import { Component } from 'react';
import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import Border from "./Border";
import Border1 = require("./Border");
import IBorderProps = Border1.IBorderProps;
import Rectangle from "../geometry/Rectangle";

export interface IMapProps {
    width: number;
    height: number;
}

class Map extends Component<IMapProps, {}> {

    render() {
        const borderRect = new Rectangle(0, 0, this.props.width, this.props.height);
        const borderProps: IBorderProps = { bounds: borderRect, width: 8 };

        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>
                    <Border {...borderProps}/>
                </Layer>
            </Stage>
        );
    }
}

export default Map;