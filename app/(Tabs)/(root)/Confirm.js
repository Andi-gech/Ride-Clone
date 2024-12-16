import { StyleSheet, Text, View,TouchableNativeFeedback } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker, Polyline,l } from 'react-native-maps'
import Roundedbuttons from '../../../Components/Roundedbuttons'
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import UseGetRoute from '../../../hooks/UseGetRoute';
import UseRequestRide from '../../../hooks/UseRequestRide';


export default function Confirm() {
  const destination = useSelector(state=>state.corrdinate.destination)
  const source = useSelector(state=>state.corrdinate.source)
  const {data}=UseGetRoute(source?.latitude,source?.longitude,destination?.latitude,destination?.longitude)
  const coordinates = data?.data?.features[0]?.geometry?.coordinates[0].map(coord => ({
    latitude: coord[1],
    longitude: coord[0]
  }));
 
  const {car}=useLocalSearchParams();
  const {mutate,isPending,data:sed,isSuccess,isError,error}=UseRequestRide()
  const handleconfirm=()=>{
    mutate({
    
      user:'65fa26bc820db967b87fc138',
      startLocation: {
          latitude: source.latitude,
          longitude: source.longitude
      },
      endLocation: {
          latitude: destination.latitude,
          longitude: destination.longitude
      },
    State:"REQUESTED",
    })
    if(isSuccess){
      console.log("data",sed)

      router.push('/seeride')
    }
 
  }
  console.log("error",error?.message)





  
  
  
  return (
    <View className=" relative w-full h-full   bg-white">
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.83)',' rgba(255, 255, 255, 0.60) ', 'rgba(255, 255, 255, 0.13)']}
        className="absolute z-30 w-full top-0 right-0 h-[200px]"
       
      ></LinearGradient>
        <MapView className="w-full h-full" initialRegion={{...source,latitudeDelta:0.001,longitudeDelta:0.001}}>
          <Marker coordinate={{
            latitude:source.latitude,
            longitude:source.longitude
          }}>
 <View className="w-[30px] h-[30px] bg-red-500 flex rounded-full items-center justify-center">
        <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
        <Text className="text-white ">A</Text>
        </View>
       </View>
          </Marker>
          <Polyline coordinates={coordinates} strokeColor="#000" strokeWidth={3} />
          <Marker coordinate={{
            latitude:destination.latitude,
            longitude:destination.longitude
          }}>
            <View className="w-[30px] h-[30px] bg-green-500 flex rounded-full items-center justify-center">
        <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
        <Text className="text-white ">B</Text>
        </View>
       </View>
          </Marker>
          </MapView>
        
 
        <View className=" absolute  top-0  right-0 w-full h-full flex flex-col items-center justify-between">
        <View className="w-full z-40">
        <View className="h-[70px] w-full  flex flex-row justify-between items-center   z-40 " >
        <Roundedbuttons icon={<AntDesign name="close" size={24} color="black" />}  onpress={()=>router.back()} />

    </View>
    <Text className="text-2xl font-bold text-center mt-4">{destination.PlaceName}</Text>
    <Text className="text-sm font-bold text-center mt-4">{destination.state}</Text>
        </View>
     
<TouchableNativeFeedback onPress={
  handleconfirm
 

}>
    <View className=" w-[90%] rounded-md h-[50px] flex flex-row mt-4 px-7 justify-between  items-center bg-yellow-500  mb-3 ">
      <Text className="font-bold text-lg"> Confirm Order</Text>
      <Text className="font-bold text-lg">~{car}birr</Text>
</View>
</TouchableNativeFeedback>
</View>


     
    </View>
  )
}

const styles = StyleSheet.create({})