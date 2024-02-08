"use client";

import Container from "../shared/Container";
import Logo from "../navbar/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  user: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  // console.log({ user });
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            <Search></Search>
            <UserMenu currentUser={user}></UserMenu>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
