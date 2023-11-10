import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export interface StyledButtonProps {
  size: string;
  outlined: boolean;
  ghost: boolean;
  fulfilled: boolean;
}

interface ButtonSizeStyles {
  [key: string]: FlattenSimpleInterpolation;
}

const buttonVariantStyles = {
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
};

const buttonSizeStyles: ButtonSizeStyles = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  medium: css`
    padding: 10px 20px;
    font-size: 16px;
  `,
  large: css`
    padding: 12px 24px;
    font-size: 18px;
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  ${({ outlined, fulfilled, ghost }) => {
    if (outlined) return buttonVariantStyles.outlined;
    if (fulfilled) return buttonVariantStyles.fulfilled;
    if (ghost) return buttonVariantStyles.ghost;
    return ''; // Provide a default style or handle accordingly
  }}

  ${({ size }) => buttonSizeStyles[size]}

  &:hover,
  &:active {
    background-color: #34495e;
    color: #ffffff;
    border-color: #34495e;
  }
`;