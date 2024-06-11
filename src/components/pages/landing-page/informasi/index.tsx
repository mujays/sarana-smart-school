import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shared/accordion";
import AppPadding from "@/components/shared/app-padding";

function InformationPage() {
  return (
    <main>
      <AppPadding>
        <section className="py-10 min-h-screen">
          <p className="pt-8 text-3xl font-bold text-center text-primary">Pendaftaran</p>
          <p className="text-center py-4">Pendaftaran Siswa SD Smart School</p>
          <div className="bg-background p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </AppPadding>
      <section className="py-10 bg-primary min-h-screen">
        <AppPadding>
          <p className="pt-8 text-3xl font-bold text-center text-primary-foreground">Pembayaran</p>
          <p className="text-center py-4 text-primary-foreground">Pertanyaan mengenai pembayaran siswa SD Smart School</p>
          <div className="bg-background p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AppPadding>
      </section>
      <AppPadding>
        <section className="py-10 min-h-screen">
          <p className="pt-8 text-3xl font-bold text-center text-primary">FAQ</p>
          <p className="text-center py-4">Pertanyaan yang sering ditanya pada SD Smart School</p>
          <div className="bg-background p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </AppPadding>
    </main>
  );
}

export default InformationPage;
