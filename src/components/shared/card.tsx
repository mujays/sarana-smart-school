import Image from "next/image";
import Link from "next/link";

function Card({ date, description, src, alt }: { date: string; description: string; src: string; alt: string }) {
  return (
    <div className="bg-primary-dark text-primary-foreground rounded-lg p-3 flex flex-col gap-3">
      <Image
        width={200}
        height={100}
        priority
        alt={alt}
        src={src}
        style={{
          width: "100%",
          height: "auto",
        }}
        className="rounded-lg"
      />
      <p className="text-sm font-light">{date}</p>
      <p className="text-2xl mb-10">{description}</p>
      <Link href="/">Read Full Post -&gt;</Link>
    </div>
  );
}

export default Card;
