"use client";
import Title from "@/components/shared/title";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";
import ContentsService from "@/service/content.service";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../shared/card-skeleton";
import { InputSearch } from "@/components/shared/input-search";
import ErrorRender from "@/components/shared/error-render";
import CardNews from "../shared/card-news";
import AppPadding from "@/components/shared/app-padding";

function Publikasi() {
  const [search, setSearch] = useState<string>("");

  const debouncedValue = useDebounce<string>(search, 300);

  const {
    data: news,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["news", debouncedValue],
    queryFn: async () => {
      return await ContentsService.getNews({
        page: 1,
        page_size: 10,
        sd: "yes",
        search: debouncedValue,
      });
    },
  });

  //* handle change search
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <AppPadding>
      <main className="py-20 space-y-10">
        <div className="space-y-3">
          <Title title="Berita Terbaru Dari SD Smart School" isCenter />
        </div>
        <div className="flex justify-end mt-10">
          <InputSearch placeholder="Search" onChange={handleChange} />
        </div>

        {isLoading ? (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-10">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : isError && !isFetching ? (
          <div className="h-[50vh] flex items-center">
            <ErrorRender refetch={refetch} />
          </div>
        ) : news?.data.length === 0 ? (
          <div className="flex justify-center h-[50vh]">
            <div className="text-center space-y-2">
              <p>Tidak Ditemukan</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-10">
              {news?.data.map((data) => (
                <CardNews key={data.id} href={`/publikasi/${data.id}`} src={data.url} title={data.title} />
              ))}
            </div>
          </>
        )}
      </main>
    </AppPadding>
  );
}

export default Publikasi;
