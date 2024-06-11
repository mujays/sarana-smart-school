import Card, { CardProps } from "@/components/shared/card";
import Title from "@/components/shared/title";

function CardSection({ cardData, title }: { cardData: CardProps[]; title?: string }) {
  return (
    <section className="space-y-10">
      <div className="space-y-5">
        {title && <Title title={title} />}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
          {cardData.map((data, i) => (
            <Card key={i} date={data.date} description={data.description} href={data.href} src={data.src}></Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardSection;
