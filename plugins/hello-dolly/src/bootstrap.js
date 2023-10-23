import { faker } from "@faker-js/faker";

const name = faker.commerce.productName();
let sayHello = `<div>Hello, ${name}!</div>`;

document.querySelector('#dev').innerHTML = sayHello;
