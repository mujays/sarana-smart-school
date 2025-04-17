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
import { Button } from "@/components/shared/ui/button";
import { useMemo, useState } from "react";
import { axiosConfigKesiswaan } from "@/configs/axios";
import moment from "moment";
import "moment/locale/id";
import { toast } from "sonner";
import { TPpdb } from "@/service/types";
import { useRouter } from "next/navigation";
import Dropfile from "@/components/shared/dropfile";
import FileItem from "@/components/shared/file-item";
import { InputPassword } from "@/components/shared/input-password";

const formSchema = z.object({
  url_kia: z.string().min(1, "KIA harus diisi"),
  url_akta: z.string().min(1, "Akte harus diisi"),
  url_kk: z.string().min(1, "Kartu keluarga harus diisi"),
  avatar: z.string().min(1, "Foto ananda harus diisi"),
  ktp_ayah: z.string().min(1, "KTP harus diisi"),
  ktp_ibu: z.string().min(1, "KTP harus diisi"),
  email: z.string().email("email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

function DaftarUlang({ siswa, isPpdb }: { siswa: TPpdb; isPpdb: boolean }) {
  const [loading, setLoading] = useState(false);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileAkte, setFileAkte] = useState<File | null>(null);
  const [fileKia, setFileKia] = useState<File | null>(null);
  const [fileKk, setFileKk] = useState<File | null>(null);
  const [ktpAyah, setKtpAyah] = useState<File | null>(null);
  const [ktpIbu, setKtpIbu] = useState<File | null>(null);

  const dataAyah = useMemo(() => {
    if (siswa) {
      return siswa.data_siswa.keluarga?.filter(
        (kel: any) => kel.hubungan === "Orang Tua"
      )[0];
    }

    return null;
  }, [siswa]);

  const dataIbu = useMemo(() => {
    if (siswa) {
      return siswa.data_siswa.keluarga?.filter(
        (kel: any) => kel.hubungan === "Orang Tua"
      )[1];
    }

    return null;
  }, [siswa]);

  const dataSaudara = useMemo(() => {
    if (siswa) {
      return siswa.data_siswa.keluarga?.filter(
        (kel: any) => kel.hubungan === "Saudara"
      );
    }
    return null;
  }, [siswa]);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url_kia: "",
      url_kk: "",
      url_akta: "",
      avatar: "",
      ktp_ayah: "",
      ktp_ibu: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val: any) => {
    try {
      const endpoinType = isPpdb ? "/form-siswa" : "/form-pindahan";
      const response = await axiosConfigKesiswaan.put(
        `${endpoinType}/public/${siswa.id}`,
        {
          types: "SD",
          siswa: {
            nama: siswa?.data_siswa?.nama || "",
            tanggal_lahir: siswa?.data_siswa?.tanggal_lahir || "",
            tanggal_masuk: moment().format("YYYY-MM-DD"),
            agama: siswa?.data_siswa?.agama || "",
            nik: siswa?.data_siswa?.nik || "",
            alamat: siswa?.data_siswa?.alamat || "",
            bahasa_sehari: siswa?.data_siswa?.bahasa_sehari || "",
            kewarganegaraan: siswa?.data_siswa.kewarganegaraan || "",
            anak_ke: siswa?.data_siswa?.anak_ke || "",
            tinggal_bersama: siswa?.data_siswa?.tinggal_bersama || "",
            jumlah_saudara: siswa?.data_siswa?.jumlah_saudara || "",
            lulusan_dari: siswa?.data_siswa?.lulusan_dari || "-",
            ibu_kandung: siswa?.data_siswa?.ibu_kandung || "",
            alamat_sekolah_asal: siswa?.data_siswa?.alamat_sekolah_asal || "",
            npsn_asal: siswa?.data_siswa?.npsn_asal || "",
            tahun_lulus_asal: siswa?.data_siswa?.tahun_lulus_asal || "",
            suku: siswa?.data_siswa?.suku || "",
            tinggi_badan: siswa?.data_siswa?.tinggi_badan || "",
            berat_badan: siswa?.data_siswa?.berat_badan || "",
            lingkar_kepala: siswa?.data_siswa?.lingkar_kepala || "",
            gol_darah: siswa?.data_siswa?.gol_darah || "",
            url_kia: val.url_kia,
            url_kk: val.url_kk,
            url_akta: val.url_akta,
            avatar: val.avatar,
            tempat_lahir: siswa?.data_siswa?.tempat_lahir,
            jenis_kelamin: siswa?.data_siswa?.jenis_kelamin,
            keluarga: [
              {
                ...dataAyah,
                ktp: val.ktp_ayah,
              },
              {
                ...dataIbu,
                ktp: val.ktp_ibu,
              },
              ...(dataSaudara || []),
            ],
          },
          wali: {
            email: val.email,
            password: val.password,
            nama: siswa?.data_ortu?.nama,
            hubungan: siswa?.data_ortu?.hubungan,
            no_hp: siswa?.data_ortu?.no_hp,
            pekerjaan: siswa?.data_ortu?.pekerjaan,
            gaji: siswa?.data_ortu?.gaji,
          },
        }
      );
      toast.success("Daftar Ulang Berhasil!");
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
          style={{
            width: "280px",
            height: "auto",
          }}
        />
        <p className="text-center font-semibold text-2xl mb-5">Daftar Ulang</p>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Nama */}
            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Siswa
              </p>

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

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">Akte Kelahiran</p>
                {!fileAkte ? (
                  <Dropfile
                    id="akte"
                    description="PNG, JPG dan PDF"
                    type="transparent"
                    onUpload={(file) => {
                      setFileAkte(file);
                    }}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(fileAkte)}
                    onSuccess={(url) => {
                      form.setValue("url_akta", url);
                      form.clearErrors("url_akta");
                    }}
                    file={fileAkte}
                    onDelete={() => {
                      setFileAkte(null);
                      form.setValue("url_akta", "");
                    }}
                  />
                )}
                {form.formState.errors.url_akta && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.url_akta.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">
                  Kartu Identitas Anak (KIA)
                </p>
                {!fileKia ? (
                  <Dropfile
                    id="kia"
                    description="PNG, JPG dan PDF"
                    type="transparent"
                    onUpload={(file) => {
                      setFileKia(file);
                    }}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(fileKia)}
                    onSuccess={(url) => {
                      form.setValue("url_kia", url);
                      form.clearErrors("url_kia");
                    }}
                    file={fileKia}
                    onDelete={() => {
                      setFileKia(null);
                      form.setValue("url_kia", "");
                    }}
                  />
                )}
                {form.formState.errors.url_kia && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.url_kia.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">Kartu Keluarga (KK)</p>
                {!fileKk ? (
                  <Dropfile
                    id="kk"
                    description="PNG, JPG dan PDF"
                    type="transparent"
                    onUpload={(file) => {
                      setFileKk(file);
                    }}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(fileKk)}
                    onSuccess={(url) => {
                      form.setValue("url_kk", url);
                      form.clearErrors("url_kk");
                    }}
                    file={fileKk}
                    onDelete={() => {
                      setFileKk(null);
                      form.setValue("url_kk", "");
                    }}
                  />
                )}
                {form.formState.errors.url_kk && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.url_kk.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Data Orang Tua
              </p>
              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">KTP Ayah</p>
                {!ktpAyah ? (
                  <Dropfile
                    id="ktp_ayah"
                    description="PNG, JPG dan PDF"
                    type="transparent"
                    onUpload={(file) => {
                      setKtpAyah(file);
                    }}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(ktpAyah)}
                    onSuccess={(url) => {
                      form.setValue("ktp_ayah", url);
                      form.clearErrors("ktp_ayah");
                    }}
                    file={ktpAyah}
                    onDelete={() => {
                      setKtpAyah(null);
                      form.setValue("ktp_ayah", "");
                    }}
                  />
                )}
                {form.formState.errors.ktp_ayah && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.ktp_ayah.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 border-t border-gray-300 pt-3">
                <p className="font-medium text-sm">KTP Ibu</p>
                {!ktpIbu ? (
                  <Dropfile
                    id="ktp_ibu"
                    description="PNG, JPG dan PDF"
                    type="transparent"
                    onUpload={(file) => {
                      setKtpIbu(file);
                    }}
                  />
                ) : (
                  <FileItem
                    url={URL.createObjectURL(ktpIbu)}
                    onSuccess={(url) => {
                      form.setValue("ktp_ibu", url);
                      form.clearErrors("ktp_ibu");
                    }}
                    file={ktpIbu}
                    onDelete={() => {
                      setKtpIbu(null);
                      form.setValue("ktp_ibu", "");
                    }}
                  />
                )}
                {form.formState.errors.ktp_ibu && (
                  <p className="text-red text-sm text-red-500">
                    {form?.formState?.errors?.ktp_ibu.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 rounded-lg border border-gray-300 space-y-3">
              <p className="text-center font-semibold text-xl mb-2">
                Buat akun untuk aplikasi Wali
              </p>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
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
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
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

export default DaftarUlang;
