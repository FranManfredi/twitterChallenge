import React from "react";
import { Post } from "../../../service";
import { PostModal } from "../../post-modal/PostModal";
import AuthorData from "../../tweet/user-post-data/AuthorData";
import { StyledContainer } from "../../common/Container";
import { StyledP } from "../../common/text";
import { StyledLine } from "../../common/Line";
import TweetBox from "../../tweet-box/TweetBox";
import ImageContainer from "../../tweet/tweet-image/ImageContainer";
import { createPortal } from "react-dom";

interface CommentModalProps {
  post: Post;
  show: boolean;
  onClose: () => void;
}
const CommentModal = ({ post, show, onClose }: CommentModalProps) => {
  return createPortal(
    <PostModal show={show} onClose={onClose}>
      <StyledContainer gap={"16px"}>
        <AuthorData
          id={post.authorId}
          username={post.author?.username ?? " "}
          createdAt={post.createdAt}
          profilePicture={post.author?.profilePicture ?? " "}
        />
        <StyledContainer flexDirection={"row"}>
          <StyledLine />
          <StyledContainer gap={"8px"}>
            <StyledP primary>{post.content}</StyledP>
            {post.images && <ImageContainer images={post.images} />}
          </StyledContainer>
        </StyledContainer>
        <TweetBox parentId={post.id} close={onClose} mobile={false} />
      </StyledContainer>
    </PostModal>,
    document.body
  );
};

export default CommentModal;
