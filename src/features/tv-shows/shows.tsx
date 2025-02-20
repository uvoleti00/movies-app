import React, { ReactNode, useState } from "react";
import { Option, useFetchData } from "@/src/shared";
import { Box } from "@/components/ui/box";
import { Dropdown, Info } from "@/src/widgets";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Show, ShowResponse } from "./types";

export const Shows = (): ReactNode => {
  const options: Option[] = [
    { value: "airing_today", label: "airing today" },
    { value: "on_the_air", label: "on the air" },
    { value: "popular", label: "popular" },
    { value: "top_rated", label: "top rated" },
  ];

  const [selectedValue, setSelectedValue] = useState<string>("popular");

  const { data, loading, error } = useFetchData<ShowResponse>(
    `tv/${selectedValue}?language=en-US&page=1`,
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
        data.results.map((show: Show, index) => {
          return (
            <Info
              key={index}
              popularity={show.popularity.toString()}
              releasedate={show.first_air_date}
              title={show.name}
              thumbline={show.poster_path}
              overview={show.overview}
            />
          );
        })
      ) : (
        <Text>No data found</Text>
      )}
    </Box>
  );
};
