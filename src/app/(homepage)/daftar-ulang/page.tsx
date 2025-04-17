import DaftarUlang from "@/components/pages/pendaftaran/daftar-ulang";
import { axiosConfigKesiswaan } from "@/configs/axios";
import { TPpdb } from "@/service/types";
import { notFound } from "next/navigation";

export const metadata = {
  description: "Daftar Ulang",
  title: "Daftar Ulang",
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
    const isPpdb = !!searchParams?.ppdb;

    const endpoint = isPpdb
      ? `/form-siswa/public/${token}`
      : `/form-pindahan/public/${token}`;

    const res = await axiosConfigKesiswaan.get(endpoint);
    const siswa = res.data?.data as TPpdb;
    return <DaftarUlang siswa={siswa} isPpdb={isPpdb} />;
  } catch (error) {
    notFound();
  }
}

export default Page;
