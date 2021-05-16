import {applyMiddleware, createStore} from 'redux';
import reducer from '../reducer/index';
import thunk from 'redux-thunk';  //me permite trabajar de manera asincrona con las actions que consultan a la api
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;

