"use client";

import { Button } from "@/components/shared/button";
import { MENU } from "@/configs/constants/homepage";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AppPadding from "./app-padding";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="h-14 bg-background sticky top-0 z-50 border-b border-gray-300">
      <AppPadding className="flex justify-between h-full items-center">
        <Link href="/">
          <Image
            width={500}
            height={300}
            priority
            alt="Logo SD"
            src="/images/logo-sd.svg"
            className="w-[170px] h-auto"
          />
        </Link>
        <div
          onClick={toggleMenu}
          className={cn(
            "fixed bg-black/50 inset-0 lg:hidden transition-opacity",
            {
              "opacity-100 visible": isOpen,
              "opacity-0 invisible": !isOpen,
            }
          )}
        >
          <XIcon
            className="absolute right-5 top-5 text-background cursor-pointer"
            size={29}
          />
        </div>
        <div
          className={cn(
            "fixed transition-transform lg:transition-none duration-500 lg:static lg:items-center flex flex-col lg:flex-row bg-background p-10 lg:p-0 lg:justify-end gap-6 lg:gap-8 left-0 bottom-0 top-0 w-[50vw] lg:translate-x-0",
            {
              "translate-x-0": isOpen,
              "-translate-x-[50rem]": !isOpen,
            }
          )}
        >
          {MENU.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              onClick={toggleMenu}
              className={cn(
                "whitespace-nowrap lg:text-base text-primary drop-shadow transition-colors hover:text-secondary",
                { "text-secondary": pathname === m.path }
              )}
            >
              {m.label}
            </Link>
          ))}
          <Button asChild variant="default">
            <Link target="_blank" href="https://wali.smart.sch.id/">
              Login Sebagai Wali
            </Link>
          </Button>
        </div>
        <div className="block lg:hidden cursor-pointer" onClick={toggleMenu}>
          <MenuIcon />
        </div>
      </AppPadding>
    </nav>
  );
}

export default Navbar;
