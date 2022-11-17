import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CatagriCard from "./CatagriCard";

export default function Catagaries() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <CatagriCard />
    </ScrollView>
  );
}
