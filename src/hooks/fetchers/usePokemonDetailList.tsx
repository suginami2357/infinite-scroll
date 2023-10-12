import useSWR from "swr";
import { PokemonListResponse } from "../../types/PokemonListResponse";
import { multiFetcher } from "./utils";
import { PokemonDetail } from "../../types/PokemonDetail";
import { PokemonDetailSpecies } from "../../types/PokemonDetailSpecies";

export const usePokemonDetailList = (data: PokemonListResponse | undefined) => {
  const pokemonDetails = useSWR(
    data?.results.map((x) => x.url),
    multiFetcher<PokemonDetail>
  );

  const species = useSWR(
    pokemonDetails.data?.map((x) => x.species.url),
    multiFetcher<PokemonDetailSpecies>
  );

  pokemonDetails.data?.forEach(
    (x) =>
      (x.species.name =
        species.data
          ?.find((y) => y.id === x.id)
          ?.names.find((z) => z.language.name === "ja")?.name || "")
  );

  data?.results.forEach(
    (x) => (x.value = pokemonDetails.data?.find((y) => y.name === x.name))
  );

  return pokemonDetails;
};
