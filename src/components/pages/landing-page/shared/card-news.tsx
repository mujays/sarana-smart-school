import Image from "next/image";
import Link from "next/link";

function CardNews({ src, title, href }: { src: string; title: string; href: string }) {
  return (
    <Link href={href} className="bg-primary-foreground aspect-auto border border-gray-300 rounded-md overflow-hidden">
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
      <div className="p-3 flex flex-col justify-between">
        <p className="text-xs pt-2 text-gray-400">10 Januari 2020</p>
        <p className="text-lg font-medium">{title}</p>
      </div>
    </Link>
  );
}

export default CardNews;
