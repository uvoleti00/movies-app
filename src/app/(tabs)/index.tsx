import { ScrollView } from "react-native";
import { Movies } from "../../features";
import { ReactNode } from "react";

export default function Page(): ReactNode {
  return (
    <ScrollView>
      <Movies />
    </ScrollView>
  );
}
