import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as redux from 'redux';
import createProvider from './reducers/Provider';
import { rootReducer } from './reducers';
import { Store } from './model';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { Action, Dispatch, MiddlewareAPI } from "redux";

const sagaMiddle = createSagaMiddleware();

let devtools: redux.GenericStoreEnhancer = window['devToolsExtension']
  ? window['devToolsExtension']()
  : (f: any) => f;
const sagaEnhancer = redux.applyMiddleware(sagaMiddle);

const asyncDispatchMiddleware = (store: MiddlewareAPI<Store.App>) => (next : Dispatch<Action>) => (action: Action) => {
  let syncActivityFinished = false;
  let actionQueue: Action[] = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(actions: Action[]) {
    actionQueue = actionQueue.concat(actions);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};
const asyncDispatchEnhancer = redux.applyMiddleware(asyncDispatchMiddleware); 

const enhancers = redux.compose(asyncDispatchEnhancer, sagaEnhancer, devtools);

const store = redux.createStore(rootReducer, Store.defaultApp(), enhancers as redux.GenericStoreEnhancer);
sagaMiddle.run(rootSaga);

const Provider = createProvider<Store.App>();
const AppContainer: React.StatelessComponent<{}> = () => (
    <Provider store={store} target={App} />
);

ReactDOM.render(<AppContainer/>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
