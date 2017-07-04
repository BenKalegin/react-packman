import * as React from 'react';
import { Stage, Rect, Layer } from 'react-konva';


export interface IMapProps {
    width: number;
    height: number;
}

class Map extends React.Component<IMapProps, {}> {
    render() {
        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>
                    <Rect x={11} y={11} width={this.props.width-12} height={this.props.height-12} cornerRadius={15} stroke="black" />
                    <Rect x={19} y={19} width={150} height={150} cornerRadius={9} stroke="black" />
                </Layer>
            </Stage>
        );
    }
}

export default Map;