import QueryProvider from "@/providers/query-client";
import "./globals.css";
import { Toaster } from "@/components/shared/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden">
        <Toaster richColors position="top-right" theme="light" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
