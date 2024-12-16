import { Modal, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Roundedbuttons from '../../../Components/Roundedbuttons'
import { Entypo,AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import UsePlaceNames from '../../../hooks/UsePlaceNames';
import UseSearchPlace from '../../../hooks/UseSearchPlace';
import { useDispatch } from 'react-redux';
import { source,destination} from "../../../Context/Actions/CordinateActions"

export default function PickDestination() {
  const [location, setLocation] = useState(null);
  const [PickupPoint, setPickupPoint] = useState(null);
  const {data,error,isLoading}= UsePlaceNames(location?.coords.latitude,location?.coords.longitude)

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    
    })();
}, []);
const {data:searchdatas,refetch}=UseSearchPlace(PickupPoint)
useEffect(() => {
  refetch();
  console.log(searchdatas?.data.results)
}, [PickupPoint]);
const dispatch = useDispatch()
useEffect(() => {
  dispatch(source({
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    PlaceName: data?.data?.features[0]?.properties?.city||data?.data?.features[0]?.properties?.county||"No Road Name",
    state: data?.data?.features[0]?.properties?.state
}))
},[location])
if (location) {
  console.log(typeof(String(location.coords.latitude)));


  return (

<View className=" w-full h-full flex flex-col items-start justify-start px-4 bg-white">
    <View className="h-[70px] w-full flex flex-row justify-between items-center  ">
        <Roundedbuttons icon={<AntDesign name="close" size={24} color="black" />} onpress={()=>router.back()} />
    </View>
    <View className=" w-full h-[185px] flex flex-col mt-4 justify-between items-center  ">
    <View className="   h-[90px] ml-[10px] w-full flex flex-1 mt-5">
    <Text className=" text-[10px] mr-[4px] text-left text-gray-500  font-semibold  ">Pick-up address</Text>
     <TextInput className="  border-b-[1px] h-[50px]  " value={data?.data?.features[0]?.properties?.city||data?.data?.features[0]?.properties?.county||"No Road Name"} placeholder=""   />
</View>
   <View className="   h-[90px] ml-[10px] w-full flex flex-1 mt-5">
    <Text className=" text-[10px] mr-[4px] text-left text-gray-500  font-semibold  ">Where are you going?</Text>
     <TextInput className="  border-b-[1px] h-[50px]  " placeholder=""  onChange={(e)=>setPickupPoint(e.nativeEvent.text)} />
</View>

    </View>
    <TouchableNativeFeedback onPress={()=>router.navigate({
      pathname: '/MapModal',
    
    })}  >
    <View className="h-[70px] w-full flex flex-row  items-center  ">

<Entypo name="location-pin" size={30} color="black" />
<Text className="ml-1  font-semibold">Set Point On Map </Text>
</View>
    </TouchableNativeFeedback>
    <View className=" w-full flex-1 flex flex-col  items-center  ">
      {searchdatas?.data?.results?.map((item,index)=>{
        return(
          <View key={index} className="h-[30px] w-full flex flex-row  items-center  ">
          <Entypo name="dot-single" size={24} color="black" />
          <Text className="ml-1  text-lg font-base">{item.address_line1} </Text>
        
            </View>
        )
      })}
     
  
      
    </View>
  
</View>

  )
}
}
const styles = StyleSheet.create({})