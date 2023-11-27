import React, { useEffect, useState } from "react";
import { Post } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHttpRequestService } from "../../service/HttpRequestService";

interface CommentFeedProps {
  postId: string;
  posts: Post[] | Post;
}

const FeedComment = ({ postId, posts }: CommentFeedProps) => {
  const http = useHttpRequestService();

  const postArray = Array.isArray(posts) ? posts : [posts];
  const [hasMore, setHasMore] = useState(true);
  const [after, setAfter] = useState("");
  const [postsToShow, setPostsToShow] = useState<Post[]>([]);

  useEffect(() => {
    setPostsToShow(
      postArray.filter((post, index, self) => {
        return self.findIndex((p) => p.id === post.id) === index;
      })
    );
    setAfter(postArray[postArray.length - 1]?.id ?? "");
  }, [postArray]);

  async function fetchMoreDataHandler() {
    try {
      const res = await http.getPaginatedCommentsByPostId(postId, 6, after);
      if (res && Array.isArray(res) && res.length > 0) {
        setAfter(res[res.length - 1].id);
        setPostsToShow((prevPosts) => [...prevPosts, ...res]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
      console.error("Error fetching more data:", error);
    }
  }

  return (
    <InfiniteScroll
      dataLength={postsToShow.length}
      next={fetchMoreDataHandler}
      hasMore={postArray.length < 4 ? false : hasMore}
      loader={<Loader />}
      endMessage={<p>No more posts to show</p>}
      scrollableTarget="content-target"
    >
      <StyledContainer width={"100%"} alignItems={"center"}>
        {postsToShow.map((post: Post) => (
          <Tweet key={post.id} post={post} />
        ))}
      </StyledContainer>
    </InfiniteScroll>
  );
};

export default FeedComment;
