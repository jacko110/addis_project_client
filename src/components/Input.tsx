import styled from "styled-components";

export type InputProps = {
    placeholder?: string;
    value?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const StyledTextInput = styled.input`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;

    height: 1.5em;
    
    &:focus {
        outline: none;
        border: 2px solid;
    }
`

export default function Input(props: InputProps) {
    return <StyledTextInput {...props} />
}