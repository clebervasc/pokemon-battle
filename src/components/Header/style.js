import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: absolute;
  padding: 0.625rem;
  width: 100%;
  border-bottom: 0.0625rem solid white;
  display: flex;
  align-items: center;
  justify-content: ${({ logger }) => (!logger ? 'center' : 'space-between')};
  z-index: 999;
  background: #ffffff21;

  @media (max-width: 48rem) {
    background: rgb(0 0 0);
    flex-direction: column;
  }

  img {
    width: 100%;
    max-width: 7.5rem;
  }

  p {
    @media (max-width: 48rem) {
      color: white;
      padding: 0.625rem;
      text-align: center;
    }
  }
`;

export const HeaderButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 0.625rem;
  padding: 0.625rem 1.25rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e90606;
  }

  &:focus {
    outline: none;
  }

  img {
    margin-right: 0.3125rem;
    transform: rotate(-180deg);
    width: 1.875rem;
  }
`;
