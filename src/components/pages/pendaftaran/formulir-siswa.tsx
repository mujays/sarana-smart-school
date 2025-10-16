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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shared/input";
import { PhoneInput } from "@/components/shared/phone-input";
import {
  requiredNoEmojiString,
  optionalNoEmojiString,
  phoneInputString,
} from "@/lib/zod-validators";
import { formatPhoneFromPhoneInput } from "@/lib/phone-utils";
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
import { RadioGroup, RadioGroupItem } from "@/components/shared/ui/radio-group";
import { useRouter } from "next/navigation";
import FileItem from "@/components/shared/file-item";
import Dropfile from "@/components/shared/dropfile";

const formSchema = z.object({
  nama: requiredNoEmojiString(1, "Nama harus diisi"),
  nik: requiredNoEmojiString(16, "NIK minimal 16 digit"),
  ibu_kandung: requiredNoEmojiString(1, "Nama ibu kandung harus diisi"),
  agama: z.string().min(1, "Agama harus diisi"),
  tanggal_lahir: z.date({ required_error: "Tanggal lahir harus diisi" }),
  alamat: requiredNoEmojiString(1, "Alamat harus diisi"),
  jumlah_saudara: z.number(),
  telp_rumah: optionalNoEmojiString(),
  anak_ke: z.number(),
  tinggal_bersama: z.string().min(1, "Tinggal bersama harus diisi"),
  // rt: z.string().min(1, "RT harus diisi"),
  // rw: z.string().min(1, "RW harus diisi"),
  // kelurahan: z.string().min(1, "Kelurahan harus diisi"),
  // kecamatan: z.string().min(1, "Kecamatan harus diisi"),
  // kota: z.string().min(1, "Kota harus diisi"),
  // provinsi: z.string().min(1, "Provinsi harus diisi"),
  tempat_lahir: requiredNoEmojiString(1, "Tampat lahir harus diisi"),
  jenis_kelamin: z.string().min(1, "Jenis kelamin harus diisi"),
  bahasa_sehari: requiredNoEmojiString(1, "Bahasa harus diisi"),
  kewarganegaraan: z.string().min(1, "Kewarganegaraan harus diisi"),
  suku: requiredNoEmojiString(1, "Suku harus diisi"),
  tinggi_badan: z.string().min(1, "Tinggi badan harus diisi"),
  berat_badan: z.string().min(1, "Berat badan harus diisi"),
  lingkar_kepala: z.string().min(1, "Lingkar kepala harus diisi"),
  lulusan_dari: optionalNoEmojiString(),
  tahun_lulus_asal: z.string().optional(),
  npsn_asal: optionalNoEmojiString(),
  gol_darah: z.string().min(1, "Golongan darah harus diisi"),
  alamat_sekolah_asal: optionalNoEmojiString(),
  namaWali: requiredNoEmojiString(1, "Nama wali harus diisi"),
  hubungan: z.string().min(1, "Hubungan harus diisi"),
  no_hp: phoneInputString("Nomor telepon harus diisi"),
  pekerjaan: requiredNoEmojiString(1, "Pekerjaan harus diisi"),
  // url_kia: z.string().min(1, "KIA harus diisi"),
  // url_akta: z.string().min(1, "Akte harus diisi"),
  // url_kk: z.string().min(1, "Kartu keluarga harus diisi"),
  avatar: z.string().min(1, "Foto ananda harus diisi"),
  gaji: z.number(),
  // Orang Tua
  nama_ayah: requiredNoEmojiString(1, "Nama harus diisi"),
  pendidikan_ayah: z.string().min(1, "Pendidikan harus diisi"),
  no_hp_ayah: phoneInputString("Nomor telepon harus diisi"),
  gaji_ayah: z.number(),
  pekerjaan_ayah: requiredNoEmojiString(1, "Pekerjaan harus diisi"),
  tanggal_lahir_ayah: z.date({ required_error: "Tanggal lahir harus diisi" }),
  email_ayah: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid")
    .refine(
      (val) =>
        !/[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]|[\uD83C][\uDF00-\uDFFF]|[\uD83D][\uDC00-\uDE4F]|[\uD83D][\uDE80-\uDEFF]|[\uD83E][\uDD00-\uDDFF]/.test(
          val
        ),
      {
        message: "Email tidak boleh mengandung emoticon atau emoji",
      }
    ),
  agama_ayah: z.string().min(1, "Agama harus diisi"),
  // ktp_ayah: z.string().min(1, "KTP harus diisi"),
  nik_ayah: requiredNoEmojiString(16, "NIK minimal 16 digit"),
  suku_ayah: requiredNoEmojiString(1, "Suku harus diisi"),
  alamat_ayah: requiredNoEmojiString(1, "Alamat harus diisi"),

  nama_ibu: requiredNoEmojiString(1, "Nama harus diisi"),
  pendidikan_ibu: z.string().min(1, "Pendidikan harus diisi"),
  no_hp_ibu: phoneInputString("Nomor telepon harus diisi"),
  tanggal_lahir_ibu: z.date({ required_error: "Tanggal lahir harus diisi" }),
  gaji_ibu: z.number(),
  pekerjaan_ibu: requiredNoEmojiString(1, "Pekerjaan harus diisi"),
  email_ibu: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid")
    .refine(
      (val) =>
        !/[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]|[\uD83C][\uDF00-\uDFFF]|[\uD83D][\uDC00-\uDE4F]|[\uD83D][\uDE80-\uDEFF]|[\uD83E][\uDD00-\uDDFF]/.test(
          val
        ),
      {
        message: "Email tidak boleh mengandung emoticon atau emoji",
      }
    ),
  agama_ibu: z.string().min(1, "Agama harus diisi"),
  // ktp_ibu: z.string().min(1, "KTP harus diisi"),
  nik_ibu: requiredNoEmojiString(16, "NIK minimal 16 digit"),
  suku_ibu: requiredNoEmojiString(1, "Suku harus diisi"),
  alamat_ibu: requiredNoEmojiString(1, "Alamat harus diisi"),

  saudara: z
    .array(
      z.object({
        nama: requiredNoEmojiString(1, "Nama harus diisi"),
        jenis_kelamin: z.string().min(1, "Jenis kelamin harus diisi"),
        pendidikan: z.string().min(1, "Pendidikan harus diisi"),
        tanggal_lahir: z.date({ required_error: "Tanggal lahir harus diisi" }),
      })
    )
    .optional(),
});

