import * as React from 'react';
import { Component } from 'react';
import './App.css';
import Map from './Map';
import { IMapProps} from './Map';

export interface IAppProps {
    readonly caption: string;
    map: IMapProps;
}

class App extends Component<IAppProps, any> {
    constructor(props: IAppProps) {
        super(props);
        }

    render() {
        return (
            <div className="App">
                <Map {...this.props.map}/>
                <br />
            </div>
        );
    }
}

export default App;