import ContentsService from "@/service/content.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export { default } from "@/components/pages/landing-page/publikasi/detail.page";

type PropsMetaData = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: PropsMetaData): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const news = await ContentsService.getOneNews(id, {
    with: "meta",
  });

  if (!news) {
    notFound();
  }

  const description = news.data.meta.find((meta) => meta.name === "description");
  const keywords = news.data.meta.filter((meta) => meta.name === "keyword").map((meta) => meta.value);
  return {
    title: news.data.title,
    description: description?.value || "There's no description",
    keywords,
  };
}
