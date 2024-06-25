import axiosConfig from "@/configs/axios";
import { ArticleType, BannerType, ProjectType, RequestArticleDto, ResponseContentDetailDto, ResponseContentDto, SocmedType } from "./types";
import axios from "axios";

const ContentsService = {
  getArticles: async (params: RequestArticleDto) => {
    const response = await axiosConfig.get<ResponseContentDto<ArticleType>>("/article", {
      params,
    });
    return response.data;
  },
  getArticlesCursor: async ({ cursor = "" }: { cursor?: string }) => {
    if (!cursor) {
      const response = await axiosConfig.get<ResponseContentDto<ArticleType>>("/article");
      return response.data;
    } else {
      const response = await axios.get<ResponseContentDto<ArticleType>>(cursor);
      return response.data;
    }
  },
  getOneArticle: async (id: string, params?: any) => {
    try {
      const response = await axiosConfig.get<ResponseContentDetailDto<ArticleType>>(`/article/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getNews: async (params: RequestArticleDto) => {
    const response = await axiosConfig.get<ResponseContentDto<ArticleType>>("/content", {
      params,
    });
    return response.data;
  },
  getOneNews: async (id: string, params?: any) => {
    try {
      const response = await axiosConfig.get<ResponseContentDetailDto<ArticleType>>(`/content/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getBanner: async () => {
    const response = await axiosConfig.get<ResponseContentDto<BannerType>>("/banner", {
      params: {
        pages: "HOMEPAGE",
        sd: "yes",
      },
    });
    return response.data;
  },
  getSocmeds: async (params: any) => {
    const response = await axiosConfig.get<ResponseContentDto<SocmedType>>("/sosmed", {
      params,
    });
    return response.data;
  },
  getProject: async (params: any) => {
    const response = await axiosConfig.get<ResponseContentDto<ProjectType>>("/project", {
      params,
    });
    return response.data;
  },
};

export default ContentsService;
