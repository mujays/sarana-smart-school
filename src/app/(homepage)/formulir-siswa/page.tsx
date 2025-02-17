import FormulirSiswa from "@/components/pages/pendaftaran/formulir-siswa";
import { axiosConfigKesiswaan } from "@/configs/axios";
import { TPpdb } from "@/service/types";
import { notFound } from "next/navigation";

export const metadata = {
  description: "Formulir Siswa",
  title: "Formulir Siswa",
};

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const token = searchParams?.token;
    const res = await axiosConfigKesiswaan.get("/form-siswa/public/" + token);
    const siswa = res.data?.data as TPpdb;
    return <FormulirSiswa siswa={siswa} />;
  } catch (error) {
    notFound();
  }
}

export default Page;
