import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/shared/carousel";
import { BANNER } from "@/configs/constants/homepage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

function Banner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
          {BANNER.map((banner, index) => (
            <CarouselItem key={index}>
              <Image
                width={500}
                height={50}
                priority
                alt={banner.alt}
                src={banner.path}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background flex gap-1 py-1 px-4 rounded-full shadow">
        {BANNER.map((banner, i) => (
          <div
            key={banner.path}
            className={cn("rounded-full border text-sm w-8 h-8 flex justify-center items-center cursor-pointer", {
              "bg-primary text-primary-foreground": banner.path === BANNER[current].path,
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
