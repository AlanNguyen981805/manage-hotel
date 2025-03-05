"use client";

import { Logo } from "@/assets/svgs/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [header, setHeader] = useState(true);

  useEffect(() => {
    if (!window) return;
    window.addEventListener("scroll", () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(true)
    );
  });

  const navLinks = ["Home", "Rooms", "Restaurant", "Spa", "Contact"];

  return (
    <header
      className={` w-full transition-all duration-300  bg-transparent py-8`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0">
        <Link href="/">
          <Logo />
        </Link>

        <nav
          className={`${header ? "text-primary" : "text-white"}
        flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}
        >
          {navLinks.map((link) => (
            <Link href="/" className="transition hover:text-accent" key={link}>
              {link}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
