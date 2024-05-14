import AppPadding from "@/components/shared/app-padding";
import ProjectSection from "../shared/project-section";

function Project() {
  return (
    <main className="py-20">
      <AppPadding className="space-y-10">
        <div className="space-y-5">
          <ProjectSection
            titleProject="Proyek Kelas 1"
            listDescription={["Menghargai", "Kolaborasi", "Kontribusi"]}
            card={[
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
            ]}
            description="Siswa dan siswi kelas 1 di SD Smart School terlibat dalam proyek membangun karakter respect dengan menghargai nilai-nilai sehari-hari, dibimbing guru dan didukung orangtua, serta berkontribusi pada kebaikan di lingkungan mereka melalui kesadaran akan respect."
          />
          <ProjectSection
            titleProject="Proyek Kelas 1"
            listDescription={["Menghargai", "Kolaborasi", "Kontribusi"]}
            card={[
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
            ]}
            description="Siswa dan siswi kelas 1 di SD Smart School terlibat dalam proyek membangun karakter respect dengan menghargai nilai-nilai sehari-hari, dibimbing guru dan didukung orangtua, serta berkontribusi pada kebaikan di lingkungan mereka melalui kesadaran akan respect."
          />
          <ProjectSection
            titleProject="Proyek Kelas 1"
            listDescription={["Menghargai", "Kolaborasi", "Kontribusi"]}
            card={[
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
              {
                image: "/images/dummy-project-2.png",
                description: "Durasi Pengerjaan  5 bulan",
                semester: "Semester 1",
                title: "Book Of Me",
              },
            ]}
            description="Siswa dan siswi kelas 1 di SD Smart School terlibat dalam proyek membangun karakter respect dengan menghargai nilai-nilai sehari-hari, dibimbing guru dan didukung orangtua, serta berkontribusi pada kebaikan di lingkungan mereka melalui kesadaran akan respect."
          />
        </div>
      </AppPadding>
    </main>
  );
}

export default Project;
