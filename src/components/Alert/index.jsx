import React from 'react';
import _ from 'lodash';
import { Alert } from './style';

export default function VictoryAlert({ pokemonName = '' }) {
  return (
    <>
      {_.some(pokemonName) && (
        <Alert>Parabéns, {pokemonName} venceu a partida!</Alert>
      )}
    </>
  );
}
