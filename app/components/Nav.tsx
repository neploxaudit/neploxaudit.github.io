import Element from "./NavElement";

const paths = [
  { path: "portfolio", href: "https://github.com/neploxaudit/publications", blocked: false },
  { path: "blog", href: "blog", blocked: false },
  { path: "contact", href: "#contact-us", blocked: false },
];

const Nav = {
  Element,
  paths,
};

export default Nav;
