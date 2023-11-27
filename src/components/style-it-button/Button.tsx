import {
  StyledButton,
  StyledButtonProps,
} from "../style-it-button/StyledButton";

interface ButtonProps extends StyledButtonProps {
  text: string;
  onClick: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  size,
  outlined,
  ghost,
  fulfilled,
  text,
  onClick,
}) => {
  return (
    <StyledButton
      size={size}
      outlined={outlined}
      ghost={ghost}
      fulfilled={fulfilled}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
