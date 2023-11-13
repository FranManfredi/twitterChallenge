import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, loading } = useGetFeed(6, "");

  return <Feed posts={posts} loading={loading} />;
};
export default ContentFeed;
