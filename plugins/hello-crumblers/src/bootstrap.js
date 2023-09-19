import React from 'react';
import ReactDOM from 'react-dom';
import Frontend from './Frontend';
import Admin from './Admin';

const frontend = (el) => {
  ReactDOM.render(<Frontend />, el);
};

const admin = (el) => {
  ReactDOM.render(<Admin />, el);
};

const devRoot = document.querySelector('#in-isolation');

if (devRoot) {
  frontend(devRoot);
}

export { frontend, admin };
