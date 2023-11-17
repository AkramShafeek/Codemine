
import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import navItems from "./navItems.json";
import NavItem from "./NavItem";

function NavList() {
  return (
    <ul className="my-2 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => (<li key={item.name}><NavItem navItem={item} /></li>))}
    </ul>
  );
}

export function NavbarSimple() {

  return (
    <Navbar className="w-full px-6 py-3 max-w-none mb-5">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          CodeKraft
        </Typography>
        <div className="flex flex-row lg:block">
          <NavList />
        </div>
      </div>
    </Navbar>
  );
}