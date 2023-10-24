import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const mount = (el) => {
  const root = createRoot(el);
  root.render(<App />);
};

const el = document.querySelector("#root");

if (el) {
  mount(el);
}

export { mount };
