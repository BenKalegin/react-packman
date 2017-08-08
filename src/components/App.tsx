import * as React from 'react';
import './App.css';
import { Maze } from './Maze';
import { Store } from '../model';

class App extends React.Component<Store.All, any> {

    render() {
        return (
            <div className="App">
                <Maze {...this.props}/>
                <br />
            </div>
        );
    }
}

export default App;