import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const mount = (el) => {
  console.log("mounting");
  const root = createRoot(el);
  root.render(<App />);
};

const el = document.querySelector("#dev-admin");
console.log(el);

if (el) {
  mount(el);
}

export { mount };