function FormulirSiswa({
  siswa,
  formId,
  isPpdb,
}: {
  siswa: TPpdb;
  formId?: number;
  isPpdb: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);

  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: siswa.nama_siswa,
      nik: isDev
        ? (Math.floor(Math.random() * 1000) + 1).toString() + "00000"
        : "",
      jenis_kelamin: isDev ? "Laki-laki" : "",
      ibu_kandung: isDev ? "IBU_KANDUNG" : "",
      agama: isDev ? "AGAMA" : "",
      tempat_lahir: isDev ? "TEMPAT_LAHIR" : "",
      tanggal_lahir: new Date(siswa.tanggal_lahir),
      tinggal_bersama: isDev ? "Orang Tua" : "",
      anak_ke: 0,
      jumlah_saudara: 0,
      alamat: siswa.alamat,
      bahasa_sehari: isDev ? "Bahasa Indonesia" : "",
      kewarganegaraan: isDev ? "INDONESIA" : "",
      lulusan_dari: isDev ? "SDN CONTOH" : "",
      npsn_asal: isDev ? "12345678" : "",
      tahun_lulus_asal: isDev ? "2020" : "",
      alamat_sekolah_asal: isDev ? "ALAMAT_SEKOLAH_ASAL" : "",
      namaWali: isDev ? "NAMA_WALI" : "",
      hubungan: isDev ? "HUBUNGAN" : "",
      no_hp: siswa?.no_hp_orang_tua || "",
      pekerjaan: isDev ? "PEKERJAAN" : "",
      gaji: 0,
      suku: isDev ? "SUKU" : "",
      tinggi_badan: isDev ? "150" : "",
      berat_badan: isDev ? "40" : "",
      lingkar_kepala: isDev ? "50" : "",
      gol_darah: isDev ? "A" : "",
      // url_kia: "",
      // url_kk: "",
      // url_akta: "",
      avatar: "",
      telp_rumah: isDev ? "0211234567" : "",

      // orang tua
      nama_ayah: isDev ? "NAMA_AYAH" : "",
      pendidikan_ayah: isDev ? "S1" : "",
      no_hp_ayah: isDev ? "1234567890" : "",
      tanggal_lahir_ayah: new Date(),
      gaji_ayah: 0,
      pekerjaan_ayah: isDev ? "PEKERJAAN_AYAH" : "",
      agama_ayah: isDev ? "AGAMA_AYAH" : "",
      suku_ayah: isDev ? "SUKU_AYAH" : "",
      email_ayah: isDev ? "ayah@example.com" : "",
      alamat_ayah: isDev ? "ALAMAT_AYAH" : "",
      nik_ayah: isDev
        ? (Math.floor(Math.random() * 1000) + 1).toString() + "11111"
        : "",
      // ktp_ayah: "",

      nama_ibu: isDev ? "NAMA_IBU" : "",
      pendidikan_ibu: isDev ? "SMA" : "",
      no_hp_ibu: isDev ? "1234567891" : "",
      tanggal_lahir_ibu: new Date(siswa.tanggal_lahir),
      gaji_ibu: 0,
      pekerjaan_ibu: isDev ? "PEKERJAAN_IBU" : "",
      agama_ibu: isDev ? "AGAMA_IBU" : "",
      suku_ibu: isDev ? "SUKU_IBU" : "",
      email_ibu: isDev ? "ibu@example.com" : "",
      alamat_ibu: isDev ? "ALAMAT_IBU" : "",
      nik_ibu: isDev
        ? (Math.floor(Math.random() * 1000) + 1).toString() + "22222"
        : "",
      // ktp_ibu: "",

      saudara: [] as any,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "saudara",
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      const endpoinType = isPpdb ? "/form-siswa" : "/form-pindahan";
      const { is_past_to_test, is_lunas, ...payload } = siswa;
      const response = await axiosConfigKesiswaan.put(
        `${endpoinType}/public/${formId}`,
        {
          ...payload,
          nama_siswa: val.nama,
          status: "TEST",
          data_siswa: {
            nama: val.nama,
            tanggal_lahir: moment(val.tanggal_lahir).format("YYYY-MM-DD"),
            tanggal_masuk: moment().format("YYYY-MM-DD"),
            agama: val.agama,
            nik: val.nik,
            alamat: val.alamat,
            bahasa_sehari: val.bahasa_sehari,
            kewarganegaraan: val.kewarganegaraan,
            anak_ke: val.anak_ke,
            tinggal_bersama: val.tinggal_bersama,
            jumlah_saudara: val.jumlah_saudara,
            lulusan_dari: val?.lulusan_dari || "-",
            ibu_kandung: val.ibu_kandung,
            alamat_sekolah_asal: val.alamat_sekolah_asal,
            npsn_asal: val.npsn_asal,
            tahun_lulus_asal: val.tahun_lulus_asal,
            suku: val.suku,
            tinggi_badan: val.tinggi_badan,
            berat_badan: val.berat_badan,
            lingkar_kepala: val.lingkar_kepala,
            gol_darah: val.gol_darah,
            // url_kia: val.url_kia,
            // url_kk: val.url_kk,
            // url_akta: val.url_akta,
            avatar: val.avatar,
            tempat_lahir: val.tempat_lahir,
            jenis_kelamin: val.jenis_kelamin,
            keluarga: [
              {
                nama: val.nama_ayah,
                hubungan: "Ayah",
                jenis_kelamin: "Laki-laki",
                gaji: val.gaji_ayah,
                pendidikan: val.pendidikan_ayah,
                pekerjaan: val.pekerjaan_ayah,
                no_hp: formatPhoneFromPhoneInput(val.no_hp_ayah),
                agama: val.agama_ayah,
                suku: val.suku_ayah,
                alamat: val.alamat_ayah,
                nik: val.nik_ayah,
                ktp: "",
                email: val.email_ayah,
                tanggal_lahir: moment(val.tanggal_lahir_ayah).format(
                  "YYYY-MM-DD"
                ),
              },
              {
                nama: val.nama_ibu,
                hubungan: "Ibu",
                jenis_kelamin: "Perempuan",
                gaji: val.gaji_ibu,
                pendidikan: val.pendidikan_ibu,
                pekerjaan: val.pekerjaan_ibu,
                no_hp: formatPhoneFromPhoneInput(val.no_hp_ibu),
                agama: val.agama_ibu,
                suku: val.suku_ibu,
                alamat: val.alamat_ibu,
                nik: val.nik_ibu,
                ktp: "",
                email: val.email_ibu,
                tanggal_lahir: moment(val.tanggal_lahir_ibu).format(
                  "YYYY-MM-DD"
                ),
              },
              ...(val?.saudara
                ? val?.saudara?.map((sdr: any) => ({
                    nama: sdr?.nama,
                    hubungan: "Saudara",
                    jenis_kelamin: sdr?.jenis_kelamin,
                    gaji: 0,
                    pendidikan: sdr?.pendidikan,
                    pekerjaan: "-",
                    no_hp: "-",
                    agama: "-",
                    suku: "-",
                    alamat: "-",
                    nik: "-",
                    ktp: "-",
                    email: "-",
                    tanggal_lahir: moment(sdr?.tanggal_lahir).format(
                      "YYYY-MM-DD"
                    ),
                  }))
                : []),
            ],
          },
          data_ortu: {
            nama: val.namaWali,
            hubungan: val.hubungan,
            no_hp: formatPhoneFromPhoneInput(val.no_hp),
            pekerjaan: val.pekerjaan,
            gaji: val.gaji,
          },
        }
      );
      toast.success("Formulir Peserta Didik Baru Berhasil Dilengkapi!");
      form.reset();
      router.push("/");
      return response.data;
    } catch (error: any) {
      if (error?.response?.data) {
        const message = error.response.data as any;
        toast.error(message.message);
        return;
      }
      toast.error(error.message);
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
          Formulir {isPpdb ? "Siswa PPDB" : "Pindahan"}{" "}
          {new Date().getFullYear()} - {new Date().getFullYear() + 1}
        </p>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Nama */}
            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Calon Siswa
              </p>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col lg:flex-row gap-2">
                {/* NIK */}
                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>NIK Ananda</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NIK"
                          {...field}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(onlyNums);
                          }}
                        />
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
                        <SelectItem value="Bahasa Mandarin">
                          Bahasa Mandarin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Alamat */}
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormDescription className="!mt-0">
                      Isikan alamat lengkap dari RT, RW, Desa, Kecamatan, Kota
                      sampai Provinsi.
                    </FormDescription>
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

              {/* Tempat Lahir */}
              <FormField
                control={form.control}
                name="tempat_lahir"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Tempat Lahir" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jenis_kelamin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
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

              <FormField
                control={form.control}
                name="telp_rumah"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telepon Rumah</FormLabel>
                    <FormControl>
                      <Input placeholder="Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="suku"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Suku</FormLabel>
                    <FormControl>
                      <Input placeholder="Suku" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="tinggi_badan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tinggi Badan (CM)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="CM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="berat_badan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Berat Badan (Kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lingkar_kepala"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Lingkar Kepala (CM)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="CM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gol_darah"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Golongan Darah</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        {["A", "B", "O", "AB"].map((val) => (
                          <FormItem
                            key={val}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={val} />
                            </FormControl>
                            <FormLabel className="font-normal">{val}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tinggal_bersama"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tinggal Bersama</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Tinggal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Orang Tua">Orang Tua</SelectItem>
                        <SelectItem value="Anggota Keluarga Lain">
                          Anggota Keluarga Lain
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="anak_ke"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Anak Ke</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="0"
                        {...field}
                        value={field.value?.toString() || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "") {
                            form.setValue("anak_ke", 0);
                            return;
                          }
                          if (inputValue.startsWith("0")) {
                            form.setValue("anak_ke", +inputValue);
                            return;
                          }
                          if (
                            /^[0-9]*$/.test(inputValue) &&
                            !inputValue.startsWith("0")
                          ) {
                            form.setValue("anak_ke", +inputValue);
                            form.clearErrors("anak_ke");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jumlah_saudara"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Dari Berapa Saudara</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="0"
                        {...field}
                        value={field.value?.toString() || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "") {
                            form.setValue("jumlah_saudara", 0);
                            return;
                          }
                          if (inputValue.startsWith("0")) {
                            form.setValue("jumlah_saudara", +inputValue);
                            return;
                          }
                          if (
                            /^[0-9]*$/.test(inputValue) &&
                            !inputValue.startsWith("0")
                          ) {
                            form.setValue("jumlah_saudara", +inputValue);
                            form.clearErrors("jumlah_saudara");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">Foto Ananda</p>
                {!fileAvatar ? (
                  <Dropfile
                    id="avatar"
                    description="PNG, JPG dan JPEG"
                    type="transparent"
                    onUpload={(file) => {
                      setFileAvatar(file);
                    }}
                    accept=".jpg,.jpeg,.png"
                    mimeType={["image/jpeg", "image/png", "image/jpeg"]}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(fileAvatar)}
                    onSuccess={(url) => {
                      form.setValue("avatar", url);
                      form.clearErrors("avatar");
                    }}
                    file={fileAvatar}
                    onDelete={() => {
                      setFileAvatar(null);
                      form.setValue("avatar", "");
                    }}
                  />
                )}
                {form.formState.errors.avatar && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.avatar.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <div>
                <p className="text-center font-semibold text-xl mb-2">
                  Asal Sekolah
                </p>
                <p className="text-center text-sm text-gray-400 mb-2">
                  Jika siswa berasal dari pindahan atau Pendidikan Anak Usia
                  Dini (PAUD)
                </p>
              </div>

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
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="npsn_asal"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>NPSN (Nomor Pokok Sekolah Nasional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NPSN"
                          {...field}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(onlyNums);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tahun_lulus_asal"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tahun Lulus Sekolah Asal</FormLabel>
                      <FormControl>
                        <Input placeholder="Tahun Lulus" {...field} />
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
            </div>

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Wali
              </p>

              <div className="flex flex-col md:flex-row gap-2">
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
              </div>
              <FormField
                control={form.control}
                name="no_hp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="gaji"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Penghasilan Perbulan</FormLabel>
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

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Orang Tua (Ayah)
              </p>

              <FormField
                control={form.control}
                name="nama_ayah"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Ayah</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="pekerjaan_ayah"
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
                <FormField
                  control={form.control}
                  name="gaji_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Penghasilan Perbulan</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Rp."
                          {...field}
                          value={field.value?.toString() || ""}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === "") {
                              form.setValue("gaji_ayah", 0);
                              return;
                            }
                            if (inputValue.startsWith("0")) {
                              form.setValue("gaji_ayah", +inputValue);
                              return;
                            }
                            if (
                              /^[0-9]*$/.test(inputValue) &&
                              !inputValue.startsWith("0")
                            ) {
                              form.setValue("gaji_ayah", +inputValue);
                              form.clearErrors("gaji_ayah");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tanggal_lahir_ayah"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
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
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="pendidikan_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Pendidikan</FormLabel>
                      <FormControl>
                        <Input placeholder="Pendidikan..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="no_hp_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="agama_ayah"
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
                  name="suku_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Suku</FormLabel>
                      <FormControl>
                        <Input placeholder="Suku" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="email_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nik_ayah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NIK"
                          {...field}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(onlyNums);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alamat_ayah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormDescription className="!mt-0">
                      Isikan alamat lengkap dari RT, RW, Desa, Kecamatan, Kota
                      sampai Provinsi.
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="Tulis Alamat..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Orang Tua (Ibu)
              </p>

              <FormField
                control={form.control}
                name="nama_ibu"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nama Ibu</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="pekerjaan_ibu"
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
                <FormField
                  control={form.control}
                  name="gaji_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Penghasilan Perbulan</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Rp."
                          {...field}
                          value={field.value?.toString() || ""}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === "") {
                              form.setValue("gaji_ibu", 0);
                              return;
                            }
                            if (inputValue.startsWith("0")) {
                              form.setValue("gaji_ibu", +inputValue);
                              return;
                            }
                            if (
                              /^[0-9]*$/.test(inputValue) &&
                              !inputValue.startsWith("0")
                            ) {
                              form.setValue("gaji_ibu", +inputValue);
                              form.clearErrors("gaji_ibu");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tanggal_lahir_ibu"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
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
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="pendidikan_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Pendidikan</FormLabel>
                      <FormControl>
                        <Input placeholder="Pendidikan..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="no_hp_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="agama_ibu"
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
                  name="suku_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Suku</FormLabel>
                      <FormControl>
                        <Input placeholder="Suku" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="email_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nik_ibu"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NIK"
                          {...field}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(onlyNums);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alamat_ibu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormDescription className="!mt-0">
                      Isikan alamat lengkap dari RT, RW, Desa, Kecamatan, Kota
                      sampai Provinsi.
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="Tulis Alamat..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 border p-4 rounded-lg border-gray-300">
              <h3 className="text-lg font-semibold text-center">
                Saudara Kandung
              </h3>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 border border-gray-300 p-3 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name={`saudara.${index}.nama`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`saudara.${index}.jenis_kelamin`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`saudara.${index}.tanggal_lahir`}
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

                  <FormField
                    control={form.control}
                    name={`saudara.${index}.pendidikan`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pendidikan</FormLabel>
                        <FormControl>
                          <Input placeholder="Pendidikan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Hapus
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="link"
                className="w-full border border-dashed"
                onClick={() =>
                  append({ nama: "", jenis_kelamin: "", pendidikan: "" })
                }
              >
                Tambah Saudara Kandung
              </Button>
            </div>

            <div className="flex justify-end pt-3">
              <Button
                type="submit"
                className="w-full"
                variant="secondary"
                disabled={loading}
              >
                Kirim Formulir
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppPadding>
  );
}

export default FormulirSiswa;
