import styled from 'styled-components'

type ButtonProps = {
    text?: string,
    color?: string,
    backgroundColor?: string,
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void,
}

const StyledButton = styled.button<ButtonProps>`
    float:right;
    background-color: ${(props: ButtonProps)=> props.backgroundColor || 'green'};
    color: ${(props: ButtonProps)=> props.color || 'white'};
    
    &:hover {
        background-color: ${(props: ButtonProps) => props.color || 'white'};
        color: ${(props: ButtonProps) => props.backgroundColor || 'green'};
    }

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-style:hidden;
    border-radius: 3px;
`

export default function Button(props: ButtonProps) {

    return (
        <StyledButton onClick={props.onClick} {...props} >
            { props.text }
        </StyledButton>
    )
}