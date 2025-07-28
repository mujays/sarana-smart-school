"use client";

import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/ui/button";
import { useState } from "react";

function Penjemputan() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border space-y-3 border-gray-200 rounded-lg p-4 min-w-[90%] lg:min-w-[70%]">
        <div>
          <p className="text-center font-semibold">Penjemputan</p>
          <p className="text-center text-gray-500 text-sm">
            Masukkan Kode atau Scan Barkode Penjemputan
          </p>
        </div>
        <Input
          placeholder="Ketik kode.."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className="w-full" disabled={!inputValue}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Penjemputan;
