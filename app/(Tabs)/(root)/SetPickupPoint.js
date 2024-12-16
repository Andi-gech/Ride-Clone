import {
  FlatList,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
} from "react-native";
import React from "react";
import Roundedbuttons from "../../../Components/Roundedbuttons";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import van from "../../../assets/van.png";
import UseGetRoute from "../../../hooks/UseGetRoute";

export default function SetPickupPoint() {
  const destination = useSelector((state) => state.corrdinate.destination);
  const source = useSelector((state) => state.corrdinate.source);

  const cars = [
    {
      id: 1,
      image: van,
      name: "MIDSIZE 4",
      price: 100,
    },
    {
      id: 2,
      image: van,
      name: "RIDE QUICK",
      price: 200,
    },
    {
      id: 3,
      image: van,
      name: "RIDE CONFY",
      price: 300,
    },
    {
      id: 4,
      image: van,
      name: "RIDE RENT",
      price: 400,
    },
  ];
  const [selectedCar, setSelectedCar] = React.useState(cars[0]);
  const { data, error, isLoading, refetch } = UseGetRoute(
    source?.latitude,
    source?.longitude,
    destination?.latitude,
    destination?.longitude
  );
  const coordinates = data?.data?.features[0]?.geometry?.coordinates[0].map(
    (coord) => ({
      latitude: coord[1],
      longitude: coord[0],
    })
  );
  console.log(data?.data?.features[0].properties.distance);

  return (
    <View className=" w-full h-full flex flex-col items-start justify-start px-4 bg-white">
      <View className="h-[70px] w-full flex flex-row justify-between items-center  ">
        <Roundedbuttons
          icon={<AntDesign name="close" size={24} color="black" />}
          onpress={() => router.back()}
        />
      </View>
      <MapView
        className="w-full  h-[35%]"
        initialRegion={{
          latitude: source?.latitude,
          longitude: source?.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          coordinate={{
            latitude: source?.latitude,
            longitude: source?.longitude,
          }}
          title="Point A"
          description="This is point A"
        >
          <View className="w-[30px] h-[30px] bg-red-500 flex rounded-full items-center justify-center">
            <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
              <Text className="text-white ">A</Text>
            </View>
          </View>
        </Marker>
        <Marker
          coordinate={{
            latitude: destination?.latitude + 0.00043,
            longitude: destination?.longitude,
          }}
          title="Point b"
          description="This is point b"
        >
          <View className="w-[40px] h-[40px]  bg-gray-200 flex rounded-full items-center justify-center">
            <MaterialCommunityIcons name="car" size={34} color="black" />
          </View>
        </Marker>

        <Marker
          coordinate={{
            latitude: destination?.latitude,
            longitude: destination?.longitude,
          }}
          title="Point b"
          description="This is point b"
        >
          <View className="w-[30px] h-[30px] bg-green-500 flex rounded-full items-center justify-center">
            <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
              <Text className="text-white ">B</Text>
            </View>
          </View>
        </Marker>
        {coordinates && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>
      <View className=" h-2/5 w-full flex flex-col  items-center  ">
        <View className="w-full h-[140px] mb-2 shadow-sm shadow-zinc-200 bg-white">
          <View className="w-full h-[70px]  bg-white flex flex-row items-center justify-start pl-3 ">
            <View className=" w-[40px] h-[40px] bg-gray-600 rounded-full flex items-center justify-center">
              <Text className="text-white">A</Text>
            </View>
            <View className=" flex flex-col ml-[30px]">
              <Text className="text-zinc-800 font-base">
                Point A longitude:{source?.PlaceName}
              </Text>
              <Text className="text-zinc-500 font-base">
                latitude:{source?.state}
              </Text>
            </View>
          </View>
          <View className="w-full h-[70px]  bg-white flex flex-row items-center justify-start pl-3 ">
            <View className=" w-[40px] h-[40px] bg-yellow-400 rounded-full flex items-center justify-center">
              <Text className="text-white">B</Text>
            </View>
            <View className=" flex flex-col ml-[30px]">
              <Text className="text-zinc-800 font-base">
                Point A longitude:{destination?.PlaceName}
              </Text>
              <Text className="text-zinc-500 font-base">
                latitude:{destination?.state}
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full h-[100px]  bg-white flex flex-row items-center ">
          <FlatList
            data={cars}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedCar(item);
                }}
              >
                <View
                  className={`  min-w-[120px] px-[10px] mx-2 h-[70px] ${
                    item.id == selectedCar?.id
                      ? " border-2 border-orange-500"
                      : "bg-white"
                  }  rounded-lg  shadow-sm shadow-black bg-white flex flex-row items-center justify-center `}
                >
                  <View className=" w-[60px] h-[60px]  mr-2 rounded-full flex items-center justify-center">
                    <Image source={item.image} className="w-full h-full" />
                  </View>
                  <View className="  rounded-full flex items-center justify-center">
                    <Text className="text-zinc-800 font-base">{item.name}</Text>
                    <Text className="text-zinc-800 font-bold">
                      ~{" "}
                      {(item.price *
                        data?.data?.features[0]?.properties?.distance) /
                        1000}{" "}
                      ETB
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>
        <View className="w-full h-[40px]   flex flex-row  items-center  justify-between">
          <View className="w-[80px] h-[40px]   rounded-full flex flex-row items-center justify-center">
            <AntDesign name="clockcircle" size={24} color="black" />
            <Text className="text-zinc-800 font-base  ml-2">Now</Text>
          </View>
          <View className="w-[80px] h-[40px]   flex flex-row  items-center ">
            <AntDesign name="creditcard" size={24} color="black" />
            <Text className="text-zinc-800 font-base  ml-2">Cash</Text>
          </View>
        </View>
        <TouchableNativeFeedback
          onPress={() =>
            router.navigate({
              pathname: "/Confirm",
              params: {
                car:
                  (selectedCar.price *
                    data?.data?.features[0]?.properties?.distance) /
                  1000,
              },
            })
          }
        >
          <View className="w-[96%] h-[50px] rounded-md  mt-2 bg-yellow-500 flex flex-row  items-center  justify-center">
            <Text className="text-base font-bold">
              Confirm PickupPoint{" "}
              {data?.data?.features[0].properties.distance / 1000} Km
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
