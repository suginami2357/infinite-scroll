import useSWRInfinite from "swr/infinite";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: Pokemon[];
};

export const PokemonList = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: PokemonListResponse | null
  ) => {
    if (previousPageData && !previousPageData.results.length) {
      return null;
    }

    return `https://pokeapi.co/api/v2/pokemon/?offset=${
      pageIndex * 20
    }&limit=20`;
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: rawData,
    error,
    size,
    setSize,
  } = useSWRInfinite<PokemonListResponse>(getKey, fetcher);

  if (!rawData) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラーが発生しました。</div>;
  }
  const data = rawData.flatMap((x) => x.results);

  return (
    <div>
      {data.map((pokemon) => (
        <div key={pokemon.name}>
          <h2>{pokemon.name}</h2>
        </div>
      ))}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
};
