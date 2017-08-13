import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as redux from 'redux';
import createProvider from './reducers/Provider';
import { rootReducer } from './reducers';
import { Store } from './model';

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;

const store = devtools(redux.createStore)(rootReducer,Store.initial());


const Provider = createProvider<Store.All>();
const AppContainer: React.StatelessComponent<{}> = () => (
    <Provider store={store} target={App} />
);

ReactDOM.render(<AppContainer/>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
