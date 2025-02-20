import React from "react";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";

import { Link } from "expo-router";
import { InfoPropos } from "./types";

export const Info: React.FC<InfoPropos> = ({
  title,
  thumbline,
  popularity,
  releasedate,
  overview,
}) => {
  const imageURL = process.env.EXPO_PUBLIC_IMAGE_URL;
  return (
    <Card variant="filled" size="md">
      <HStack space={"xs"} reversed={false}>
        <Box>
          <Image
            size="xl"
            source={{
              uri: `${imageURL}${thumbline}`,
            }}
            alt={title}
            resizeMode="contain"
          />
        </Box>
        <Box className="flex flex-col flex-1 gap-0 ">
          <Heading size={"md"} className="text-wrap">
            {title}
          </Heading>
          <Text>Popularity: {popularity}</Text>
          <Text>ReleaseDate: {releasedate}</Text>
          <Link
            href={{
              pathname: "/details",
              params: {
                title: title,
                thumbline,
                popularity,
                releasedate,
                overview,
              },
            }}
            className="color-typography-0 bg-sky-500 p-3 block text-center rounded-md "
          >
            More Details
          </Link>
        </Box>
      </HStack>
    </Card>
  );
};
