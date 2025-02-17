import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import "moment/locale/id";

function CardNews({
  src,
  title,
  href,
  date,
}: {
  src: string;
  title: string;
  href: string;
  date: Date;
}) {
  return (
    <Link
      href={href}
      className="bg-primary-foreground block border border-gray-300 rounded-md  space-y-2"
    >
      <div className="aspect-video">
        <Image
          width={500}
          height={300}
          priority
          alt="News"
          src={src || "/images/no-thumbnail.png"}
          sizes="500px"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="p-3">
        <p className="text-lg font-medium">{title}</p>
        <p>{moment(date).format("LL")}</p>
      </div>
    </Link>
  );
}

export default CardNews;
