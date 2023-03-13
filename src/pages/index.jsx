import React from 'react';

// containers
import { PokemonBattleWrapper } from '../containers/Pokemon';

// contexts
import { PokemonProvider, PokemonContext } from '../contexts/Pokemon';

// shared
import { PokemonContainer } from '../components/Pokemon/style';

// assets
import pokeBall from '../images/pokeball-bg.png';

export default function App() {
  return (
    <PokemonProvider>
      <div className="container">
        <PokemonContainer>
          <img
            src={pokeBall}
            alt="VS"
            style={{
              width: '10.3125rem',
              position: 'absolute',
              top: '50%',
              left: '49.5%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
          <PokemonBattleWrapper />
        </PokemonContainer>
      </div>
    </PokemonProvider>
  );
}
