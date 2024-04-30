import Title from "@/components/shared/title";
import CardSection from "../shared/card-section";
import AppPadding from "@/components/shared/app-padding";
import Image from "next/image";

function Publikasi() {
  return (
    <main className="pt-20 space-y-10">
      <div className="space-y-3">
        <Title title="Publikasi" isCenter />
        <p className="text-center">Articel SD Smartschool</p>
      </div>
      <AppPadding className="pb-20">
        <CardSection
          cardData={[
            {
              alt: "kelas1",
              date: "20 Januari",
              description: "Projek Kelas 1",
              href: "/",
              src: "https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg",
            },
            {
              alt: "kelas1",
              date: "20 Januari",
              description: "Projek Kelas 1",
              href: "/",
              src: "https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg",
            },
            {
              alt: "kelas1",
              date: "20 Januari",
              description: "Projek Kelas 1",
              href: "/",
              src: "https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg",
            },
            {
              alt: "kelas1",
              date: "20 Januari",
              description: "Projek Kelas 1",
              href: "/",
              src: "https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg",
            },
          ]}
        />
      </AppPadding>
      <section className="py-20 bg-accent">
        <AppPadding>
          <Title title="News" color="base" isCenter />
          <p className="text-center">Berita Terbaru SD Smartschool</p>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3 pt-10">
            <CardNews />
            <CardNews />
            <CardNews />
          </div>
        </AppPadding>
      </section>
    </main>
  );
}

function CardNews() {
  return (
    <div className="bg-primary-foreground rounded-md overflow-hidden space-y-2">
      <Image
        width={200}
        height={100}
        priority
        alt="News"
        src="https://cdn.pixabay.com/photo/2019/04/02/10/58/oldtimer-4097480_1280.jpg"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className="p-3 text-justify">
        <p className="text-lg font-bold">Test</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
}

export default Publikasi;
