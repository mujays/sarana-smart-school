import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export type CardProps = { date: Date; description: string; src: string; href: string };

function Card({ date, description, src, href }: CardProps) {
  return (
    <Link href={href} className="bg-primary-dark h-full text-primary-foreground rounded-lg p-3 flex flex-col gap-3">
      <div className="aspect-video overflow-hidden">
        <Image
          width={500}
          height={300}
          priority
          alt={"Publications"}
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="rounded-lg"
        />
      </div>
      <p className="text-sm font-light">{moment(date).format("LL")}</p>
      <p className="text-2xl mb-3">{description}</p>
    </Link>
  );
}

export default Card;
