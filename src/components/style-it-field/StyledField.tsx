import { Field } from "formik";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
// Replace with the actual import for your Field component

interface StyledInputElementProps {
  outlined?: boolean;
  fulfilled?: boolean;
  ghost?: boolean;
  white?: boolean;
  size: "small" | "medium" | "large";
}

interface InputSizeStyles {
  small: FlattenSimpleInterpolation;
  medium: FlattenSimpleInterpolation;
  large: FlattenSimpleInterpolation;
}

const inputVariantStyles = {
  outlined: css`
    border: 2px solid #3498db;
    color: #3498db;
    background-color: transparent;
  `,
  fulfilled: css`
    border: 2px solid #27ae60;
    color: #27ae60;
    background-color: transparent;
  `,
  ghost: css`
    border: none;
    color: #ffffff;
    background-color: transparent;
  `,
  white: css`
    border: 2px solid #ffffff;
    color: #ffffff;
    background-color: transparent;
  `,
};

const inputSizeStyles: InputSizeStyles = {
  small: css`
    font-size: 14px;
  `,
  medium: css`
    font-size: 16px;
  `,
  large: css`
    font-size: 18px;
  `,
};

export const StyledInputElement = styled(Field)<StyledInputElementProps>`
  font-size: 16px;
  border: none;
  outline: none;
  background: none;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ outlined, fulfilled, ghost, white }) => {
    let styles: FlattenSimpleInterpolation[] = [];

    if (outlined) styles.push(inputVariantStyles.outlined);
    if (fulfilled) styles.push(inputVariantStyles.fulfilled);
    if (ghost) styles.push(inputVariantStyles.ghost);
    if (white) styles.push(inputVariantStyles.white);

    return styles;
  }}

  ${({ size }: StyledInputElementProps) => inputSizeStyles[size]}
`;
