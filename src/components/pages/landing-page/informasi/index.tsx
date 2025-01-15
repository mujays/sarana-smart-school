import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion";
import AppPadding from "@/components/shared/app-padding";
import { FAQS } from "@/configs/constants/faq";

function InformationPage() {
  return (
    <main>
      <AppPadding>
        <section className="py-10 min-h-screen">
          <p className="pt-8 text-3xl font-bold text-center text-primary">
            FAQ
          </p>
          <p className="text-center py-4">
            Pertanyaan yang sering ditanya pada SD Smart School
          </p>
          <div className="bg-background p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem value={`${i}`} key={i}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-justify">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </AppPadding>
    </main>
  );
}

export default InformationPage;
