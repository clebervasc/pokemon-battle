// 3rd
import _ from 'lodash';

// api
import * as api from '../configs/api';

//consts
import { effectiveness } from './consts';

export function capitalize(str) {
  const newSrt = str.replace('-', ' ');
  return newSrt.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

function calculateEffectiveness(attackerType, defenderType) {
  return effectiveness[attackerType][defenderType];
}

export function handleMoveClick(
  pokemon,
  move,
  rival,
  updateRival,
  currentPlayer,
  setCurrentPlayer,
  setLoser,
  setAnimate,
  updateLogger,
) {
  const newRival = { ...rival };
  const player = newRival.player === 1 ? 2 : 1;
  const rivalType = newRival.types[0].type.name;
  const effect = calculateEffectiveness(move.type.name, rivalType);
  const audio = url => new Audio(url);
  let id = 0;

  switch (true) {
    case pokemon.id < 10:
      id = `00${pokemon.id}`;
      break;
    case pokemon.id < 100:
      id = `0${pokemon.id}`;
      break;
    default:
      id = pokemon.id;
  }

  const damage = Math.floor(
    ((((2 * 75) / 5 + 2) * move.power) / 1 / 50 + 2) * effect * Math.random(),
  );

  const newHp = newRival.hp - damage > 0 ? newRival.hp - damage : 0;
  newRival.hp = newHp <= 0 ? 0 : newHp;

  updateRival(newRival);
  updateLogger(pokemon.name, move.name, damage);

  if (newHp <= 0) {
    updateLogger(pokemon.name, move.name, damage, true);
    audio(`../../src/utils/cries/pv${id ?? '001'}.wav`).play();
    setLoser(newRival.player);
  }

  if (currentPlayer === player) {
    setAnimate(true);
  }

  if (currentPlayer === 1) {
    setCurrentPlayer(2);
  } else {
    setCurrentPlayer(1);
  }
}

export async function getMoves(pokemon) {
  const movesUrls = _.sampleSize(pokemon.moves, 4).map(move => move.move.url);
  const moves = [];

  while (moves.length < 4) {
    const response = await Promise.all(
      movesUrls.map(url => api.moveByUrl(url)),
    );
    const filteredMoves = response.filter(move => {
      if (move.type.name === pokemon.types[0].type.name) {
        return true;
      }
      if (move.power !== null) {
        return true;
      }
      return false;
    });

    filteredMoves.forEach(move => {
      if (!moves.find(m => m.name === move.name)) {
        moves.push(move);
      }
    });

    if (moves.length < 4) {
      movesUrls.push(_.sample(pokemon.moves).move.url);
    }
  }
  console;
  return moves;
}

export function calculateHpColor(hp) {
  if (hp > 20) {
    return '#4caf50';
  } else if (hp > 5) {
    return '#ffc107';
  } else {
    return '#f44336';
  }
}
