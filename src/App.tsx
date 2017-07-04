import * as React from 'react';
import './App.css';
import { Stage, Rect, Layer } from 'react-konva';

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <Stage width={700} height={700}>
                    <Layer>
                        <Rect x={12} y={12} width={150} height={150} cornerRadius={15} stroke="black" />
                        <Rect x={19} y={19} width={150} height={150} cornerRadius={9} stroke="black" />
                    </Layer>
                </Stage>;</div>
        );
    }
}

export default App;