"use client";

import AppPadding from "@/components/shared/app-padding";
import ErrorRender from "@/components/shared/error-render";
import { Skeleton } from "@/components/shared/skeleton";
import ContentsService from "@/service/content.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

function DetailPublikasi() {
  const { id } = useParams();
  const {
    data: news,
    isLoading: loadingNews,
    isError: errorNews,
    isFetching: isFetchingNews,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ["new"],
    queryFn: async () => {
      return await ContentsService.getOneNews(parseInt(id as string));
    },
  });

  return (
    <AppPadding className="py-20">
      <article>
        {loadingNews ? (
          <div className="flex flex-col space-y-3 ">
            <Skeleton className="h-[325px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : errorNews && !isFetchingNews ? (
          <div className="h-[50vh] flex items-center">
            <ErrorRender refetch={refetchNews} />
          </div>
        ) : news?.data ? (
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-medium">{news?.data.title}</p>
            <div className="aspect-video">
              <Image
                width={500}
                height={300}
                priority
                alt="Thumbnail"
                src={news?.data?.url as string}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: news?.data.body as string }} />
          </div>
        ) : null}
      </article>
    </AppPadding>
  );
}

export default DetailPublikasi;
