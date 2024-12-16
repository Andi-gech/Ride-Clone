import {  StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView,{ Marker, Polyline } from 'react-native-maps'
import Roundedbuttons from '../../../Components/Roundedbuttons'
import { FontAwesome,AntDesign } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import GetMyOrders from '../../../hooks/UseGetMe';
import AnimatedLoader from 'react-native-animated-loader';
import SocketService from '../../../Components/SocketService';
import * as Location from 'expo-location';
import UseGetDriver from '../../../hooks/UseGetDriver';




export default function OnOrder() {
const destination = useSelector(state=>state.corrdinate.destination)

const source=useSelector(state=>state.corrdinate.source)
const [errorMsg, setErrorMsg] = useState(null);
const [driverlocation, setDriverlocation] = useState(null);
const [currentLocation, setCurrentLocation] = useState(null);
const { data:orders,isLoading}=GetMyOrders()
useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      const locationListener = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10},
        (newLocation) => {
      setCurrentLocation(newLocation);
        }
      );
    
  
      return () => {
        if (locationListener) {
          locationListener.remove();
        }
      };
    };
  
    getLocation();
  }, []);
 
 SocketService.getDriversWithinRadius(currentLocation?.coords?.latitude, currentLocation?.coords?.longitude, (drivers) => {
   setDriverlocation("filterd",drivers.find(driver=>driver._id===orders?.data?.driver))

 })
 const findRideStatus=()=>{
     SocketService.GetRideStatus(orders?._id,currentLocation?.coords?.latitude,currentLocation?.coords?.longitude,(rideStatus)=>{
         console.log(rideStatus)
     })
 }
   
 useEffect(() => {
    findRideStatus()
 }, [orders]);

  

  
const {data:driver}=UseGetDriver(orders?.data?.driver)



   if(isLoading){
    return <View className="flex-1 items-center justify-center bg-red-200">
    <AnimatedLoader
    visible={true}
    overlayColor="rgba(255,255,255,0.75)"
    
    animationStyle={styles.lottie}
    speed={1}/>
    </View>
   }
   else{
  return (
    <View className="flex-1 h-screen w-screen  items-start justify-center bg-white">
    <MapView className="w-full h-full" 
    initialRegion={{
      latitude: source?.latitude,
      longitude: source?.longitude,
      latitudeDelta: 0.0062,
      longitudeDelta: 0.0061
    }}
    >
       
      
            
           
            
              
           
        </MapView>
    <View className="absolute top-0 right-0  h-full w-full flex flex-col justify-between">
    <View className=" my-[30px]  w-full flex flex-row items-center justify-between  ">
        <Roundedbuttons  icon={<FontAwesome name="bars" size={24} color="black" />}/>
       
        
      </View>
      
 <View className=" h-[250px] w-full  flex flex-col items-center px-3 py-3 justify-start bg-white">
 <View className="w-full   flex flex-row justify-between ">
     <View className="flex w-full items-center justify-center">
         <Text className="text-2xl font-bold text-black">Driver Is On The Way</Text>
     </View>
     </View>

 <View className="w-full   flex flex-row justify-between ">
     <View className="flex items-center justify-center">
         <Text className="text-lg font-bold text-black">Driver Estimated Time</Text>
     </View>
     <View className="flex items-center justify-center px-5">
         <Text className="text-sm font-bold text-blqck">5 min</Text>
     </View>
 </View>

 <View className ="w-full  mt-[20px]  flex flex-row justify-between ">
       <View className="flex items-center justify-center  w-[100px]  py-2 bg-yellow-100 flex-row">
       <Text className="text-sm  text-black">Call</Text>
         <AntDesign name='phone' size={18} color="black" />
       
         </View>
         
         <View className=" flex items-center justify-center flex-row">
<Text className="text-sm font-bold text-black px-3 py-3 bg-zinc-50">plateNo :{driver?.data?.plateNo}</Text>
<Text className="text-sm font-bold text-yellow-400 px-3 py-3 bg-zinc-700 rounded-md">🇪🇹 ET:</Text>
         </View>
             
     </View>
 

   
</View>
      
     
    </View>

 
    </View>
  )
  }
}

const styles = StyleSheet.create({
    loadingContainer: {
        width: 100,
        height: 100,
    }
})