import styled from "styled-components";

export type SelectInputOption = {
    text: string;
    value: string;
}

export type SelectInputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectInputOption[]
}

const StyledSelectInput = styled.select`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    
    height: 2em;
    
    &:focus {
        outline: none;
        border: 2px solid;
    }
`

export default function SelectInput(props: SelectInputProps) {
    return <StyledSelectInput value={props.value} onChange={props.onChange}>
        {
            props.options.map((option, idx) => (
                <option value={option.value} key={idx}>{option.text}</option>
            ))
        }
    </StyledSelectInput>
}