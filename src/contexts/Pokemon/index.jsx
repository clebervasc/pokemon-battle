import React, { createContext, useState } from 'react';
import { capitalize } from '../../utils/functions';
import Confetti from 'react-confetti';
import _ from 'lodash';
import { useWindowSize } from 'react-use';
import { PokemonWinner } from '../../components/Pokemon/style';
const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [loser, setLoser] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [logger, setLogger] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const updatePokemon1 = pokemon => setPokemon1(pokemon);
  const updatePokemon2 = pokemon => setPokemon2(pokemon);
  const updateLogger = (pokemon, move, damage, winner = false) => {
    setShowConfetti(winner);
    setLogger(
      <p>
        <strong className="pokemon-name">{capitalize(pokemon)}</strong> usou{' '}
        <strong>{capitalize(move)}</strong> e causou <strong>{damage}</strong>{' '}
        de dano {winner ? <strong>e é o vencedor!</strong> : '!'}
      </p>,
    );
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon1,
        pokemon2,
        updatePokemon1,
        updatePokemon2,
        currentPlayer,
        setCurrentPlayer,
        loser,
        setLoser,
        animate,
        setAnimate,
        logger,
        updateLogger,
      }}
    >
      {!!showConfetti && (
        <PokemonWinner
          style={{
            width: width / 2,
            height,
            ...(currentPlayer === 1 && { left: '50%' }),
          }}
        >
          <Confetti width={width / 2} height={height} />
        </PokemonWinner>
      )}
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonProvider, PokemonContext };
