import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/shared/carousel";
import { cn } from "@/lib/utils";
import ContentsService from "@/service/content.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import * as React from "react";

function Banner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { data: banner, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      return await ContentsService.getBanner();
    },
  });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {banner?.data.length ? (
            banner?.data.map((banner, index) => (
              <CarouselItem key={index} className="h-[30vh] md:h-[40vh] lg:h-[50vh]">
                <Image
                  width={500}
                  height={300}
                  priority
                  alt={banner.pages}
                  src={banner.url}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="h-[30vh] md:h-[40vh] lg:h-[50vh]">
              <Image
                width={500}
                height={300}
                priority
                alt={"Not Found"}
                src={"/images/placeholder.png"}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background flex gap-1 py-1 px-4 rounded-full shadow">
        {banner?.data.map((b, i) => (
          <div
            key={b.id}
            className={cn("rounded-full border text-sm w-8 h-8 flex justify-center items-center cursor-pointer", {
              "bg-primary text-primary-foreground": b.id === banner.data[current].id,
            })}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default Banner;
