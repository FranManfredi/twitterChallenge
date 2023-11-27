import { useHttpRequestService } from "../service/HttpRequestService";

interface UseGetCommentsProps {
  postId: string;
}

export const GetComments = async ({ postId }: UseGetCommentsProps) => {
  const service = useHttpRequestService();
  const post = await service.getPaginatedCommentsByPostId(postId, 4, "");
  return post;
};
