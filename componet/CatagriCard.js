import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Card } from "./data";

export default function CatagriCard() {
  return (
    <>
      {Card.map((item) => (
        <TouchableOpacity key={item.id} className="relative">
          <Image
            source={{ uri: item.imgUrl }}
            className="h-24 w-24 rounded mr-2"
          />
        </TouchableOpacity>
      ))}
    </>
  );
}
