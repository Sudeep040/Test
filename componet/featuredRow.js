import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "react-native-heroicons/outline";
import RestaurentCart from "./restaurentCart";

export default function FeaturedRow({ id, title, description }) {
  return (
    <View className="  bg-gray-100">
      <View className=" mt-4 flex-row px-4  justify-between items-center">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="green" />
      </View>
      <Text className=" text-s px-4  mb-2  text-gray-500 ">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}
      >
        {/* Restaurent cart */}
        <RestaurentCart />
      </ScrollView>
    </View>
  );
}
