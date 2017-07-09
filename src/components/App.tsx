import * as React from 'react';
import './App.css';
import Map from "./Map";
import Index = require("../index");
import IAppProps = Index.IAppProps;

class App extends React.Component<IAppProps, any> {
    constructor(props: IAppProps) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Map {...this.props.map}/>
            </div>
        );
    }
}

export default App;