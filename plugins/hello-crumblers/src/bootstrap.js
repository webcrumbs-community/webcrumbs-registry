import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// If we are in development and in isolation,
// call mount immediately
const devRoot = document.querySelector('#in-isolation');

if (devRoot) {
  mount(devRoot);
}

// We are running through container
// and we should export the mount function
export { mount };
