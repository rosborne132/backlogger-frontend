import styled from "styled-components";

export const Console = styled.li`
  width: 100%;
  display: block;
  padding: 10px;
  border: 1px solid #000;
  background: linear-gradient(to right, white 50%, black 50%);
  background-position:left bottom;
  background-size: 200% 100%;
  transition: all 0.5s ease;

  span {
    display: inline-block;
    padding: 4px;
  }

  span {
    color: #000;
  }

  :hover {
    background-position: right bottom;
    span {
      color: #fff;
    }
  }
`;

export const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;
