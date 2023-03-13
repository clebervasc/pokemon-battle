// textures
import grass from '../images/textures/grass_texture.png';
import fire from '../images/textures/fire_texture.png';
import water from '../images/textures/water_texture.png';
import dark from '../images/textures/dark_texture.png';
import electric from '../images/textures/electric_texture.png';
import fairy from '../images/textures/fairy_texture.png';
import dragon from '../images/textures/dragon_texture.png';
import fighting from '../images/textures/fighting_texture.png';
import normal from '../images/textures/colorless_texture.png';
import steel from '../images/textures/steel_texture.png';
import psychic from '../images/textures/psychic_texture.png';

export const theme = {
  colors: {
    none: 'transparent',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#000108',
    fairy: '#EE99AC',
  },
  textures: {
    none: 'transparent',
    normal,
    fighting,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    dragon,
    dark,
    fairy,
    flying: normal,
    poison: psychic,
    ground: normal,
    rock: normal,
    bug: normal,
    ghost: normal,
    ice: normal,
  },
};
