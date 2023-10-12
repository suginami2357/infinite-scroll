import InfiniteScroll from "react-infinite-scroll-component";
import { usePokemonList } from "../../hooks/fetchers/usePokemonList";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { usePokemonDetailList } from "../../hooks/fetchers/usePokemonDetailList";
import { getImageUrl } from "./utils";

export const PokemonPage = () => {
  const { data: pokemons, size, setSize } = usePokemonList(5);
  const { data: pokemonDetails } = usePokemonDetailList(pokemons?.[size - 1]);

  pokemons?.[size - 1]?.results.forEach(
    (x) => (x.value = pokemonDetails?.find((y) => y.name === x.name))
  );
  const data = pokemons?.flatMap((x) => x.results);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <InfiniteScroll
        dataLength={pokemons?.length || 0}
        next={() => setSize(size + 1)}
        hasMore={true}
        loader={<div>読み込み中...</div>}
      >
        {data?.map((item) => (
          <Card
            key={item.name}
            sx={{
              height: 380,
              width: 300,
              margin: 1,
              backgroundColor: "whitesmoke",
            }}
          >
            <CardMedia
              component="img"
              image={getImageUrl(item)}
              // image={
              //   item.value?.sprites.other["official-artwork"].front_default
              // }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                {item.value ? item.value.species.name : item.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};
