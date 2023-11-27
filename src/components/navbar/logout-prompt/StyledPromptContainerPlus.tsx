import styled from "styled-components";
import { StyledPromptContainer } from "./PromptContainer";

export const StyledPromptContainerPlus = styled(StyledPromptContainer)`
    @media (max-width: 600px) {
    position: absolute;
    left: -80%;
    top: -460%;
    }
}
`;
