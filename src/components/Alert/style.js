import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Alert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #008000d9;
  z-index: 99;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
