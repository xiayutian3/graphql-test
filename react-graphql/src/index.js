import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import App from "./graphql/01query.js"
// import App from "./graphql/02query-参数"
// import App from "./graphql/03mutation"
// import App from "./graphql/04mutation-update"
import App from "./graphql/05mutation-delete"


import reportWebVitals from './reportWebVitals';

// 18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// 16
ReactDOM.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  ,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
