import useSWR from "swr";
import { PokemonListResponse } from "../../types/PokemonListResponse";
import { multiFetcher } from "./utils";
import { PokemonDetail } from "../../types/PokemonDetail";
import { PokemonDetailSpecies } from "../../types/PokemonDetailSpecies";

export const usePokemonDetailList = (
  data: PokemonListResponse[] | undefined
) => {
  const pokemonDetails = useSWR(
    data?.flatMap((x) => x.results).map((x) => x.url),
    multiFetcher<PokemonDetail>
  );

  const species = useSWR(
    pokemonDetails.data?.map((x) => x.species.url),
    multiFetcher<PokemonDetailSpecies>
  );

  console.log(pokemonDetails.data?.map((x) => x.species.url));

  pokemonDetails.data?.forEach(
    (x) =>
      (x.species.name =
        species.data
          ?.find((y) => y.id === x.id)
          ?.names.find((z) => z.language.name === "ja")?.name || "")
  );

  return pokemonDetails;
};