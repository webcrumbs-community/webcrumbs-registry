import { config } from "../webcrumbs";


const mount = (el) => {
  let output = JSON.stringify(config);
  el.innerHTML = output;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#manifest");

  if (el) {
    mount(el);
  }
}

export { mount };
