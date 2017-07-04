import * as React from 'react';
import './App.css';
import Map from "./Map";
import Index = require("../index");
import IAppProps = Index.IAppProps;
const logo = require('../logo.svg');

class App extends React.Component<IAppProps, any> {
    constructor(props: IAppProps) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <Map {...this.props.map}/>
            </div>
        );
    }
}

export default App;