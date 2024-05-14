import Image from "next/image";

function CardNews({ src, title, description }: { src: string; title: string; description: string }) {
  return (
    <div className="bg-primary-foreground border border-gray-300 rounded-md overflow-hidden space-y-2">
      <div className="aspect-video">
        <Image
          width={500}
          height={100}
          priority
          alt="News"
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="p-3">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-xs text-justify">{description}</p>
        <p className="text-end text-xs pt-2 text-gray-400">10 Januari 2020</p>
      </div>
    </div>
  );
}

export default CardNews;
