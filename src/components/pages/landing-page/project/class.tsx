"use client";
import AppPadding from "@/components/shared/app-padding";
import { PROJECT_CLASS } from "@/configs/constants/project";
import ContentsService from "@/service/content.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

function ClassProject() {
  const { kelas } = useParams();
  const dataClass = PROJECT_CLASS.find((d) => d.path === kelas);

  const { data: projects } = useQuery({
    queryKey: ["projects", kelas],
    queryFn: async () => {
      return await ContentsService.getProject({
        kelas: dataClass?.class,
        with: "meta",
      });
    },
  });

  return (
    <AppPadding>
      <div className="flex flex-col lg:flex-row gap-5 my-5">
        <div className="bg-[#DBEFE1] space-y-3 basis-4/12 flex justify-center items-center flex-col gap-3 py-10">
          <p className="text-3xl font-bold">{dataClass?.title}</p>
          <div className="flex flex-col gap-2">
            {dataClass?.goal.map((desc, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Image
                  width={50}
                  height={30}
                  priority
                  alt="Location"
                  src="/images/icon/check.svg"
                  className="w-full h-auto"
                />
                <p className="text-xl  font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-8/12 space-y-3">
          <p className="text-justify leading-8">{dataClass?.longDesc}</p>
          {projects?.data.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects?.data.map((pro) => (
                <div
                  key={pro.id}
                  className="relative group p-2 pb-10 rounded-xl shadow overflow-hidden"
                >
                  <div className="absolute rounded-xl bottom-0 left-0 right-0 top-full group-hover:top-0 transition-all bg-orange-500 p-2 flex flex-col">
                    <div className="h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        width={500}
                        height={300}
                        priority
                        alt="Project Image"
                        src={pro?.url_hover || "/images/placeholder.png"}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p className="text-xl text-center font-bold text-white py-3">
                      {pro?.title}
                    </p>
                    <p className="text-center flex-grow overflow-auto text-white mb-10">
                      {pro?.meta?.find((m) => m.name === "description")
                        ?.value || ""}
                    </p>
                  </div>
                  <div className="aspect-square">
                    <Image
                      width={500}
                      height={300}
                      priority
                      alt="Project Image"
                      src={pro?.url_non_hover || "/images/placeholder.png"}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xl text-center font-bold text-secondary py-3 flex-grow">
                    {pro?.title}
                  </p>
                  <p className="text-center pb-4 text-sm lg:text-base">
                    Durasi pengerjaan 5 bulan
                  </p>
                  <div className="w-fit absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground mx-auto px-3 py-1 rounded-full whitespace-nowrap text-sm lg:text-base ">
                    Semester {pro?.semester}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppPadding>
  );
}

export default ClassProject;
