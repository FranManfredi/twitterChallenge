import React, { useEffect, useState } from "react";
import { Post } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHttpRequestService } from "../../service/HttpRequestService";

interface FeedProps {
  posts: Post[] | Post;
  loading: boolean;
  scrollableTarget: string;
}

const Feed = ({ posts, loading, scrollableTarget }: FeedProps) => {
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
      const res = await http.getPaginatedPosts(6, after);

      if ((res?.length ?? 1) < 0) {
        setHasMore(false);
      } else {
        setAfter(res[res.length - 1].id);
        setPostsToShow((prevPosts) => [...prevPosts, ...res]);
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
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<p>No more posts to show</p>}
      scrollableTarget={scrollableTarget}
    >
      <StyledContainer width={"100%"} alignItems={"center"}>
        {postsToShow.map((post: Post) => (
          <Tweet key={post.id} post={post} />
        ))}
      </StyledContainer>
    </InfiniteScroll>
  );
};

export default Feed;
