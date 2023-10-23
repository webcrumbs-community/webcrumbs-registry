import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { mount } from 'marketing/Marketing';

const App = () => {
  console.log(mount);
  return (
    <div>
      something
      <BrowserRouter>
        <Routes>
          <Route path="/">Landing</Route>
          <Route path="/price">Pricing</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
