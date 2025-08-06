"use client";

import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/ui/button";
import { axiosConfigKesiswaan } from "@/configs/axios";
import { ScanBarcodeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function Penjemputan() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataConfirm, setDataConfirm] = useState<any>(null);

  const inputRef: any = useRef();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axiosConfigKesiswaan.post("/public/pickup", {
        code: inputValue,
      });

      setDataConfirm(res?.data?.data);
    } catch (error) {
      toast.error("Kode tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitConfirm = async () => {
    try {
      setLoading(true);
      await axiosConfigKesiswaan.put(`/public/pickup/${dataConfirm?.id}`, {
        phone: dataConfirm?.phone,
        name: dataConfirm?.name,
        note: dataConfirm?.note,
      });

      toast.success("Anda sudah berhasil konfirmasi jemputan");
      setDataConfirm(null);
      setInputValue("");
    } catch (error) {
      toast.error("Kode tidak valid");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 300);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border space-y-3 border-gray-200 rounded-lg p-4 min-w-[90%] lg:min-w-[70%]">
        {!dataConfirm && (
          <>
            <div>
              <p className="text-center font-semibold">Penjemputan</p>
              <p className="text-center text-gray-500 text-sm">
                Masukkan Kode atau Scan Barkode Penjemputan
              </p>
              <div className="flex justify-center pt-3">
                <ScanBarcodeIcon className="w-10 h-10 text-gray-600" />
              </div>
              <input
                ref={inputRef as any}
                value={inputValue}
                type="text"
                autoFocus
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className="opacity-0 cursor-default"
                onBlur={() => inputRef.current?.focus()}
              />
            </div>
            <Input
              value={inputValue}
              placeholder="Ketik kode.."
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="w-full"
              disabled={!inputValue || loading}
              onClick={onSubmit}
            >
              {loading ? "Loading.." : "Submit"}
            </Button>
          </>
        )}
        {dataConfirm && (
          <>
            <div>
              <p className="text-center font-semibold">Data Siswa</p>
              <p className="text-center text-gray-500 text-sm">
                Berikut detail siswa yang anda jemput
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold">Nama</p>
                <p>{dataConfirm?.siswa?.nama}</p>
              </div>
              <div>
                <p className="font-semibold">Kelas</p>
                <p>{dataConfirm?.siswa?.kelas[0]?.nama}</p>
              </div>
              <div>
                <p className="font-semibold">Nama Penjemput</p>
                <p>{dataConfirm?.name}</p>
              </div>
              <div>
                <p className="font-semibold">Catatan</p>
                <p>{dataConfirm?.note}</p>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={loading}
              onClick={onSubmitConfirm}
            >
              {loading ? "Loading.." : "Konfirmasi"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Penjemputan;
