import { Dropdown, Info } from "@/src/widgets";
import React, { ReactNode, useState } from "react";
import { Option } from "@/src/shared";
import { useFetchData } from "@/src/shared";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Movie, MovieResponse } from "./types";

export const Movies = (): ReactNode => {
  const options: Option[] = [
    { value: "now_playing", label: "now playing" },
    { value: "popular", label: "popular" },
    { value: "top_rated", label: "top rated" },
    { value: "upcoming", label: "upcoming" },
  ];

  const [selectedValue, setSelectedValue] = useState<string>("popular");

  const { data, loading, error } = useFetchData<MovieResponse>(
    `movie/${selectedValue}?language=en-US&page=1`,
    false,
  );

  const handleValueChange = (value: string): void => {
    setSelectedValue(value);
  };

  return (
    <Box className="pt-4 gap-2">
      <Dropdown
        items={options}
        defaultValue="popular"
        onValueChange={handleValueChange}
        className="ml-16 mr-16"
      />
      {loading ? (
        <Center>
          <HStack space="xl">
            <Spinner />
            <Text size="md">Loading..</Text>
          </HStack>
        </Center>
      ) : error ? (
        <Text> Error loading..</Text>
      ) : data && data.results && data.results.length > 0 ? (
        data.results.map((movie: Movie, index) => {
          return (
            <Info
              key={index}
              popularity={movie.popularity.toString()}
              releasedate={movie.release_date}
              title={movie.title}
              thumbline={movie.poster_path}
              overview={movie.overview}
            />
          );
        })
      ) : (
        <Text>No data found</Text>
      )}
    </Box>
  );
};
