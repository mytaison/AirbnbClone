"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.push("/")}
        alt="brand-logo"
        className="hidden md:block cursor-pointer"
        width={"100"}
        height={"100"}
        src={"/images/logo.png"}
        priority={false}
        placeholder="empty"
      />
      <Image
        onClick={() => router.push("/")}
        alt="brand-logo"
        className="md:hidden cursor-pointer"
        width={"30"}
        height={"30"}
        src={"/images/logo-mob.png"}
        priority={false}
        placeholder="empty"
      />
    </>
  );
};
export default Logo;
