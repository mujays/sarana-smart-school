"use client";

import { Button } from "@/components/shared/button";
import { MENU } from "@/configs/constants/homepage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bg-background top-0 z-10 flex justify-between pl-5 md:pl-20 space-x-3">
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
      <div className="bg-[#DBEFE1] flex items-center pr-5 md:pr-20">
        {MENU.map((menu) => (
          <div
            className={cn(
              "px-3 xl:px-6 h-full flex items-center text-primary text-sm xl:text-base whitespace-nowrap font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
              {
                "bg-primary text-primary-foreground": pathname === menu.path,
              }
            )}
            key={menu.path}
          >
            {menu.label}
          </div>
        ))}
        <Button>Daftar Siswa Baru</Button>
      </div>
    </nav>
  );
}

export default Navbar;
