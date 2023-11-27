import React from "react";
import { StyledInputElement } from "./StyledField"; // Replace with the actual path
interface MyInputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  size: "small" | "medium" | "large";
}

const MyInputField: React.FC<MyInputFieldProps> = (props) => {
  return <StyledInputElement {...props} />;
};

export default MyInputField;
