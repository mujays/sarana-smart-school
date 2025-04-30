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
  const token = searchParams?.token;
  const isPpdb = !!searchParams?.ppdb;

  if (!token || typeof token !== "string") {
    return notFound();
  }

  try {
    const endpoint = isPpdb
      ? `/form-siswa/public/${token}`
      : `/form-pindahan/public/${token}`;

    const { data } = await axiosConfigKesiswaan.get(endpoint);
    const siswa = data?.data as TPpdb;

    return <FormulirSiswa isPpdb={isPpdb} siswa={siswa} formId={siswa?.id} />;
  } catch (error) {
    return notFound();
  }
}

export default Page;
