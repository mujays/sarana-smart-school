import { Button } from "@/components/shared/button";
import Title from "@/components/shared/title";
import Image from "next/image";
import Link from "next/link";

type Props = {
  titleProject: string;
  listDescription: string[];
  description: string;
  card: {
    title: string;
    description: string;
    image: string;
    semester: string;
  }[];
};

function ProjectSection({ card, description, listDescription, titleProject }: Props) {
  return (
    <>
      <Title title={titleProject} color="dark" />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="lg:flex-1 basis-4/12 space-y-3">
          <div className="space-y-3">
            {listDescription.map((desc, i) => (
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
          <p className="text-justify">{description}</p>
          <Button variant="secondary" className="shadow" asChild>
            <Link href="/">Baca Lebih Lanjut</Link>
          </Button>
        </div>
        <div className="flex gap-4 lg:flex-1 basis-8/12 self-start">
          {card.map((data, i) => (
            <div key={i} className="p-2 rounded-xl shadow">
              <div className="aspect-square">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt="Project Image"
                  src={data.image}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p className="text-xl text-center font-bold text-secondary py-3">{data.title}</p>
              <p className="text-center pb-4 text-sm lg:text-base">{data.description}</p>
              <div className="w-fit bg-primary text-primary-foreground mx-auto -mb-5 px-3 py-1 rounded-full text-sm lg:text-base">{data.semester}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectSection;
