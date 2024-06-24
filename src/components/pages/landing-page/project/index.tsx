import AppPadding from "@/components/shared/app-padding";
import ProjectSection from "../shared/project-section";
import { PROJECT_CLASS } from "@/configs/constants/project";

function Project() {
  return (
    <main className="py-20">
      <AppPadding className="space-y-10">
        <div className="space-y-5">
          {PROJECT_CLASS.map((project, i) => (
            <ProjectSection
              key={i}
              kelas={project.class}
              titleProject={project.title}
              listDescription={project.goal}
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
              description={project.shortDesc}
            />
          ))}
        </div>
      </AppPadding>
    </main>
  );
}

export default Project;
