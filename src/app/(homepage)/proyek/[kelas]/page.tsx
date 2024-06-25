import { Metadata } from "next";
import { notFound } from "next/navigation";

export { default } from "@/components/pages/landing-page/project/class";

type PropsMetaData = {
  params: { kelas: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: PropsMetaData): Promise<Metadata> {
  // read route params
  const kelas = params.kelas;

  switch (kelas) {
    case "kelas-1":
      return {
        title: "Project Kelas 1",
        description:
          "Siswa dan siswi kelas 1 di SD Smart School terlibat dalam proyek membangun karakter respect dengan menghargai nilai-nilai sehari-hari, dibimbing guru dan didukung orangtua, serta berkontribusi pada kebaikan di lingkungan mereka melalui kesadaran akan respect.",
      };
      break;
    case "kelas-2":
      return {
        title: "Project Kelas 2",
        description:
          "Siswa kelas 2 di SD Smart School belajar memperkuat tanggung jawab terhadap diri dan lingkungan melalui proyek yang melibatkan menjaga kebersihan dan keteraturan di ruang kelas dan kamar tidur mereka.",
      };
    case "kelas-3":
      return {
        title: "Project Kelas 3",
        description:
          "Siswa memperoleh pengetahuan dan keterampilan yang relevan dalam menyelesaikan proyek-proyek ini. Presentasi akhir melalui gallery walk dan pertunjukan drama atau assembly menjadi wadah bagi mereka untuk berbagi hasil kerja mereka.",
      };
    case "kelas-4":
      return {
        title: "Project Kelas 4",
        description:
          "Projek ini melatih siswa untuk memunculkan sikap jujur dan adil terhadap lingkungan sekolah dengan mengidentifikasi masalah kejujuran melalui observasi, wawancara, dan diskusi. Mereka akan memecahkan masalah tersebut dan mengkampanyekan solusinya melalui produk yang dibuat kepada siswa di SD Smart School",
      };
    case "kelas-5":
      return {
        title: "Project Kelas 5",
        description:
          "Siswa kelas 5 di SD Smart School akan membuat cerita pendek yang mencerminkan nilai-nilai sekolah mereka, sambil melatih keterampilan Event Organizer dan menyelenggarakan kegiatan launching buku sebagai puncak proyek.",
      };
    case "kelas-6":
      return {
        title: "Project Kelas 6",
        description:
          "Proyek ini melatih siswa untuk menjadi penggerak dalam menerapkan perilaku hidup bersih dan sehat di sekolah serta menuliskan pengalaman mereka dalam artikel ilmiah. Mereka akan mempresentasikan karya tulis dan hasil sosialisasi “Perilaku Hidup Bersih dan Sehat” kepada guru dan orang tua siswa sebagai bagian dari proyek tersebut.",
      };
    default:
      notFound();
  }
}
