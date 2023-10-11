import InfiniteScroll from "react-infinite-scroll-component";
import { usePokemonList } from "../../hooks/fetchers/usePokemonList";
import { Button, Card } from "@nextui-org/react";
import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { getImageUrl } from "./utils";

export const PokemonPage = () => {
  const { data, error, size, setSize } = usePokemonList();

  if (error) {
    return <div>エラーが発生しました。</div>;
  }
  const flatData = data?.flatMap((x) => x.results) || [];

  return (
    <InfiniteScroll
      dataLength={flatData.length}
      next={() => setSize(size + 1)}
      hasMore={true}
      loader={<div>読み込み中...</div>}
    >
      {flatData.map((pokemon) => (
        <Card>
          <CardMedia
            component="img"
            sx={{ objectFit: "cover", height: "50%" }}
            image={getImageUrl(pokemon)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
          </CardContent>
        </Card>
      ))}
    </InfiniteScroll>
  );

  // return (
  //   <InfiniteScroll
  //     dataLength={flatData.length}
  //     next={() => setSize(size + 1)}
  //     hasMore={true}
  //     loader={<div>読み込み中...</div>}
  //   >
  //     {flatData.map((pokemon) => (
  //       <div key={pokemon.name}>
  //         <img src={getImageUrl(pokemon)} alt={pokemon.name} />
  //       </div>
  //     ))}
  //   </InfiniteScroll>
  // );
};
