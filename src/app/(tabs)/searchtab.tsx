import { Search } from "@/src/features";
import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

const Page = (): ReactNode => {
  return (
    <ScrollView>
      <Search />
    </ScrollView>
  );
};

export default Page;
