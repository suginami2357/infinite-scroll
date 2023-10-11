import useSWRInfinite from "swr/infinite";
import { PokemonListResponse } from "../../types/PokemonListResponse";
import { fetcher } from "./utils";

const getKey = (
  pageIndex: number,
  previousPageData: PokemonListResponse | null
) => {
  if (previousPageData && !previousPageData.results.length) {
    return null;
  }

  return `https://pokeapi.co/api/v2/pokemon/?offset=${pageIndex * 20}&limit=20`;
};

export const usePokemonList = () => {
  return useSWRInfinite<PokemonListResponse>(getKey, fetcher);
};