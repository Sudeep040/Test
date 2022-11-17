import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon, UserIcon } from "react-native-heroicons/solid";
import { Featured } from "./data";

export default function RestaurentCart() {
  return (
    <>
      {Featured.map((iteam) => (
        <>
          <TouchableOpacity className="mr-4 w-80 h-64 bg-white shadow-green-900">
            <Image
              key={iteam.id}
              source={{
                uri: iteam.imgUrl,
              }}
              className=" w-auto  h-28"
            />
            <View className="p-2">
              <Text className=" font-bold"> {iteam.title}</Text>
              <Text className="  text-zinc-400">
                {" "}
                {iteam.short_description}
              </Text>
              <View className="flex-col space-y-1 ">
                <View className=" flex-row space-x-3 ">
                  <View className="flex-row space-x-1  items-center  bg-green-200 px-2">
                    <StarIcon color="red" opacity={0.6} size={15} />
                    <Text className="text-green-600">{iteam.rating}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <UserIcon color="grey" size={15} />
                    <Text>{iteam.price}</Text>
                  </View>
                </View>
                <Text className=" font-bold text-rose-900 px-2">
                  {iteam.offer}{" "}
                  <Text className=" text-gray-600"> off | Use WELCOME50</Text>
                </Text>
                <View className=" flex-row space-x-2 items-center px-2">
                  <MapPinIcon color="red" opacity={0.6} size={15} />
                  <Text className="   text-gray-600">Nearby</Text>
                  <Text className="   text-gray-600">{iteam.address}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </>
      ))}
    </>
  );
}
