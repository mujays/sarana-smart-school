"use client";
import AppPadding from "@/components/shared/app-padding";
import {
  Form,
  FormControl,
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/shared/ui/calendar";
import { Button } from "@/components/shared/ui/button";
import { useState } from "react";
import { axiosConfigKesiswaan } from "@/configs/axios";
import moment from "moment";
import "moment/locale/id";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { Textarea } from "@/components/shared/ui/textarea";
import { TPpdb } from "@/service/types";

const formSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  nik: z.string().min(1, "NIK harus diisi"),
  ibu_kandung: z.string().min(1, "Nama ibu kandung harus diisi"),
  agama: z.string().min(1, "Agama harus diisi"),
  tanggal_lahir: z.date({ required_error: "Tanggal lahir harus diisi" }),
  alamat: z.string().min(1, "Alamat harus diisi"),
  bahasa_sehari: z.string().min(1, "Bahasa harus diisi"),
  kewarganegaraan: z.string().min(1, "Kewarganegaraan harus diisi"),
  lulusan_dari: z.string().min(1, "Asal sekolah harus diisi"),
  alamat_sekolah_asal: z.string().min(1, "Alamat sekolah harus diisi"),
  email: z.string().email("email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  namaWali: z.string().min(1, "Nama wali harus diisi"),
  hubungan: z.string().min(1, "Hubungan harus diisi"),
  no_hp: z.string().min(1, "Nomor telepon harus diisi"),
  pekerjaan: z.string().min(1, "Pekerjaan harus diisi"),
  gaji: z.number(),
});

function FormulirSiswa({ siswa }: { siswa: TPpdb }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: siswa.nama_siswa,
      nik: "",
      ibu_kandung: "",
      agama: "",
      tanggal_lahir: new Date(siswa.tanggal_lahir),
      alamat: siswa.alamat,
      bahasa_sehari: "",
      kewarganegaraan: "",
      lulusan_dari: "",
      alamat_sekolah_asal: "",
      email: "",
      password: "",
      namaWali: "",
      hubungan: "",
      no_hp: "",
      pekerjaan: "",
      gaji: 0,
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      const response = await axiosConfigKesiswaan.put(
        `/form-siswa/public/${siswa.id}`,
        {
          types: "SD",
          siswa: {
            nama: val.nama,
            tanggal_lahir: moment(val.tanggal_lahir).format("YYYY-MM-DD"),
            tanggal_masuk: moment().format("YYYY-MM-DD"),
            agama: val.agama,
            nik: val.nik,
            alamat: val.alamat,
            bahasa_sehari: val.bahasa_sehari,
            kewarganegaraan: val.kewarganegaraan,
            lulusan_dari: val.lulusan_dari,
            ibu_kandung: val.ibu_kandung,
            alamat_sekolah_asal: val.alamat_sekolah_asal,
          },
          wali: {
            email: val.email,
            password: val.password,
            nama: val.namaWali,
            hubungan: val.hubungan,
            no_hp: val.no_hp,
            pekerjaan: val.pekerjaan,
            gaji: val.gaji,
          },
        }
      );
      toast.success("Peserta Didik Baru Berhasil Didaftarkan!");
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
          style={{
            width: "280px",
            height: "auto",
          }}
        />
        <p className="text-center font-semibold text-2xl mb-5">
          Formulir Siswa PPDB {new Date().getFullYear()} -{" "}
          {new Date().getFullYear() + 1}
        </p>
      </div>

      <div className="p-5 border rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Nama */}
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              {/* NIK */}
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="NIK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nama Ibu Kandung */}
              <FormField
                control={form.control}
                name="ibu_kandung"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Ibu Kandung</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Ibu Kandung" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Alamat */}
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis Alamat..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tanggal Lahir */}
            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline">
                          {field.value
                            ? moment(field.value).format("DD/MM/YYYY")
                            : "Pilih Tanggal"}
                          <CalendarIcon className="ml-2" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agama & Kewarganegaraan */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="agama"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Agama</FormLabel>
                    <FormControl>
                      <Input placeholder="Agama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kewarganegaraan"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Kewarganegaraan</FormLabel>
                    <FormControl>
                      <Input placeholder="Kewarganegaraan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*Bahasa */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="bahasa_sehari"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bahasa Sehari-hari</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Bahasa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bahasa Indonesia">
                          Bahasa Indonesia
                        </SelectItem>
                        <SelectItem value="Bahasa Inggris">
                          Bahasa Inggris
                        </SelectItem>
                        <SelectItem value="Bahasa Arab">Bahasa Arab</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lulusan_dari"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Asal Sekolah</FormLabel>
                    <FormControl>
                      <Input placeholder="Asal Sekolah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Alamat */}
            <FormField
              control={form.control}
              name="alamat_sekolah_asal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Sekolah Asal</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis Alamat..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <p className="font-semibold">Data Wali</p>
              <div>
                <div className="flex flex-col md:flex-row gap-2">
                  {/* Nama wali */}
                  <FormField
                    control={form.control}
                    name="namaWali"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nama Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hubungan */}
                  <FormField
                    control={form.control}
                    name="hubungan"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Hubungan dengan siswa</FormLabel>
                        <FormControl>
                          <Input placeholder="Orang tua, dll..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="no_hp"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nomor HP</FormLabel>
                        <FormControl>
                          <Input placeholder="08..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  {/* Pekerjaan */}
                  <FormField
                    control={form.control}
                    name="pekerjaan"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Pekerjaan</FormLabel>
                        <FormControl>
                          <Input placeholder="Pekerjaan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hubungan */}
                  <FormField
                    control={form.control}
                    name="gaji"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Gaji</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Rp."
                            {...field}
                            value={field.value?.toString() || ""}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (inputValue === "") {
                                form.setValue("gaji", 0);
                                return;
                              }
                              if (inputValue.startsWith("0")) {
                                form.setValue("gaji", +inputValue);
                                return;
                              }
                              if (
                                /^[0-9]*$/.test(inputValue) &&
                                !inputValue.startsWith("0")
                              ) {
                                form.setValue("gaji", +inputValue);
                                form.clearErrors("gaji");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="py-3 font-semibold">
                  Buat akun untuk login di aplikasi Wali
                </p>
                <div className="flex gap-2">
                  {/* Pekerjaan */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hubungan */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </AppPadding>
  );
}

export default FormulirSiswa;
