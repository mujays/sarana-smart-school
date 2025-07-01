"use client";
import Title from "@/components/shared/title";
import Banner from "./components/banner";
import AppPadding from "@/components/shared/app-padding";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import { useQuery } from "@tanstack/react-query";
import ContentsService from "@/service/content.service";
import ErrorRender from "@/components/shared/error-render";
import CardSkeleton from "../shared/card-skeleton";
import Card from "@/components/shared/card";
import "moment/locale/id";
import { motion } from "framer-motion";
import {
  bottomToTop,
  leftToRight,
  rightToLeft,
} from "@/components/shared/animate/reveal";
import Link from "next/link";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((el) => el.InstagramEmbed),
  { ssr: false }
);

export default function Homepage() {
  const {
    data: news,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      return await ContentsService.getArticles({
        page: 1,
        page_size: 3,
        sd: "yes",
      });
    },
  });

  const { data: socmedYoutube } = useQuery({
    queryKey: ["socmedsYT"],
    queryFn: async () => {
      return await ContentsService.getSocmeds({
        page: 1,
        page_size: 4,
        sosial_media: "YOUTUBE",
      });
    },
  });

  const { data: socmedIg } = useQuery({
    queryKey: ["socmedsIg"],
    queryFn: async () => {
      return await ContentsService.getSocmeds({
        sosial_media: "INSTAGRAM",
        page: 1,
        page_size: 3,
      });
    },
  });

  return (
    <main className="pb-10">
      <div className="relative">
        <Banner />
      </div>
      <AppPadding className="space-y-5 py-10">
        <section className="py-20 space-y-10">
          <motion.div
            variants={bottomToTop}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            className="flex flex-col items-center text-center space-y-3"
          >
            <Title title="Mengapa SD Smart School ?" />
            <p className="w-1/2">
              Smart School memfasilitasi berbagai minat dan bakat siswa serta
              mengembangkannya menjadi pribadi yang berani dan berkpribadian
              unggul.
            </p>
          </motion.div>
          <motion.div
            variants={bottomToTop}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            className="flex flex-wrap justify-center gap-8"
          >
            {socmedYoutube?.data
              .filter((s) => s.sosial_media === "YOUTUBE")
              .map((s) => (
                <div key={s.id} className="aspect-video">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={s.url}
                  />
                </div>
              ))}
          </motion.div>
        </section>
        <section className="flex flex-col md:flex-row items-center gap-5 py-20">
          <motion.div
            variants={leftToRight}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            className="w-52 md:basis-5/12"
          >
            <Image
              width={500}
              height={300}
              priority
              alt="Logo Sekolah Adab Kepemimpinan"
              src="/images/logo-sak.svg"
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            variants={rightToLeft}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            className="md:basis-7/12 space-y-3 text-center md:text-left"
          >
            <Title title="Sekolah Adab Kepemimpinan" />
            <p className="leading-7">
              Smart School adalah sekolah dasar yang mengusung kurikulum adab
              kepemimpinan. Mengembangkan 21th century skill untuk menyiapkan
              pemimpin masa depan yang berakhlak dan unggul secara kemampuan
              akademik maupun emosional.
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="https://www.pendidikancerdas.org/" target="_blank">
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
        <section className="py-10 space-y-5 text-center">
          <Title title="Jenjang Pendidikan" />
          <div className="flex flex-col md:flex-row gap-5">
            <motion.div
              variants={leftToRight}
              initial="hidden"
              viewport={{ once: true }}
              whileInView="visible"
              className="w-full flex flex-col items-center"
            >
              <div className="p-3">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Logo SD"
                  src="/images/logo-sd.svg"
                  className="w-full h-auto"
                />
              </div>
              <p>
                &quot;Membangun dan membentuk kesalehan, kemandirian,
                kepemimpinan, kepedulian, kesederhanaan, dan kewirausahaan siswa
                sesuai dengan potensi yang dimilikinya.&quot;
              </p>
            </motion.div>
            <motion.div
              variants={leftToRight}
              initial="hidden"
              viewport={{ once: true }}
              whileInView="visible"
              className="w-full flex flex-col items-center"
            >
              <div className="p-3">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Logo SMP"
                  src="/images/logo-smp.svg"
                  className="w-full h-auto"
                />
              </div>
              <p>
                &quot;Mewujudkan siswa berjiwa pemimpin yang siap menghadapi
                kehidupan nyata yang beradab, berkarakter, dan beretika.&quot;
              </p>
            </motion.div>
          </div>
        </section>
      </AppPadding>
      <section className="bg-accent">
        <AppPadding className="relative py-10 mb-32 space-y-5 flex flex-col items-center">
          <p className="text-2xl text-primary-foreground text-center">
            Pengalaman Murid dan Guru di Smart School
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {socmedIg?.data.length ? (
              socmedIg?.data
                .filter((s) => s.sosial_media === "INSTAGRAM")
                .map((s) => (
                  <div key={s.id} className="flex justify-center">
                    <InstagramEmbed url={s.url} width={"100%"} />
                  </div>
                ))
            ) : (
              <div className="text-white">Belum ada kegiatan</div>
            )}
          </div>
        </AppPadding>
      </section>
      <AppPadding>
        <section className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-3">
            <Title title="Publikasi" />
            <p className="w-1/2">
              Cari tahu lebih lanjut tentang Kegiatan dan Informasi dari Smart
              School
            </p>
          </div>
          {isLoading ? (
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-10">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : isError && !isFetching ? (
            <div className="h-[50vh] flex items-center">
              <ErrorRender refetch={refetch} />
            </div>
          ) : news?.data.length === 0 ? (
            <div className="flex justify-center h-[50vh]">
              <div className="text-center space-y-2">
                <p>Tidak Ada Publikasi</p>
              </div>
            </div>
          ) : (
            <>
              <motion.div
                variants={bottomToTop}
                initial="hidden"
                viewport={{ once: true }}
                whileInView="visible"
                className="flex flex-wrap justify-center gap-5 mb-8"
              >
                {news?.data.map((data) => (
                  <div
                    className="flex-1 basis-11/12 md:basis-7/12 lg:basis-4/12 xl:basis-3/12"
                    key={data.id}
                  >
                    <Card
                      date={data.created_at}
                      href={`/publikasi/${data.slug}`}
                      src={data.url}
                      description={data.title}
                    />
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </section>
        <section className="mt-20 flex flex-col items-center text-center space-y-10">
          <motion.div
            variants={bottomToTop}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            className="w-full xl:w-3/6"
          >
            <Title title="Daftar Sekarang dan Nikmati Pengalaman Belajar yang Menyenangkan" />
          </motion.div>

          <div className="flex justify-center items-center gap-3">
            <Button size="sm" asChild>
              <Link href="/formulir-pendaftaran">Daftarkan Siswa Baru</Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link href="/formulir-pindahan">Daftarkan Siswa Pindahan</Link>
            </Button>
          </div>
        </section>
      </AppPadding>
    </main>
  );
}
