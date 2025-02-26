import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { mapMetadata } from "@/configs/metadata";
import { Metadata } from "next";

export const metadata: Metadata = mapMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
