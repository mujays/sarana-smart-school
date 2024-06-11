"use client";
import AppPadding from "@/components/shared/app-padding";
import { InputSearch } from "@/components/shared/input-search";
import Title from "@/components/shared/title";
import { useInfiniteQuery } from "@tanstack/react-query";
import ErrorRender from "@/components/shared/error-render";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { ArticleType } from "@/service/types";
import axios from "axios";
import { useDebounce } from "@/hook/useDebounce";
import CardSkeleton from "../shared/card-skeleton";
import CardNews from "../shared/card-news";

function Publikasi() {
  const [search, setSearch] = useState<string>("");

  const debouncedValue = useDebounce<string>(search, 300);

  const loadRef = useRef<HTMLDivElement | null>(null);

  const fetchNews = async ({ pageParam = "" }) => {
    if (!pageParam || debouncedValue) {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/content?sd=yes${!!debouncedValue ? `&search=${debouncedValue}&page=1&page_size=100&publish=1` : ""}`
      );
      return res.data;
    } else {
      const res = await axios.get(pageParam);
      return res.data;
    }
  };

  // @ts-ignore
  const { data, fetchNextPage, isError, isFetching, refetch, isLoading } = useInfiniteQuery({
    queryKey: ["news", debouncedValue],
    queryFn: fetchNews,
    getNextPageParam: (lastPage, pages) => (debouncedValue ? null : lastPage.meta.next_page_url),
  });

  //* handle change search
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (loadRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      });

      observer.observe(loadRef.current);

      // Cleanup observer on component unmount
      return () => {
        if (loadRef.current) {
          observer.unobserve(loadRef.current);
        }
      };
    }
  }, []);

  return (
    <main className="py-20">
      <AppPadding>
        <Title title="Berita Terbaru Dari SD Smart School" isCenter color="primary" />
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
        ) : data?.pages[0]?.data?.length === 0 ? (
          <div className="flex justify-center h-[50vh] mt-10">
            <div className="text-center space-y-2">
              <p>Tidak Ditemukan</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-5 mb-8 mt-10">
              {data.pages?.map((data) =>
                data.data.map((art: ArticleType) => (
                  <div className="flex-1 basis-11/12 md:basis-7/12 lg:basis-4/12 xl:basis-3/12" key={art.id}>
                    <CardNews date={art.created_at} href={`/publikasi/${art.slug}`} src={art.url} title={art.title} />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </AppPadding>
      <div id="Load" ref={loadRef} className="flex justify-center mt-10">
        {isFetching && data?.pages?.length && <Loader2Icon className="w-10 h-10 animate-spin text-primary" />}
      </div>
    </main>
  );
}

export default Publikasi;
