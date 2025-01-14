import React from 'react';
import ReactDOM from "react-dom/client"
import './index.css';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {App} from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>);


