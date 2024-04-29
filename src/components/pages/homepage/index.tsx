"use client";
import Title from "@/components/shared/title";
import Banner from "./components/banner";
import AppPadding from "@/components/shared/app-padding";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import Card from "@/components/shared/card";
import { Input } from "@/components/shared/input";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const InstagramEmbed = dynamic(() => import("react-social-media-embed").then((el) => el.InstagramEmbed), { ssr: false });

export default function Homepage() {
  return (
    <main className="pb-10">
      <div className="relative">
        <Banner />
      </div>
      <AppPadding className="space-y-5 py-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <Title title="Mengapa SD Smart School ?" />
          <p className="w-1/2">Smart School memfasilitasi berbagai minat dan bakat siswa serta mengembangkannya menjadi pribadi yang berani dan berkpribadian unggul.</p>
        </div>
        <div className="flex gap-8 py-10">
          <div className="w-full h-30">
            <ReactPlayer width="100%" height="240px" url="https://www.youtube.com/watch?v=d4s7NLqRC9k" />
          </div>
          <div className="w-full">
            <ReactPlayer width="100%" height="240px" url="https://www.youtube.com/watch?v=d4s7NLqRC9k" />
          </div>
          <div className="w-full">
            <ReactPlayer width="100%" height="240px" url="https://www.youtube.com/watch?v=d4s7NLqRC9k" />
          </div>
        </div>
        <div className="flex py-20">
          <div className="basis-5/12">
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
          </div>
          <div className="basis-7/12 space-y-3">
            <Title title="Sekolah Adab Kepemimpinan" />
            <p className="leading-7">
              Smart School adalah sekolah dasar yang mengusung kurikulum adab kepemimpinan. Mengembangkan 21th century skill untuk menyiapkan pemimpin masa depan yang berakhlak dan
              unggul secara kemampuan akademik maupun emosional.
            </p>
            <div className="flex justify-center">
              <Button>Pelajari Lebih Lanjut</Button>
            </div>
          </div>
        </div>
        <div className="py-10 space-y-5 text-center">
          <Title title="Jenjang Pendidikan" />
          <div className="flex gap-5">
            <div className="w-full">
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
            </div>
            <div className="w-full">
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
            </div>
          </div>
        </div>
      </AppPadding>
      <div className="relative py-10 mb-32 space-y-5 flex flex-col items-center bg-accent">
        <p className="text-2xl text-primary-foreground">Pengalaman Murid dan Guru di Smart School</p>
        <div className="flex gap-5 py-3">
          <Button className="text-primary-foreground" variant="outline">
            Kegiatan Murid Smart
          </Button>
          <Button>Kegiatan Guru Smart</Button>
        </div>
        <div className="flex gap-8">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
          </div>
        </div>
      </div>
      <AppPadding>
        <div className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-3">
            <Title title="Publikasi" />
            <p className="w-1/2">Cari tahu lebih lanjut tentang Kegiatan dan Informasi dari Smart School</p>
          </div>
          <div className="flex gap-3">
            <Card alt="Dummy" date="20 July 2020" description="Kelas Membaca dan Menulis ABCD" src="https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg" />
            <Card alt="Dummy" date="20 July 2020" description="Kelas Membaca dan Menulis ABCD" src="https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg" />
            <Card alt="Dummy" date="20 July 2020" description="Kelas Membaca dan Menulis ABCD" src="https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg" />
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center text-center space-y-10">
          <div className="w-full xl:w-3/6">
            <Title title="Daftar Sekarang dan Nikmati Pengalaman Belajar yang Menyenangkan" />
          </div>
          <div className="w-full md:w-1/2 space-y-3">
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
          </div>
        </div>
      </AppPadding>
    </main>
  );
}
