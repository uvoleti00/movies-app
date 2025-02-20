import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import { ScrollView } from "react-native";

const Details = (): ReactNode => {
  const { title, thumbline, popularity, releasedate, overview } =
    useLocalSearchParams() as {
      title: string;
      thumbline: string | null;
      popularity: string;
      releasedate: string;
      overview: string;
    };
  const imageURL = process.env.EXPO_PUBLIC_IMAGE_URL;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation, title]);

  return (
    <ScrollView>
      <Box className=" flex m-10">
        <Center className="gap-10">
          <Heading className="text-center"> {title}</Heading>
          <Image
            size="2xl"
            source={{
              uri: `${imageURL}${thumbline}`,
            }}
            alt={title}
            resizeMode="stretch"
          />
          <Text>{overview}</Text>
          <Text>
            Popularity: {popularity} | Release Date: {releasedate}
          </Text>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default Details;
