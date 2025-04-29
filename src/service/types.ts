export type ArticleType = {
  id: number;
  title: string;
  url: string;
  slug: string;
  body: string;
  is_for_yayasan: 0;
  is_for_sd: 0;
  is_for_smp: 1;
  is_publish: 1;
  authors: string;
  views: 19;
  created_at: Date;
  updated_at: Date;
  meta: {
    id: number;
    name: string;
    value: string;
  }[];
};

export type BannerType = {
  id: number;
  pages: string;
  url: string;
};

export type SocmedType = {
  id: number;
  title: string;
  sosial_media: string;
  url: string;
  is_publish: boolean;
  thumbnail: string;
};

export type ProjectType = {
  id: number;
  tingkatan_id: number;
  is_for_sd: boolean;
  is_for_smp: boolean;
  url_non_hover: string;
  url_hover: string;
  title: string;
  slug: string;
  body: string;
  tahun_ajaran: string;
  semester: number;
  is_publish: number;
  meta: {
    id: number;
    name: string;
    value: string;
  }[];
};

export type RequestArticleDto = {
  smp?: "yes";
  page?: number;
  page_size?: number;
  yayasan?: "yes";
  sd?: "yes";
  search?: string;
};

export type ResponseContentDto<T> = {
  success: boolean;
  message: string;
  code: number;
  data: T[];
  meta: {
    next_page_url: null | string;
    prev_page_url: null | string;
  };
};

export type ResponseContentDetailDto<T> = {
  success: boolean;
  message: string;
  code: number;
  data: T;
};

export type TPpdb = {
  id: number;
  nama_siswa: string;
  tanggal_lahir: string;
  email_orang_tua: string;
  alamat: string;
  types: string;
  sekolah_asal: string;
  nama_orang_tua: string;
  no_hp_orang_tua: string;
  reason: string;
  know_from: string;
  biaya_pendaftaran: null | string;
  bukti_pembayaran: null | string;
  payment_method: null | string;
  token: string;
  kelas_id: number;
  status: string;
  is_past_to_test: boolean;
  payment_at: null | string;
  is_lunas: boolean;
  data_siswa: any;
  data_ortu: any;
  kelas_id: number;
  created_at: string;
  updated_at: string;
};
