import { createStore, compose, applyMiddleware } from "redux";
import blogApp from "./reducer";
import thunk from "redux-thunk";
//redux-thunk
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(blogApp, composeEnhancer(applyMiddleware(thunk)));
export default store;
