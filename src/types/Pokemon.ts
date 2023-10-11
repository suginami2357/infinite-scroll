import { PokemonDetail } from "./PokemonDetail";

export type Pokemon = {
  name: string;
  url: string;
  value: PokemonDetail | undefined;
};
