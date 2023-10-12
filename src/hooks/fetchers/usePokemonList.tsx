import useSWRInfinite from "swr/infinite";
import { PokemonListResponse } from "../../types/PokemonListResponse";
import { fetcher } from "./utils";

export const usePokemonList = (pageSize: number) => {
  const getKey = (
    pageIndex: number,
    previousPageData: PokemonListResponse | null
  ) => {
    if (previousPageData && !previousPageData.results.length) {
      return null;
    }

    return `https://pokeapi.co/api/v2/pokemon/?offset=${
      pageIndex * pageSize
    }&limit=${pageSize}`;
  };

  return useSWRInfinite<PokemonListResponse>(getKey, fetcher);
};
