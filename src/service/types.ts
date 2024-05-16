export type ArticleType = {
  id: number;
  title: string;
  url: string;
  body: string;
  is_for_yayasan: 0;
  is_for_sd: 0;
  is_for_smp: 1;
  is_publish: 1;
  authors: string;
  views: 19;
  created_at: Date;
  updated_at: Date;
};

export type RequestArticleDto = {
  smp?: "yes";
  page: number;
  page_size: number;
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
