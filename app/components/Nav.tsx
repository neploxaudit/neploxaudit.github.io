import Element from "./NavElement";

const paths = [
  { path: "audits", blocked: true },
  { path: "ctf", blocked: false },
  { path: "research", blocked: true },
];

const Nav = {
  Element,
  paths,
};

export default Nav;
