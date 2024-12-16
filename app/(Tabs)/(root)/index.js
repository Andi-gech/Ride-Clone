import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind';
import Roundedbuttons from '../../../Components/Roundedbuttons'

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pizza from '../../../assets/pizza.png'
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import * as Location from 'expo-location';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation,router, Link, useLocalSearchParams, Redirect } from 'expo-router';
import SceduleOrderModel from '../../../Components/SceduleOrderModel';

import PrivecyNoticeModel from '../../../Components/PrivecyNoticeModel';
import SocketService from '../../../Components/SocketService';


export default function Home() { 
  

const [opennotice,setopennotice]=useState(true)
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const[nearbydrivers,setnearbydrivers]=useState(null)

useEffect(() => {
  SocketService.connect();

  return () => {
      SocketService.disconnect();
  };
}, []);


const handleGetDriversWithinRadius = () => {
  // Simulate customer getting drivers within radius (replace with actual customer coordinates)

  SocketService.getDriversWithinRadius(location?.coords?.latitude, location?.coords?.longitude, (drivers) => {
  
      setnearbydrivers(drivers);
  });
};
useEffect(() => {

  handleGetDriversWithinRadius();

}, [ location ]);


const navigation=useNavigation()
const toggleDrawer = () => {
  navigation.dispatch(DrawerActions.openDrawer());
};
const [modalVisible, setModalVisible] = useState(false);

 


const closeModal = () => {
  setModalVisible(false);
  
};

useEffect(() => {
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const locationListener = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 1},
      (newLocation) => {
        setLocation(newLocation);
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



const zoomIn = () => {

  let region = {
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  };

  this.mapView.animateToRegion(region, 1000);
}


if(location){
  
      return (
        <View className=" h-full w-full flex  relative">
          <View className="h-full w-full ">
          <MapView   className=" flex-1 w-[100%] h-screen"
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
     
      ref={ref => (this.mapView = ref)}
    
    >
      {/* {
        nearbydrivers?.map((driver, index) => (
          <Marker key={index}  coordinate={{latitude: driver?.latitude, longitude: driver?.longitude}} title={driver?.ID}  >
            <AntDesign name="car" size={24} color="black" />
            </Marker>
        ))
      } */}
    <Marker title={"me"}    coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
    
      onPress={zoomIn}
    >
      <View className="w-[100px] h-[100px]   relative   animate-pulse  rounded-full">
        <View className="w-[100px] h-[100px] absolute top-0 left-0  rounded-full  flex items-center justify-center">
          <View className="w-[10px] h-[10px] rounded-full  animate-pulse bg-black bg-opacity-50"/>
        </View>
        <View className="w-[100px] h-[100px] absolute top-0 left-0 animate-ping rounded-full  flex items-center justify-center">
          <View className="w-[60px] h-[60px] rounded-full bg-black   opacity-20"/>
        </View>
        
      </View>
    </Marker>
    </MapView> 
          </View>
          <View className="absolute px-[20px] w-full h-full flex flex-col items-start justify-between">
          <View className="flex-col w-full flex items-center justify-center ">
          <View className=" my-[30px]  w-full flex flex-row items-center justify-between  ">
            <Roundedbuttons onpress={toggleDrawer} icon={<FontAwesome name="bars" size={24} color="black" />}/>
            <View className="w-[130px] h-[50px] rounded-md  bg-gray-100 shadow-md shadow-black flex items-center justify-center">
              <Text className=" font-semibold">Topup Now</Text>
            </View>
            
          </View>
          <View className="w-full h-[50px] overflow-hidden relative rounded-md mt-3 bg-white shadow-md shadow-black flex flex-row items-center px-2">
          <MaterialCommunityIcons name="food-fork-drink" size={24} color="gray" />
          <Text className=" text-black mx-2 font-bold text-[16px]">Delivery</Text>
     <Image source={pizza} className="absolute h-full w-[100px] top-0 -right-2"  />
          </View>
          </View>
        
          <View className="w-full h-[50px]  rounded-md  flex-row mb-[16px] flex items-center justify-center">
            <TouchableNativeFeedback onPress={()=>router.navigate({ pathname: '/PickDestination'})}>
          <View className=" flex-1 h-full bg-yellow-500 rounded-md flex items-center justify-center">
          <Text className=" font-bold text-base">Order Now</Text>
          </View></TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={()=>setModalVisible(true)}>
          <View className="w-[50px] ml-[2px] h-full bg-yellow-500 rounded-md flex items-center justify-center">
          <Feather name="clock" size={24} color="black" />
          </View>
          </TouchableNativeFeedback>
          </View>
          </View>
          <SceduleOrderModel visible={modalVisible} onClose={closeModal}/>
        
        
      
         <PrivecyNoticeModel opennotice={opennotice} onclose={()=>setopennotice(false)}/>
         
      
        </View>
      )

  }

}

const styles = StyleSheet.create({})