import { Pokemon } from "../../types/Pokemon";

export const getImageUrl = (pokemon: Pokemon) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
    pokemon.url.split("/")[6]
  }.png`;
};
