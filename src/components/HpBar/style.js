import styled from 'styled-components';

export const HpBar = styled.div`
  position: relative;
  width: 100%;
  height: 1.875rem;
  background-color: rgb(187, 187, 187);
  border-radius: 1.875rem;
  margin-top: 0.625rem;

  &.hp-2 {
    transform: scaleX(-1);
  }
`;

export const HpText = styled.p`
  position: relative;
  text-align: center;
  z-index: 5;
  font-weight: bold;
  color: white;
  font-size: 0.875rem;
  top: 0.4688rem;

  &.hp-2 {
    transform: scaleX(-1);
  }
`;

export const Hp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ hp }) => `${hp}%`};
  background-color: #4caf50;
  border-radius: 1.25rem;
  transition: width 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hp-2 {
    transform: scaleX(-1);
  }
`;
