
const mount = (el) => {
  let output = `<div>Hello Dolly is working fine</div>`;

  el.innerHTML = output;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#pulse");

  if (el) {
    mount(el);
  }
}

export { mount };
