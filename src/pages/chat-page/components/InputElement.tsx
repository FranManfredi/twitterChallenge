import React, {ChangeEvent, useRef, useState} from "react";
import {InputType, StyledInputContainer} from "./StyledInputContainer";
import {StyledInputElement} from "./StyledInputElement";
import {StyledInputLabel} from "./StyledInputLabel";
import { ChatIcon } from "./Icon";


interface InputElementProps {
    type?: "password" | "text";
    title?: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    name: string;
    value: string;
    inputType: InputType;
    onSubmit?: () => void;
}

const InputElement = ({
    title,
    placeholder,
    required,
    error,
    onChange,
    type = "text",
    id,
    name,
    value,
    inputType,
    onSubmit,
}: InputElementProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <StyledInputContainer
            inputType={inputType}
            onClick={handleClick}
            className={`${error ? "error" : ""}`}
        >
            {title && <StyledInputLabel
                className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
            >
                {title}
            </StyledInputLabel>}
            <StyledInputElement
                type={type}
                required={required}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                id={id}
                name={name}
                value={value}
                ref={inputRef}
                className={`${focus ? "active-div" : ""} ${error ? "error" : ""}`}
            />
            {onSubmit && <ChatIcon onClick={onSubmit}/>}
        </StyledInputContainer>
    );
}

export default InputElement;