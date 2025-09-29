import Element from "./NavElement";

const paths = [
  { path: "portfolio", href: "portfolio", blocked: true },
  { path: "blog", href: "blog", blocked: false },
  { path: "contact", href: "#contact-us", blocked: false },
];

const Nav = {
  Element,
  paths,
};

export default Nav;
