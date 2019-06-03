import styled from "styled-components";

export const Console = styled.li`
  width: 100%;
  display: block;
  padding: 10px;
  border: 1px solid #000;
  span {
    display: inline-block;
    padding: 4px;
  }

  a {
    color: #000;
  }

  :hover {
    background-color: #000;
    a {
      color: #fff;
    }
  }
`;

export const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;
