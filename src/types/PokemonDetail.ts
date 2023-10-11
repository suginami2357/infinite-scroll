export type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
    name: string;
  };
};
