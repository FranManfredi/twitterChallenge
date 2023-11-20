import React, { useEffect, useState } from "react";
import { GetComments } from "../../hooks/useGetComments";
import { Post } from "../../service";
import FeedComment from "./FeedComment";

interface CommentFeedProps {
  postId: string;
}

const CommentFeed: React.FC<CommentFeedProps> = ({ postId }) => {
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comments = await GetComments({ postId });
        setPost(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <>
      <FeedComment posts={post} postId={postId} />
    </>
  );
};

export default CommentFeed;
