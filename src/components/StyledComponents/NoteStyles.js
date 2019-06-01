import styled from "styled-components";

export const NoteItem = styled.li`
  list-style: none;
  width: 100%;
`;

export const NoteStyles = styled.div`
  width: 95%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #000;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.02);
  }
`;

export const NoteHeader = styled.h2`
  a {
    color: #000;
    text-decoration: none;
  }
`;
