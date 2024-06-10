"use client";

import { Button } from "@/components/shared/button";
import { MENU } from "@/configs/constants/homepage";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="sticky h-14 top-0 bg-navbar z-[99] flex justify-between items-center lg:justify-center lg:items-stretch gap-4 px-5 lg:pl-20 lg:space-x-3">
      <Link href="/" className="h-fit">
        <Image
          width={500}
          height={300}
          priority
          alt="Logo SD"
          src="/images/logo-sd.svg"
          style={{
            width: "170px",
            height: "auto",
          }}
        />
      </Link>
      <div
        onClick={toggleMenu}
        className={cn("fixed bg-black/50 inset-0 lg:hidden transition-opacity", {
          "opacity-100 visible": isOpen,
          "opacity-0 invisible": !isOpen,
        })}
      >
        <XIcon className="absolute right-5 top-5 text-background cursor-pointer" size={29} />
      </div>
      <div
        className={cn(
          "bg-background lg:bg-[#DBEFE1] fixed left-0 bottom-0 top-0 w-[50vw] lg:w-fit lg:static flex flex-col lg:flex-row lg:items-center p-5 lg:p-0 lg:pr-20 gap-2 lg:gap-0 transition-transform lg:transition-none duration-500 lg:translate-x-0",
          {
            "translate-x-0": isOpen,
            "-translate-x-[50rem]": !isOpen,
          }
        )}
      >
        {MENU.map((menu) => (
          <Link
            onClick={toggleMenu}
            href={menu.path}
            className={cn(
              "px-5 lg:px-3 xl:px-6 lg:h-full flex items-center text-primary py-3 lg:py-0 text-sm xl:text-base whitespace-nowrap font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded-full lg:rounded-none",
              {
                "bg-primary text-primary-foreground": pathname === menu.path,
              }
            )}
            key={menu.path}
          >
            {menu.label}
          </Link>
        ))}
        <Button className="ml-3">Daftar Siswa Baru</Button>
      </div>
      <div className="block lg:hidden cursor-pointer" onClick={toggleMenu}>
        <MenuIcon />
      </div>
    </nav>
  );
}

export default Navbar;
