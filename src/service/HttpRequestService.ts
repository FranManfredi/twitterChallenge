import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";
import { axiosHandler } from "./axiosHandler";

const url =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const httpRequestService = {

  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
    return res.data;
  },

  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    } else {
      return false;
    }
  },

  createPost: async (data: PostData) => {
    console.log(data);
    const res = await axiosHandler.post(`${url}/post`, data).catch((err) => {
      console.log(err);
      return err;
    });
    const { upload } = S3Service;
    for (const imageUrl of res.data.images) {
      const index: number = res.data.images.indexOf(imageUrl);
      await upload(data.images![index], imageUrl);
    }
    return res.data;
  },

  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axiosHandler.get(`${url}/post/${query}`, {
      params: {
        limit,
        after,
      },
    }).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getPosts: async (query: string) => {
    const res = await axiosHandler.get(`${url}/post/`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axiosHandler.get(`${url}/user`, {
      params: {
        limit,
        skip,
      },
    }).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  me: async () => {
    const res = await axiosHandler.get(`${url}/user/me`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getPostById: async (id: string) => {
    const res = await axiosHandler.get(`${url}/post/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  createReaction: async (postId: string, reaction: string) => {
    const res = await axiosHandler.post(`${url}/reaction/${postId}`, { type: reaction }).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },
  deleteReaction: async (reactionId: string) => {
    const res = await axiosHandler.delete(`${url}/reaction/${reactionId}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  followUser: async (userId: string) => {
    const res = await axiosHandler.post(`${url}/follow/${userId}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  unfollowUser: async (userId: string) => {
    const res = await axiosHandler.delete(`${url}/follow/${userId}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axiosHandler.get(`${url}/user/search`, {
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      }).catch((err) => {
        console.log(err);
        return err;
      });
      return response.data;
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await axiosHandler.get(`${url}/user/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axiosHandler.get(`${url}/post/by_user/${id}`, {
      params: {
        limit,
        after,
      },
    }).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getPostsFromProfile: async (id: string) => {
    const res = await axiosHandler.get(`${url}/post/by_user/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  isLogged: async () => {
    const res = await axiosHandler.get(`${url}/user/me`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axiosHandler.get(`${url}/user/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  deleteProfile: async () => {
    const res = await axiosHandler.delete(`${url}/user/me`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getChats: async () => {
    const res = await axiosHandler.get(`${url}/chat`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getMutualFollows: async () => {
    const res = await axiosHandler.get(`${url}/follow/mutual`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  createChat: async (id: string) => {
    const res = await axiosHandler.post(
      `${url}/chat`, { users: [id] }).catch((err) => {
        console.log(err);
        return err;
      });
    return res.data;
  },

  getChat: async (id: string) => {
    const res = await axiosHandler.get(`${url}/chat/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  deletePost: async (id: string) => {
    await axiosHandler.delete(`${url}/post/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axiosHandler.get(`${url}/post/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    }).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },

  getCommentsByPostId: async (id: string) => {
    const res = await axiosHandler.get(`${url}/post/comment/by_post/${id}`).catch((err) => {
      console.log(err);
      return err;
    });
    return res.data;
  },
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
  service = httpRequestService;
}

export { useHttpRequestService, HttpService };
