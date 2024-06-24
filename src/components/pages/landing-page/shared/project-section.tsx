"use client";

import { Button } from "@/components/shared/button";
import Title from "@/components/shared/title";
import { PROJECT_CLASS } from "@/configs/constants/project";
import ContentsService from "@/service/content.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Props = {
  titleProject: string;
  listDescription: string[];
  description: string;
  kelas: number;
  card: {
    title: string;
    description: string;
    image: string;
    semester: string;
  }[];
};

function ProjectSection({ kelas, card, description, listDescription, titleProject }: Props) {
  const dataClass = PROJECT_CLASS.find((d) => d.class === kelas);

  const { data: project1 } = useQuery({
    queryKey: ["project1", kelas],
    queryFn: async () => {
      return await ContentsService.getProject({
        page: 1,
        page_size: 1,
        kelas: dataClass?.class,
        semester: 1,
        with: "meta",
      });
    },
  });

  const { data: project2 } = useQuery({
    queryKey: ["project2", kelas],
    queryFn: async () => {
      return await ContentsService.getProject({
        page: 1,
        page_size: 1,
        kelas: dataClass?.class,
        semester: 2,
        with: "meta",
      });
    },
  });

  console.log({ project1, project2 });

  return (
    <>
      <Title title={titleProject} color="dark" />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="lg:flex-1 basis-4/12 space-y-3">
          <div className="space-y-3">
            {dataClass?.goal.map((desc, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Image
                  width={50}
                  height={30}
                  priority
                  alt="Location"
                  src="/images/icon/check.svg"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
                <p className="text-xl  font-medium">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-justify">{dataClass?.shortDesc}</p>
          <Button variant="secondary" className="shadow" asChild>
            <Link href={`/proyek/kelas-${kelas}`}>Baca Lebih Lanjut</Link>
          </Button>
        </div>
        <div className="flex gap-4 flex-col md:flex-row lg:flex-1 basis-8/12 self-start">
          {project1?.data.length !== 0 && (
            <div className="relative group p-2 pb-10 rounded-xl shadow overflow-hidden">
              <div className="absolute rounded-xl bottom-0 left-0 right-0 top-full group-hover:top-0 transition-all bg-orange-500 p-2 flex flex-col">
                <div className="h-40 rounded-lg overflow-hidden mb-3">
                  <Image
                    width={500}
                    height={300}
                    priority
                    alt="Project Image"
                    src={project1?.data[0]?.url_hover || "/images/placeholder.png"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="text-xl text-center font-bold text-white py-3">{project1?.data[0]?.title}</p>
                <p className="text-center flex-grow overflow-auto text-white mb-10">{project1?.data[0]?.meta?.find((m) => m.name === "description")?.value || ""}</p>
              </div>
              <div className="aspect-square">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Project Image"
                  src={project1?.data[0]?.url_non_hover || "/images/placeholder.png"}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p className="text-xl text-center font-bold text-secondary py-3">{project1?.data[0]?.title}</p>
              <p className="text-center pb-4 text-sm lg:text-base">Durasi pengerjaan 5 bulan</p>
              <div className="w-fit absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground mx-auto px-3 py-1 rounded-full whitespace-nowrap text-sm lg:text-base ">
                Semester {project1?.data[0]?.semester}
              </div>
            </div>
          )}
          {project2?.data.length !== 0 && (
            <div className="relative group p-2 pb-10 rounded-xl shadow overflow-hidden">
              <div className="absolute rounded-xl bottom-0 left-0 right-0 top-full group-hover:top-0 transition-all bg-orange-500 p-2">
                <div className="h-40 rounded-lg overflow-hidden mb-3">
                  <Image
                    width={500}
                    height={300}
                    priority
                    alt="Project Image"
                    src={project2?.data[0]?.url_hover || "/images/placeholder.png"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="text-xl text-center font-bold text-white py-3">{project2?.data[0]?.title}</p>
                <p className="text-center text-white text-sm mb-10">{project2?.data[0]?.meta?.find((m) => m.name === "description")?.value || ""}</p>
              </div>
              <div className="aspect-square">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Project Image"
                  src={project2?.data[0]?.url_non_hover || "/images/placeholder.png"}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p className="text-xl text-center font-bold text-secondary py-3">{project2?.data[0]?.title}</p>
              <p className="text-center pb-4 text-sm lg:text-base">Durasi pengerjaan 5 bulan</p>
              <div className="w-fit absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground mx-auto px-3 py-1 rounded-full whitespace-nowrap text-sm lg:text-base ">
                Semester {project2?.data[0]?.semester}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectSection;
