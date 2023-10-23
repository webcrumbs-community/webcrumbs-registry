import { mount as mountCanvas } from "helloDolly/Canvas";

const mountAdmin = (el) => {
  let plugins_list = ["helloDolly"];
  console.log('Admin!');
  mountCanvas(el);
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev");

  if (el) {
    mountAdmin(el);
  }
}

export { mountAdmin };
