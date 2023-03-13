const POKEAPI_URL = 'https://pokeapi.co/api/v2';
export const generations = [
  { name: 'Generation I', offset: 0, limit: 151 },
  { name: 'Generation II', offset: 151, limit: 100 },
  { name: 'Generation III', offset: 251, limit: 135 },
  { name: 'Generation IV', offset: 386, limit: 107 },
  { name: 'Generation V', offset: 493, limit: 156 },
  { name: 'Generation VI', offset: 649, limit: 72 },
  { name: 'Generation VII', offset: 721, limit: 88 },
  { name: 'Generation VIII', offset: 809, limit: 89 },
];

export const listAll = (generation = 0) => {
  const { offset, limit } = generations[generation];
  return fetch(`${POKEAPI_URL}/pokemon?offset=${offset}&limit=${limit}`).then(
    response => response.json(),
  );
};
export const pokemonByName = name =>
  fetch(`${POKEAPI_URL}/pokemon/${name}`).then(response => response.json());
export const moveByUrl = moveUrl =>
  fetch(moveUrl).then(response => response.json());
export const moveByName = moveName =>
  fetch(`${POKEAPI_URL}/move/${moveName}`).then(response => response.json());
export const pokemonImg = id => `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png
`;
