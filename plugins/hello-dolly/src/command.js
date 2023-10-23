const mount = (el) => {
  let output = `<div>What's your name? <input type="text"/></div>`;

  el.innerHTML = output;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#command");

  if (el) {
    mount(el);
  }
}

export { mount };
