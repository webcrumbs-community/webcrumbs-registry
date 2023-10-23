import { faker } from "@faker-js/faker";

const mount = (el) => {
  const name = faker.commerce.productName();
  let sayHello = `<div>Hello, ${name}!</div>`;

  el.innerHTML = sayHello;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#pulse");

  if (el) {
    mount(el);
  }
}

export { mount };
