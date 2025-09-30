"use client";
import AppPadding from "@/components/shared/app-padding";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shared/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/shared/ui/calendar";
import { Button } from "@/components/shared/ui/button";
import { Textarea } from "@/components/shared/ui/textarea";
import { useState } from "react";
import { axiosConfigKesiswaan } from "@/configs/axios";
import moment from "moment";
import "moment/locale/id";
import { toast } from "sonner";

function Pendaftaran() {
  const [loading, setLoading] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  const formValidation = z.object({
    nama_siswa: z.string().min(1, "nama siswa harus diisi"),
    no_hp_orang_tua: z.string().min(1, "nomor telepon harus diisi"),
    email_orang_tua: z
      .string()
      .min(1, "email harus diisi")
      .email("email tidak valid"),
    tanggal_lahir: z
      .date()
      .nullable()
      .refine((val) => val, "tanggal lahir harus di isi"),
    alamat: z.string().min(1, "alamat harus diisi"),
    sekolah_asal: z.string().min(1, "sekolah asal harus diisi"),
    nama_orang_tua: z.string().min(1, "nama wali murid harus diisi"),
    know_from: z.string().min(1, "Info harus diisi"),
    reason: z.string().min(1, "alasan harus diisi"),
  });

  const form = useForm({
    resolver: zodResolver(formValidation),
    defaultValues: {
      nama_siswa: isDev ? "TEST_DEV" : "",
      no_hp_orang_tua: isDev ? "080000000" : "",
      email_orang_tua: isDev ? "email@example.com" : "",
      tanggal_lahir: new Date(),
      alamat: isDev ? "ALAMAT" : "",
      sekolah_asal: isDev ? "SEKOLAH_ASAL" : "",
      nama_orang_tua: isDev ? "WALI_NAME" : "",
      know_from: isDev ? "INFO" : "",
      reason: isDev ? "REASON" : "",
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      const response = await axiosConfigKesiswaan.post("/form-siswa", {
        ...val,
        types: "SD",
        status: "PENDING_PAYMENT",
        tanggal_lahir: moment(val.tanggal_lahir).format("YYYY-MM-DD"),
      });
      toast.success("Pendaftaran Peserta Didik Baru Berhasil!");
      form.reset();
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppPadding className="py-10">
      <div className="flex flex-col items-center gap-3">
        <Image
          width={500}
          height={300}
          priority
          alt="Logo SD"
          src="/images/logo-sd.svg"
          className="w-[280px] h-auto"
        />
        <p className="text-center font-semibold text-2xl mb-5">
          Buku Tamu PPDB {new Date().getFullYear() + 1} -{" "}
          {new Date().getFullYear() + 2}
        </p>
      </div>

      <div className="p-5 border border-gray-300 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex w-full gap-2 flex-col md:flex-row">
              <FormField
                name="nama_siswa"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Siswa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Siswa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggal_lahir"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col justify-end">
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("LL")
                            ) : (
                              <span>Pilih Tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1970}
                          toYear={new Date().getFullYear()}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2 flex-col md:flex-row">
              <FormField
                name="nama_orang_tua"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Wali</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Wali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="no_hp_orang_tua"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nomor Telepon Wali</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="08..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="email_orang_tua"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email Wali</FormLabel>
                  <FormDescription className="!mt-0">
                    Pastikan email anda aktif
                  </FormDescription>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="alamat"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Alamat</FormLabel>
                  <FormDescription className="!mt-0">
                    Isikan alamat lengkap dari RT, RW, Desa, Kecamatan, Kota
                    sampai Provinsi.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Tulis alamat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full gap-2 flex-col md:flex-row">
              <FormField
                name="sekolah_asal"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Sekolah Asal Calon Peserta Didik</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TK, RA, Home Schooling, dll"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="know_from"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Mengetahui Info Dari</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sosial Media, Teman, dll"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="reason"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mengapa tertarik dengan Smart School</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis alasan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
              Daftar
            </Button>
          </form>
        </Form>
      </div>
    </AppPadding>
  );
}

export default Pendaftaran;
