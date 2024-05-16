import axiosConfig from "@/configs/axios";
import { ArticleType, RequestArticleDto, ResponseContentDetailDto, ResponseContentDto } from "./types";

const ContentsService = {
  getArticles: async (params: RequestArticleDto) => {
    const response = await axiosConfig.get<ResponseContentDto<ArticleType>>("/article", {
      params,
    });
    return response.data;
  },
  getOneArticle: async (id: number, params?: any) => {
    const response = await axiosConfig.get<ResponseContentDetailDto<ArticleType>>(`/article/${id}`, {
      params,
    });
    return response.data;
  },
  getNews: async (params: RequestArticleDto) => {
    const response = await axiosConfig.get<ResponseContentDto<ArticleType>>("/content", {
      params,
    });
    return response.data;
  },
  getOneNews: async (id: number, params?: any) => {
    const response = await axiosConfig.get<ResponseContentDetailDto<ArticleType>>(`/content/${id}`, {
      params,
    });
    return response.data;
  },
};

export default ContentsService;
