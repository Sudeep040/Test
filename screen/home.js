import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Catagaries from "../componet/catagaries";
import FeaturedRow from "../componet/featuredRow";
import FeaturedOffer from "../componet/featuredOffer";
import FeaturedDiscount from "../componet/featuredDiscount";

export default function Home() {
  const Navigation = useNavigation();
  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      {/* header */}
      <View className="flex-row pt-3 items-center mx-4 space-x-2  ">
        <Image
          source={{
            uri: "https://www.pngitem.com/pimgs/m/3-37779_transparent-delivery-png-delivery-boy-with-bike-png.png",
          }}
          className="h-12 w-12 mb-2    bg-slate-300 rounded-3xl"
        />
        <View className="flex-1">
          <Text className="font-medium text-gray-500 text-xs">Delvery now</Text>
          <Text className="font-bold  text-xl flex-1 align-baseline">
            Current Location
            <ChevronDownIcon color="green" size={20} />
          </Text>
        </View>

        <UserIcon color="green" size={30} />
      </View>
      {/* search */}
      <View className="flex-row  items-center  space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2  py-1 flex-1 bg-slate-200  items-center   ">
          <MagnifyingGlassIcon color="green" size={20} />
          <TextInput placeholder="Search" keyboardType="default" />
        </View>
        <AdjustmentsVerticalIcon color="green" size={20} />
      </View>
      {/* body */}
      <ScrollView
        className=" bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* catagarious */}
        <Catagaries />

        {/* featured rows */}
        <FeaturedRow
          title="Featured"
          description="Paid placement from our partners"
          FeaturedCatrgory="Featured"
        />
        {/* Tasty Discount*/}
        <FeaturedDiscount
          title="Tasty Disount"
          description="everyone being enjoying tasty discount"
          FeaturedCatrgory="Discount"
        />
        {/* Offer near you */}
        <FeaturedOffer
          title="Offered near you!"
          description="why not support your local restaurent to night"
          FeaturedCatrgory="Offer"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
