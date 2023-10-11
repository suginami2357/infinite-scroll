import { Pokemon } from "../../types/Pokemon";

export const getImageUrl = (pokemon: Pokemon) => {
  const id = pokemon.url.split("/")[6];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
