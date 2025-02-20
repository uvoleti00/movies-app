import { Shows } from "@/src/features";
import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

const Page = (): ReactNode => {
  return (
    <ScrollView>
      <Shows />
    </ScrollView>
  );
};

export default Page;
