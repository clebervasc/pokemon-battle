import styled, { keyframes } from 'styled-components';

import pokeball from '../../images/pokeball.svg';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3.125rem;
  margin: 1.25rem;
  z-index: 2;
`;

export const SelectLabel = styled.label`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0.625rem;
  background-color: #fff;
  border-radius: 0.3125rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.625rem;
    width: 0;
    height: 0;
    border: 0.3125rem solid transparent;
    border-top-color: #000;
    transform: translateY(-50%);
  }

  &.loading {
    &:after {
      content: '';
      display: inline-block;
      margin-left: 0.625rem;
      width: 1.25rem;
      height: 1.25rem;
      background-image: url(${pokeball});
      background-size: 100%;
      animation: ${spin} 1s linear infinite;
      border: 0rem solid transparent;
      border-top-color: transparent;
      top: auto;
    }
  }
`;

export const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  &:focus + ${SelectLabel} {
    outline: 0.125rem solid #000;
  }
`;

export const SelectOption = styled.option`
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
`;
