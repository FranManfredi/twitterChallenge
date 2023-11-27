import styled from "styled-components";
import { StyledTweetModalContainer } from "./TweetModalContainer";

export const StyledChatModalContainer = styled(StyledTweetModalContainer)`
    @media (max-width: 600px) {
        top: -42vh;
        left: -50vw;
    }
`