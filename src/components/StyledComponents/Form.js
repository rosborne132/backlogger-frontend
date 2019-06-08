import styled from 'styled-components'

export const Form = styled.form`
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px; 
    box-shadow: 2px 2px 1px 2px #000;

    @media only screen and (max-width: 500px) {
        form {
            max-width: 300px;
        }
    }

    @media only screen and (max-width: 400px) {
        form {
            max-width: 175px;
        }
    }
`

export const Fieldset = styled.fieldset`
    max-width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    border: none;
`

export const Legend = styled.legend`
    font-size: 24px;
    font-weight: 700;
`

export const Label = styled.label`
    display: flex;
    font-weight: 600;
`

export const Input = styled.input`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    margin: 8px 0;
    border-radius: 4px;
    cursor: pointer;
`

export const Checkbox = styled.input`
    width: 100%;
    height: 13px;
    margin: 9px 30px;
    flex: 2;
    border: #000 1px solid;
    border-radius: 4px;
    cursor: pointer;
    }
`

export const Textarea = styled.textarea`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    margin: 8px 0;
    border-radius: 4px;
    border: #000 1px solid;
`

export const Select = styled.select`
    width: 100%;
    margin: 8px 0;
    border-radius: 4px;
    background-color: #fff;
    border: #000 1px solid;
`
