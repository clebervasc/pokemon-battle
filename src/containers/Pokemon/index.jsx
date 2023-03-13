import React, { useEffect, useState, useContext } from 'react';

// 3rd
import _ from 'lodash';
import { clsx } from 'clsx';

// api
import * as api from '../../configs/api';

// shared
import {
  GlassBlur,
  Pokemon as PokemonContainer,
  PokemonInfo,
  PokemonGroupLvl,
  PokemonGroupType,
  PokemonImage,
} from '../../components/Pokemon/style';
import {
  SelectWrapper,
  SelectLabel,
  Select,
  SelectOption,
} from '../../components/Select/style';
import { Moves, Move, MoveButton } from '../../components/Moves/style';
import { Hp, HpBar, HpText } from '../../components/HpBar/style';
import { PokemonContext } from '../../contexts/Pokemon';
import { Header } from '../../components/Header';

// utils
import {
  capitalize,
  handleMoveClick,
  calculateHpColor,
  getMoves,
} from '../../utils/functions';
import { typeNames } from '../../utils/consts';
import VictoryAlert from '../../components/Alert';

const Pokemon = ({
  pokemon,
  player,
  setPokemon,
  rival,
  updateRival,
  currentPlayer,
  setCurrentPlayer,
  loser,
  setLoser,
  animate,
  setAnimate,
  logger,
  updateLogger,
}) => {
  const [selectedGenerationIndex, setSelectedGenerationIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  const audio = url => new Audio(url);

  function handleGenerationChange(event) {
    if (event.target.value === '-1') {
      return;
    }
    setPokemon({});
    setSelectedGenerationIndex(Number(event.target.value));
  }

  async function handleSelectChange(event) {
    setLoading(true);
    const selectedPokemonName = event.target.value.toLowerCase();
    const selectedPokemon = await api.pokemonByName(selectedPokemonName);
    selectedPokemon.hp = 100;
    selectedPokemon.player = player;
    const moves = await getMoves(selectedPokemon);

    let id = 0;

    switch (true) {
      case selectedPokemon.id < 10:
        id = `00${selectedPokemon.id}`;
        break;
      case selectedPokemon.id < 100:
        id = `0${selectedPokemon.id}`;
        break;
      default:
        id = selectedPokemon.id;
    }

    selectedPokemon.moves = moves;

    setPokemon(selectedPokemon);
    audio(`../../src/utils/cries/pv${id ?? '001'}.wav`).play();
    setLoading(false);
  }

  useEffect(() => {
    if (selectedGenerationIndex >= 0) {
      setLoading(true);
      async function listAllPokemons() {
        const response = await api.listAll(selectedGenerationIndex || 0);
        setPokemonList(response.results);
        setLoading(false);
      }

      listAllPokemons();
    }
  }, [selectedGenerationIndex]);

  const animateClassNames = clsx({
    'animate-l': currentPlayer === 1,
    'animate-r': currentPlayer === 2,
  });

  return (
    <>
      <PokemonContainer
        type={pokemon?.types?.[0]?.type?.name ?? 'none'}
        className={loser === pokemon.player ? 'loser' : ''}
      >
        {!_.some(pokemon) && (
          <div className="separate">
            <SelectWrapper className="select">
              <SelectLabel
                htmlFor={`generation${player}-select`}
                id={`generation${player}-label`}
                className={loading ? 'loading' : ''}
              >
                {selectedGenerationIndex >= 0
                  ? api.generations[selectedGenerationIndex]?.name
                  : 'Geração'}
              </SelectLabel>
              <Select
                id={`generation${player}-select`}
                value={selectedGenerationIndex}
                onChange={handleGenerationChange}
              >
                <SelectOption value={-1} disabled>
                  Geração
                </SelectOption>
                {api.generations.map((generation, index) => (
                  <SelectOption key={generation.name} value={index}>
                    {generation.name}
                  </SelectOption>
                ))}
              </Select>
            </SelectWrapper>

            {selectedGenerationIndex >= 0 && !loading && !_.some(pokemon) && (
              <SelectWrapper className="select">
                <SelectLabel
                  htmlFor={`pokemon${player}-select`}
                  id={`pokemon${player}-label`}
                >
                  Pokemon {player}
                </SelectLabel>
                {_.some(pokemonList) && (
                  <Select
                    id={`pokemon${player}-select`}
                    onChange={handleSelectChange}
                  >
                    {pokemonList?.map(pokemon => (
                      <SelectOption
                        key={`pokemon${player}-${pokemon.name}`}
                        value={pokemon.id}
                        data={pokemon}
                      >
                        {capitalize(pokemon.name)}
                      </SelectOption>
                    ))}
                  </Select>
                )}
              </SelectWrapper>
            )}
          </div>
        )}

        {_.some(pokemon) && (
          <>
            <PokemonImage
              src={api.pokemonImg(pokemon?.id)}
              alt={pokemon?.name}
              className={
                loser === pokemon.player
                  ? ''
                  : loser
                  ? 'animate-winner'
                  : animateClassNames
              }
              player={player}
              currentPlayer={currentPlayer}
              animate={animate && !loser}
            />
            <GlassBlur className={`pokemon-${player}`}>
              <div style={{ width: '85%' }}>
                <PokemonInfo className="pokemon-group-name">
                  <p className="name">
                    {capitalize(pokemon?.name)} <span className="lvl">75</span>
                  </p>
                  <div style={{ display: 'flex' }}>
                    {pokemon.types.map(type => (
                      <PokemonGroupType
                        type={type.type.name}
                        key={type.type.name}
                      >
                        {capitalize(typeNames[type.type.name])}
                      </PokemonGroupType>
                    ))}
                  </div>
                </PokemonInfo>
                <HpBar className={`hp-${player}`}>
                  <HpText
                    className={`hp-${player}`}
                  >{`HP ${pokemon.hp}/100`}</HpText>
                  <Hp
                    hp={pokemon.hp}
                    className={`hp-${player}`}
                    style={{ backgroundColor: calculateHpColor(pokemon.hp) }}
                  />
                </HpBar>
              </div>
              <PokemonGroupLvl>
                <span>LV</span>
                <span>75</span>
              </PokemonGroupLvl>
            </GlassBlur>
            <Moves>
              {pokemon.moves.map(move => (
                <Move key={move.id}>
                  <MoveButton
                    disabled={
                      !_.some(pokemon) ||
                      !_.some(rival) ||
                      currentPlayer !== pokemon.player ||
                      [1, 2].includes(loser)
                    }
                    onClick={() => {
                      handleMoveClick(
                        pokemon,
                        move,
                        rival,
                        updateRival,
                        currentPlayer,
                        setCurrentPlayer,
                        setLoser,
                        setAnimate,
                        updateLogger,
                      );
                    }}
                  >
                    {capitalize(move.name)}
                  </MoveButton>
                </Move>
              ))}
            </Moves>
          </>
        )}
      </PokemonContainer>
      <Header logger={logger} />
      <VictoryAlert
        pokemonName={loser && pokemon.hp !== 0 ? capitalize(pokemon.name) : ''}
      />
    </>
  );
};

export const PokemonBattleWrapper = () => {
  const {
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
  } = useContext(PokemonContext);

  return (
    <>
      <Pokemon
        player={1}
        pokemon={pokemon1}
        rival={pokemon2}
        setPokemon={updatePokemon1}
        updateRival={updatePokemon2}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        loser={loser}
        setLoser={setLoser}
        animate={animate}
        setAnimate={setAnimate}
        logger={logger}
        updateLogger={updateLogger}
      />
      <Pokemon
        player={2}
        pokemon={pokemon2}
        rival={pokemon1}
        setPokemon={updatePokemon2}
        updateRival={updatePokemon1}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        loser={loser}
        setLoser={setLoser}
        animate={animate}
        setAnimate={setAnimate}
        logger={logger}
        updateLogger={updateLogger}
      />
    </>
  );
};
