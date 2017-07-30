import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppProps } from './components/App';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Store, createStore } from 'redux';
import createProvider from "./reducers/Provider";
import { rootReducer } from "./reducers";

const store: Store<IAppProps> = createStore<IAppProps>(rootReducer);

const Provider = createProvider<IAppProps>();
const AppContainer: React.StatelessComponent<any> = () => (
    <Provider store={store} target={App} />
);

ReactDOM.render(<AppContainer/>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
