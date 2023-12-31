import styled from "styled-components";
import { StyledContainer } from "./Container";

export const StyledTransparentBackground = styled(StyledContainer)`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
margin: 0;
z-index: 5;
box-sizing: border-box;
padding: 16px;
`;