import styled, { keyframes, css } from 'styled-components';

// utils
import { theme } from '../../styles/theme';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-0.625rem) rotate(-5deg); }
  50% { transform: translateX(0.625rem) rotate(5deg); }
  75% { transform: translateX(-0.625rem) rotate(-5deg); }
  100% { transform: translateX(0); }
`;

const attackL = keyframes`
  0% {
    left: 0;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 0;
  }
`;

const attackR = keyframes`
  0% {
    right: 0;
  }
  50% {
    right: 50%;
  }
  100% {
    right: 0;
  }
`;

export const PokemonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Pokemon = styled.div`
  width: 50%;
  min-height: 100vh;
  position: relative;
  background-color: ${({ type }) => theme.colors[type]};
  background-image: ${({ type }) => `url(${theme.textures[type]})`};
  background-size: cover;
  background-position: center;
  padding-top: 7.5rem;

  &.defeatedPokemon {
    filter: grayscale(100%);
    cursor: not-allowed;
    pointer-events: none;
  }

  &.loser {
    filter: grayscale(1);
  }

  @media (max-width: 48rem) {
    margin-top: 1.875rem;
  }
`;

export const PokemonImage = styled.img`
  position: relative;
  margin: 0 auto;
  display: block;
  z-index: 2;
  max-width: 100%;

  &.animate-winner {
    animation: ${shake} 1s linear infinite !important;
  }

  ${({ player, currentPlayer, animate }) =>
    animate && player === 2 && currentPlayer === 1
      ? css`
          &.animate-l {
            animation: ${attackR} 0.5s ease-in-out;
          }
        `
      : css`
          &.animate-l {
            animation: ${shake} 1s linear;
          }
        `}

  ${({ player, currentPlayer, animate }) =>
    animate && player === 1 && currentPlayer === 2
      ? css`
          &.animate-r {
            animation: ${attackL} 0.5s ease-in-out;
          }
        `
      : css`
          &.animate-r {
            animation: ${shake} 1s linear;
          }
        `}
`;

export const GlassBlur = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.3125rem);
  z-index: 3;
  position: relative;
  width: 70%;
  @media (max-width: 71.5625rem) {
    width: 100%;
  }

  @media (max-width: 48rem) {
    border-radius: 0 !important;
  }

  min-height: 6.25rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 1.5625rem;
  justify-content: space-between;

  &.pokemon-1 {
    left: 0rem;
    float: left;
    border-radius: 0 6.25rem 6.25rem 0;

    .pokemon-group-name {
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;

      @media (max-width: 48rem) {
        flex-direction: column-reverse;
        align-items: flex-start;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          position: relative;
          margin-left: 0.3125rem;
          display: none;
          @media (max-width: 48rem) {
            display: block;
          }
        }
      }
    }
  }

  &.pokemon-2 {
    right: 0rem;
    float: right;
    border-radius: 6.25rem 0 0 6.25rem;
    flex-direction: row-reverse;

    .pokemon-group-name {
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      flex-direction: row-reverse;

      @media (max-width: 48rem) {
        flex-direction: column-reverse;
        align-items: flex-end;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          position: relative;
          margin-left: 0.3125rem;
          display: none;
          @media (max-width: 48rem) {
            display: block;
          }
        }
      }
    }
  }
`;

export const PokemonInfo = styled.div``;

export const PokemonGroupType = styled.span`
  background-color: ${({ type }) => theme.colors[type]};
  padding: 0.625rem;
  width: 4.6875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  color: white;
  text-align: center;
  justify-content: center;
  border-radius: 1.25rem;
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0.3125rem;
`;

export const PokemonGroupLvl = styled.div`
  width: 4.375rem;
  height: 4.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5b524c;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  flex-direction: column;

  @media (max-width: 48rem) {
    display: none;
  }
`;

export const PokemonWinner = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 10;
`;
