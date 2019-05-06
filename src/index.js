import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

//Reducers
import widgetReducer from "./store/reducers/widget";
import locationReducer from "./store/reducers/location";
import serviceReducer from "./store/reducers/service";
import masterReducer from "./store/reducers/master";
import timeAvailableReducer from "./store/reducers/timeAvailable";
import reservationsReducer from "./store/reducers/reservation";
import authReducer from "./store/reducers/auth";
import salonReducer from "./store/reducers/salon";

//Default url for axios
axios.defaults.baseURL = "https://open-salon.herokuapp.com/api/";

const redux =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null;

const composeEnhancers = redux || compose;

const rootReducer = combineReducers({
    widget: widgetReducer,
    loc: locationReducer,
    ser: serviceReducer,
    mas: masterReducer,
    timeAvailable: timeAvailableReducer,
    res: reservationsReducer,
    auth: authReducer,
    sal: salonReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
