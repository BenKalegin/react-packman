import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Map = require("./components/Map");
import IMapProps = Map.IMapProps;

export interface IAppProps {
    readonly caption: string;
    map: IMapProps;
}

export class AppModel implements IAppProps {
    readonly caption: string;
    readonly map: Map.IMapProps;
    constructor(caption: string) {
        this.caption = caption;
        this.map = new MapModel();
        this.map.width = 788;
        this.map.height = 840;
    }
}

class MapModel implements IMapProps {
    width: number;
    height: number;
}
var model = new AppModel('react-pacman');

ReactDOM.render(
  <App {...model}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
