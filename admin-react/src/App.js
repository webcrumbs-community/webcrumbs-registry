import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  console.log('app');
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
