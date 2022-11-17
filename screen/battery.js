import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureScreen } from "react-native-view-shot";
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  PaperAirplaneIcon,
  StopCircleIcon,
} from "react-native-heroicons/outline";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { chargers } from "./kap";
import * as Location from "expo-location";
import { FAB } from "react-native-elements";
import { CameraIcon } from "react-native-heroicons/solid";
import axios from "axios";

export default function Battery() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [current, setcurrent] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [Info, setInfo] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.npoint.io/fb607e670601ac6937fd",
        {
          headers,
        }
      );
      const datas = response.data;
      const list = datas.chargers;
      setInfo(list);
    } catch (error) {
      alert(error.message);
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(Info);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setMapRegion({
  //       longitude: location.coords.longitude,
  //       latitude: location.coords.latitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     });
  //   })();
  // }, []);

  const Navigation = useNavigation();
  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const takeSnapshot = () => {
    captureScreen({
      format: "webm",
      quality: 0.9,
    }).then(
      (uri) => {
        console.log("Image saved to", uri);
        fetch("https://3.7.20.173.8503/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: uri }),
        });
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };

  return (
    <SafeAreaView className="">
      <View>
        <View className="flex-row pt-5 items-center mx-4 space-x-2 absolute top-0 left-0 z-50 ">
          <TouchableOpacity>
            <Bars3Icon color="black" size={30} />
          </TouchableOpacity>

          <View className="flex-row items-center w-auto  space-x-3 px-1 py-3  rounded-xl  bg-black">
            <TouchableOpacity>
              <View className="pl-1">
                <StopCircleIcon
                  color="aqua"
                  size={20}
                  onPress={() => {
                    setcurrent(mapRegion);
                  }}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              className=" text-white  "
              placeholder="Search for the compatible chargers"
              placeholderTextColor={"silver"}
            />
            <View className="mr-1">
              <AdjustmentsHorizontalIcon color="aqua" size={20} />
            </View>
          </View>
        </View>
      </View>
      <MapView
        className=" w-full h-full"
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 12.950236665162736,
          longitude: 77.70414028141417,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {Info.map((ite) => (
          <Marker
            key={ite.id}
            coordinate={{
              latitude: ite.latitude,
              longitude: ite.longitude,
            }}
            title={"hello"}

            //   className=" bg-green-200 w-6 h-7 rounded-full border-red-400"
          >
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "cyan",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{ite.id} </Text>
            </View>
          </Marker>
        ))}

        <Marker
          coordinate={{
            latitude: 12.950236665162736,
            longitude: 77.70414028141417,
          }}
        >
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: "deeppink",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <PaperAirplaneIcon color="white" size={20} />
            </View>
          </View>
        </Marker>
      </MapView>

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: 10, paddingHorizontal: 10 }}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        {Info.map((ite) => (
          <TouchableOpacity>
            <View
              key={ite.id}
              className=" w-fit h-fit px-3 py-3 bg-black mr-3   rounded-xl"
            >
              <Text className=" text-slate-50 pb-1">{ite.Name} </Text>
              <View className="flex-row space-x-1 pb-2">
                <Text className=" text-slate-500 text-xs">{ite.address} </Text>
                <Text className="  text-red-500 text-xs">{ite.distance} </Text>
                <Text className=" text-red-500 text-xs">
                  {ite.distance_metrics}
                </Text>
              </View>
              <Text className=" text-indigo-400 pb-1">
                Supported connection
              </Text>
              <View className="flex-row justify-between">
                <Text className=" text-gray-300 ">
                  {ite.connector_type[0].split("-")[0]}{" "}
                </Text>
                <Text className=" text-gray-300 ">
                  x {ite.connector_type[0].split("-")[1]}{" "}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className=" text-gray-300 ">
                  {ite.connector_type[1].split("-")[0]}{" "}
                </Text>
                <Text className=" text-gray-300 ">
                  x {ite.connector_type[1].split("-")[1]}{" "}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className=" text-gray-300 ">
                  {ite.connector_type[2].split("-")[0]}{" "}
                </Text>
                <Text className=" text-gray-300 ">
                  x {ite.connector_type[2].split("-")[1]}{" "}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        icon={<CameraIcon color="white" size={30} />}
        placement="top"
        buttonStyle={{ backgroundColor: "gray" }}
        onPress={() => takeSnapshot()}
      />
    </SafeAreaView>
  );
}
