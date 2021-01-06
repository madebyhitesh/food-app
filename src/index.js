import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataContext from "./DataContext"
import {specialMenu,popularItems} from "./data"

const data = {specialMenu,popularItems}

ReactDOM.render(
  <React.StrictMode>
    <DataContext.Provider value={data}>
    <App />
    </DataContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
