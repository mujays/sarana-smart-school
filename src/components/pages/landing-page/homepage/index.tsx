"use client";
import Title from "@/components/shared/title";
import Banner from "./components/banner";
import AppPadding from "@/components/shared/app-padding";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { useQuery } from "@tanstack/react-query";
import ContentsService from "@/service/content.service";
import ErrorRender from "@/components/shared/error-render";
import CardSkeleton from "../shared/card-skeleton";
import Card from "@/components/shared/card";
import "moment/locale/id";
import { motion } from "framer-motion";
import { bottomToTop, leftToRight, rightToLeft } from "@/components/shared/animate/reveal";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const InstagramEmbed = dynamic(() => import("react-social-media-embed").then((el) => el.InstagramEmbed), { ssr: false });

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
      return await ContentsService.getNews({
        page: 1,
        page_size: 3,
        sd: "yes",
      });
    },
  });

  const { data: socmed } = useQuery({
    queryKey: ["socmeds"],
    queryFn: async () => {
      return await ContentsService.getSocmeds();
    },
  });

  return (
    <main className="pb-10">
      <div className="relative">
        <Banner />
      </div>
      <AppPadding className="space-y-5 py-10">
        <section className="py-20 space-y-10">
          <motion.div variants={bottomToTop} initial="hidden" viewport={{ once: true }} whileInView="visible" className="flex flex-col items-center text-center space-y-3">
            <Title title="Mengapa SD Smart School ?" />
            <p className="w-1/2">Smart School memfasilitasi berbagai minat dan bakat siswa serta mengembangkannya menjadi pribadi yang berani dan berkpribadian unggul.</p>
          </motion.div>
          <motion.div variants={bottomToTop} initial="hidden" viewport={{ once: true }} whileInView="visible" className="flex flex-wrap justify-center gap-8">
            {socmed?.data
              .filter((s) => s.sosial_media === "YOUTUBE")
              .map((s) => (
                <div key={s.id} className="aspect-video">
                  <ReactPlayer controls width="100%" height="100%" url={s.url} />
                </div>
              ))}
          </motion.div>
        </section>
        <section className="flex flex-col md:flex-row items-center gap-5 py-20">
          <motion.div variants={leftToRight} initial="hidden" viewport={{ once: true }} whileInView="visible" className="w-52 md:basis-5/12">
            <Image
              width={500}
              height={300}
              priority
              alt="Logo Sekolah Adab Kepemimpinan"
              src="/images/logo-sak.svg"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </motion.div>
          <motion.div variants={rightToLeft} initial="hidden" viewport={{ once: true }} whileInView="visible" className="md:basis-7/12 space-y-3 text-center md:text-left">
            <Title title="Sekolah Adab Kepemimpinan" />
            <p className="leading-7">
              Smart School adalah sekolah dasar yang mengusung kurikulum adab kepemimpinan. Mengembangkan 21th century skill untuk menyiapkan pemimpin masa depan yang berakhlak dan
              unggul secara kemampuan akademik maupun emosional.
            </p>
            <div className="flex justify-center">
              <Button>Pelajari Lebih Lanjut</Button>
            </div>
          </motion.div>
        </section>
        <section className="py-10 space-y-5 text-center">
          <Title title="Jenjang Pendidikan" />
          <div className="flex flex-col md:flex-row gap-5">
            <motion.div variants={leftToRight} initial="hidden" viewport={{ once: true }} whileInView="visible" className="w-full flex flex-col items-center">
              <div className="p-3">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Logo SD"
                  src="/images/logo-sd.svg"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p>
                &quot;Membangun dan membentuk kesalehan, kemandirian, kepemimpinan, kepedulian, kesederhanaan, dan kewirausahaan siswa sesuai dengan potensi yang dimilikinya.&quot;
              </p>
            </motion.div>
            <motion.div variants={leftToRight} initial="hidden" viewport={{ once: true }} whileInView="visible" className="w-full flex flex-col items-center">
              <div className="p-3">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Logo SMP"
                  src="/images/logo-smp.svg"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p>&quot;Mewujudkan siswa berjiwa pemimpin yang siap menghadapi kehidupan nyata yang beradab, berkarakter, dan beretika.&quot;</p>
            </motion.div>
          </div>
        </section>
      </AppPadding>
      <section className="bg-accent">
        <AppPadding className="relative py-10 mb-32 space-y-5 flex flex-col items-center">
          <p className="text-2xl text-primary-foreground text-center">Pengalaman Murid dan Guru di Smart School</p>
          <div className="flex gap-5 py-3">
            <Button className="text-primary-foreground" variant="outline">
              Kegiatan Murid Smart
            </Button>
            <Button>Kegiatan Guru Smart</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {socmed?.data
              .filter((s) => s.sosial_media === "INSTAGRAM")
              .map((s) => (
                <div key={s.id} style={{ display: "flex", justifyContent: "center" }}>
                  <InstagramEmbed url={s.url} width={"100%"} />
                </div>
              ))}
          </div>
        </AppPadding>
      </section>
      <AppPadding>
        <section className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-3">
            <Title title="Publikasi" />
            <p className="w-1/2">Cari tahu lebih lanjut tentang Kegiatan dan Informasi dari Smart School</p>
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
              <motion.div variants={bottomToTop} initial="hidden" viewport={{ once: true }} whileInView="visible" className="flex flex-wrap justify-center gap-5 mb-8">
                {news?.data.map((data) => (
                  <div className="flex-1 basis-11/12 md:basis-7/12 lg:basis-4/12 xl:basis-3/12" key={data.id}>
                    <Card date={data.created_at} href={`/publikasi/${data.slug}`} src={data.url} description={data.title} />
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </section>
        <section className="mt-20 flex flex-col items-center text-center space-y-10">
          <motion.div variants={bottomToTop} initial="hidden" viewport={{ once: true }} whileInView="visible" className="w-full xl:w-3/6">
            <Title title="Daftar Sekarang dan Nikmati Pengalaman Belajar yang Menyenangkan" />
          </motion.div>
          <motion.div variants={bottomToTop} initial="hidden" viewport={{ once: true }} whileInView="visible" className="w-full md:w-1/2 space-y-3">
            <Input
              icon={
                <Image
                  width={200}
                  height={200}
                  priority
                  alt="User"
                  src="/images/icon/user-alt.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              }
              placeholder="Nama Orang Tua*"
            />
            <Input icon={<span className="text-xs">+62</span>} placeholder="Nomor Whatsapp Orang Tua" />
            <Input
              icon={
                <Image
                  width={200}
                  height={200}
                  priority
                  alt="User"
                  src="/images/icon/envelope.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              }
              placeholder="Email"
            />
            <Input
              icon={
                <Image
                  width={200}
                  height={200}
                  priority
                  alt="User"
                  src="/images/icon/user-alt.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              }
              placeholder="Nama Anak"
            />
            <Input
              icon={
                <Image
                  width={200}
                  height={200}
                  priority
                  alt="User"
                  src="/images/icon/child.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              }
              placeholder="Asal TK"
            />
            <Input icon={<span>?</span>} placeholder="Mengapa Tertarik Dengan Smart School" />
            <Input
              icon={
                <Image
                  width={200}
                  height={200}
                  priority
                  alt="User"
                  src="/images/icon/link.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              }
              placeholder="Mendapatkan Info Smart School Dari"
            />
            <Button size="sm">Daftar Siswa Baru</Button>
          </motion.div>
        </section>
      </AppPadding>
    </main>
  );
}
