import AppPadding from "@/components/shared/app-padding";
import CardSection from "./components/card-section";
import Title from "@/components/shared/title";

function Project() {
  return (
    <main className="py-20 space-y-10">
      <Title title="Project" isCenter />
      <AppPadding className="space-y-20">
        <CardSection
          title="Kelas 1"
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
        <CardSection
          title="Kelas 1"
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
    </main>
  );
}

export default Project;
