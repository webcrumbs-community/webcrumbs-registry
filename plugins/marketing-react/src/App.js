import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      out of the box
      <BrowserRouter>
        <Routes>
          <Route path="/">Landing page</Route>
          <Route path="/price">Pricing</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
