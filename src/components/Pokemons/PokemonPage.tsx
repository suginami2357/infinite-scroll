import InfiniteScroll from "react-infinite-scroll-component";
import { usePokemonList } from "../../hooks/fetchers/usePokemonList";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { usePokemonDetailList } from "../../hooks/fetchers/usePokemonDetailList";
import { getImageUrl } from "./utils";
import { useState } from "react";

export const PokemonPage = () => {
  const [hasMore, setHasMore] = useState(true);

  const { data: pokemons, size, setSize } = usePokemonList(5, setHasMore);
  usePokemonDetailList(pokemons?.[size - 1]);

  const data = pokemons?.flatMap((x) => x.results);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={() => setSize(size + 1)}
        hasMore={hasMore}
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
              image={
                item.value?.sprites.other["official-artwork"].front_default ||
                getImageUrl(item)
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" textAlign="center">
                {item.value?.species.name || item.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};
