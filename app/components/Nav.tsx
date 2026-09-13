import Element from "./NavElement";

const paths = [
  {
    path: "portfolio",
    href: "https://github.com/neploxaudit/publications",
    blocked: false,
  },
  { path: "blog", href: "blog", blocked: false },
  { path: "contact", href: "#contact-us", blocked: false },
];

const menu = [{ path: "home", href: "", blocked: false }, ...paths];

const Nav = {
  Element,
  paths,
  menu,
};

export default Nav;
