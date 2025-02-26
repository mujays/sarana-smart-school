import { Metadata } from "next";

export const mapMetadata = (cfg: Partial<Metadata>): Metadata => {
  const defaultTitle = "SD Smart School";
  const defaultDescription =
    "Smart School adalah sekolah dasar yang mengusung kurikulum adab kepemimpinan. Mengembangkan 21th century skill untuk menyiapkan pemimpin masa depan yang berakhlak dan unggul secara kemampuan akademik maupun emosional.";

  return {
    title: cfg.title || defaultTitle,
    description: cfg.description || defaultDescription,
    keywords: [
      "SD Smart School",
      "Smart School",
      "Sekolah Dasar",
      "Sekolah Dasar Smart School",
    ],
    openGraph: {
      type: "website",
      title: cfg.title || defaultTitle,
      description: cfg?.openGraph?.description || defaultDescription,
      images: [
        {
          url: "https://smart.sch.id/images/smart-logo.png",
          width: 300,
          height: 300,
          alt: "SD Smart School",
        },
      ],
    },
  };
};
