import { MovieResponse } from "../movies";
import { ShowResponse } from "../tv-shows";

export type MovieOrShow = MovieResponse | ShowResponse;

export const isMovie = (item: MovieOrShow): item is MovieResponse => {
  return (
    (item as MovieResponse).results.length > 0 &&
    (item as MovieResponse).results[0].release_date !== undefined
  );
};

export const isShow = (item: MovieOrShow): item is ShowResponse => {
  return (
    (item as ShowResponse).results.length > 0 &&
    (item as ShowResponse).results[0].first_air_date !== undefined
  );
};
