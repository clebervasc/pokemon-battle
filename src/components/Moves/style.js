import styled from 'styled-components';

export const Moves = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.3125rem;
  width: 100%;
  position: relative;
  z-index: 4;
  @media (max-width: 48rem) {
    grid-template-columns: repeat(1, 1fr);
    width: 99%;
  }
`;

export const Move = styled.li`
  display: grid;
  grid-template-rows: auto auto;
`;

export const MoveButton = styled.button`
  width: 100%;
  height: 4.3125rem;
  padding: 0.625rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
