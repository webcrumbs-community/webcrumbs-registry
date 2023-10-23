import { faker } from "@faker-js/faker";

const mount = (el) => {
  const name = faker.commerce.productName();
  let output = `<div>Hello, ${name}!</div>`;

  el.innerHTML = output;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#canvas");

  if (el) {
    mount(el);
  }
}

export { mount };
