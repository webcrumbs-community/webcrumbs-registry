import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

import * as HelloCrumblers from './components/HelloCrumblers';
import Header from './components/Header';

export default () => {
  return (
    <BrowserRouter>
        <div>
          <Header />
          <HelloCrumblers.Frontend />
          <HelloCrumblers.Admin />
        </div>
    </BrowserRouter>
  );
};
