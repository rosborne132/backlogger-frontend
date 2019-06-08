import styled from 'styled-components'

export const Button = styled.a`
  width: ${props => props.buttonWidth || "100%"};
  padding: 10px;
  display: block;
  border: 1px solid #000;
  text-align: center;

  a {
    color: #000;
    text-decoration: none;
  }

  :hover {
    background-color: #000;
    color: #fff;
    cursor: pointer;
    a {
      color: #fff;
    }
  }
`

export const LinkButton = styled.div`
  width: ${props => props.buttonWidth || "100%"};
  padding: 10px;
  border: 1px solid #000;
  text-align: center;
  color: #000;

  :hover {
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
`

export const FormSubmitButton = styled.button`
  width: ${props => props.buttonWidth || "100%"};
  padding: 10px;
  display: block;
  border: 1px solid #000;

  :hover {
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    width: 100%
  };
`

export const ListButton = styled.div`
  width: 95%;
  border: 1px solid #000;
  text-align: center;
  display: block;
  margin: 10px 0;
  :hover {
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
  a {
    display:inline-block;
    width:100%;
    height:100%;
    padding: 10px 0;
    color: #000;
    text-decoration: none;

    :hover {
      background-color: #000;
      color: #fff;
      
    }
  }
`
