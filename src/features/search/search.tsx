import React, { ReactNode, useState } from "react";
import { Option, useFetchData } from "@/src/shared";
import { Box } from "@/components/ui/box";
import { Dropdown, Info } from "@/src/widgets";
import { Text } from "@/components/ui/text";
import { isMovie, isShow, MovieOrShow } from "./types";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { SearchIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";
import { Show } from "../tv-shows";
import { Movie } from "../movies";

export const Search = (): ReactNode => {
  const options: Option[] = [
    { value: "movie", label: "movie" },
    { value: "multi", label: "multi" },
    { value: "tv", label: "tv" },
  ];

  const [queryString, setQueryString] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("multi");
  const [isInValid, setInValidStatus] = useState<boolean>(false);

  const { data, loading, error, fetchData } = useFetchData<MovieOrShow>(
    `search/${searchType}?query=${queryString}&language=en-US&page=1`,
    true,
  );

  const handleValueChange = (value: string): void => {
    setSearchType(value);
  };

  const handleInputValueChange = (value: string): void => {
    setQueryString(value);
    setInValidStatus(false);
  };

  const handleButtonClick = (): void => {
    if (!queryString) {
      setInValidStatus(true);
      return;
    }

    fetchData();
  };

  return (
    <Box className="m-5 gap-3">
      <Box className="m-5 gap-2">
        <Text>
          Search Movie/TV Show Name<Text className="color-red-600">*</Text>
        </Text>
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={isInValid}
          isReadOnly={false}
        >
          <InputSlot className="m-2">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="i.e James Bond,CSI"
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleInputValueChange(e.nativeEvent.text)
            }
          />
        </Input>
        <Text>
          Choose Search Type<Text className="color-red-600">*</Text>
        </Text>
        <HStack space="lg" className="flex-row">
          <Box>
            <Dropdown
              items={options}
              defaultValue="multi"
              onValueChange={handleValueChange}
            />
            <Text className="text-sm">Please select a search type</Text>
          </Box>

          <Button
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleButtonClick}
            className="bg-sky-500"
          >
            <ButtonIcon as={SearchIcon} />
            <ButtonText>Search</ButtonText>
          </Button>
        </HStack>
      </Box>

      {loading && (
        <Center>
          <HStack space="xl">
            <Spinner />
            <Text size="md">Loading..</Text>
          </HStack>
        </Center>
      )}
      {error && <Text>Error Loading...</Text>}
      {!loading && !error && !queryString && !data && (
        <Heading>Please initiate a search</Heading>
      )}
      {!loading &&
        !error &&
        queryString &&
        data &&
        data.results.length === 0 && <Heading>No Records found...</Heading>}

      {!loading && !error && data && data.results.length > 0 && (
        <>
          {isMovie(data) &&
            data.results.map((movie: Movie, index: number) => (
              <Info
                key={index}
                popularity={movie.popularity.toString()}
                releasedate={movie.release_date}
                title={movie.title}
                thumbline={movie.poster_path}
                overview={movie.overview}
              />
            ))}
          {isShow(data) &&
            data.results.map((show: Show, index: number) => (
              <Info
                key={index}
                popularity={show.popularity.toString()}
                releasedate={show.first_air_date}
                title={show.name}
                thumbline={show.poster_path}
                overview={show.overview}
              />
            ))}
        </>
      )}
    </Box>
  );
};
