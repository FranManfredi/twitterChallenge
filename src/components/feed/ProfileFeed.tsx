import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";

const ProfileFeed = () => {
  const { posts, loading } = useGetProfilePosts();

  return (
    <>
      <Feed posts={posts} loading={loading} scrollableTarget="profile_feed" />
    </>
  );
};
export default ProfileFeed;
