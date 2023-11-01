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
    const res = await axiosHandler.post( `${url}/reaction/${postId}`, { type: reaction }).catch((err) => {
      console.log(err);
      return err;
    });
     return res.data;
  },
  deleteReaction: async (reactionId: string) => {
    const res = await axios.delete(`${url}/reaction/${reactionId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await axios.post(
      `${url}/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.delete(`${url}/follow/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/search`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await axios.get(`${url}/chat`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await axios.get(`${url}/follow/mutual`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await axios.post(
      `${url}/chat`,
      {
        users: [id],
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await axios.get(`${url}/chat/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
  service = httpRequestService;
}

export { useHttpRequestService, HttpService };
