import styled from "styled-components";

export const GameItem = styled.li`
  list-style: none;
  width: 100%;
`

export const GameBody = styled.div`
  height: 400px;
  width: 100%;
  background-color: #000;
`

export const GameStyles = styled.div`
  width: 100%;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.02);
  }
`

export const GameHeader = styled.h2`
  a {
    color: #000;
    text-decoration: none;
  }
`

export const GameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
}
`
export const GameIcons = styled.div`
  display: flex;
  justify-content: space-between;
`