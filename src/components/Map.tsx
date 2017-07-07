import { Component } from 'react';
import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import Border from "./Border";
import Border1 = require("./Border");
import IBorderProps = Border1.IBorderProps;
import Rectangle from "../geometry/Rectangle";
import {IFieldProps} from "./Field";
import Field from "./Field";

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
        const fieldProps: IFieldProps = {bounds: fieldRect, aisles: [[new Rectangle(40, 40, 40, 40)]] }
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