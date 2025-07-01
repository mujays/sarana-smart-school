import AppPadding from "@/components/shared/app-padding";
import ContentsService from "@/service/content.service";
import Image from "next/image";
import { notFound } from "next/navigation";

type PropsComponent = {
  params: { id: string };
};

async function DetailNews({ params }: PropsComponent) {
  // read route params
  const id = params.id;

  // fetch data
  const news = await ContentsService.getOneArticle(id, {
    with: "meta",
  });

  if (!news) {
    notFound();
  }

  return (
    <AppPadding className="py-20">
      <article>
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-medium">{news.data.title}</p>
          <div className="w-96 h-52">
            <Image
              width={500}
              height={100}
              priority
              sizes="500px"
              alt="Thumbnail"
              src={(news.data?.url as string) || "/images/no-thumbnail.png"}
              className="w-full h-auto object-cover object-center"
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: news.data?.body as string }}
          />
        </div>
      </article>
    </AppPadding>
  );
}

export default DetailNews;
