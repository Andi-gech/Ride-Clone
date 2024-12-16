import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView,{ Marker, Polyline } from 'react-native-maps'
import Roundedbuttons from './Roundedbuttons'
import { FontAwesome,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import van from '../assets/van.png'
import UseGetRoute from '../hooks/UseGetRoute';
import DriverArrived from'./DriverArrived';
import axios from 'axios';





export default function OnOrder({ontoogle}) {
const destination = useSelector(state=>state.corrdinate.destination)

const source=useSelector(state=>state.corrdinate.source)
console.log("destination",destination)
const [coordinates,setCoordinates]=useState(null)
const [newcoordinates,setNewcoordinates]=useState(null)
const [DriverArrives,setDriverArrived]=useState(false)

 const [car, setCars] = useState([
    {
        id:1,
        image:van,
        latitude:source?.latitude+0.003,
        longitude:source?.longitude+0.001
    } ,
    {
        id:2,
        image:van,
        latitude:source?.latitude+0.003,
        longitude:source?.longitude+0.0001
    },
    {
        id:3,
        image:van,
        latitude:source?.latitude-0.001,
        longitude:source?.longitude-0.001

    }
    ,{
        id:4,
        image:van,
        latitude:source?.latitude-0.0401,
        longitude:source?.longitude-0.00001

    }
    ,{
        id:5,
        image:van,
        latitude:source?.latitude + 0.007,
        longitude:source?.longitude +0.007

    }

]
 )
const {data,refetch}=UseGetRoute(source?.latitude,source?.longitude,car[4]?.latitude,car[4]?.longitude)
const {data:RouterData}=UseGetRoute(source?.latitude,source?.longitude,destination?.latitude,destination?.longitude)
useEffect(()=>{
    refetch()
 
},[car[4]?.latitude,car[4]?.longitude])

useEffect(()=>{
    setCoordinates(data?.data?.features[0]?.geometry?.coordinates[0].map(coord => ({
        latitude: coord[1],
        longitude: coord[0]
      })))
},[data])

  
useEffect(()=>{
    setNewcoordinates(RouterData?.data?.features[0]?.geometry?.coordinates[0].map(coord => ({
        latitude: coord[1],
        longitude: coord[0]
      })))
},[RouterData])
useEffect(()=>{
    setTimeout(()=>{
        setDriverArrived(true)
        axios.post('https://app.nativenotify.com/api/notification', 
            {
                appId: 20102,
                appToken: "kuOxw3Bdzg86CJTpNKc76j",
                title: "Ride has arrived",
                body: "Your ride has arrived at your location and will be picked up soon", 
                dateSent: "3-10-2024 5:16PM",
               
            }
        )
    })
})

   
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
        <Marker coordinate={source} >
            <View className="w-[30px] h-[30px] bg-red-500 flex rounded-full items-center justify-center">
                <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
                    <Text className="text-white ">A</Text>
                </View>
            </View>
            </Marker>
            {car.map((item)=>{
                return(
                    <Marker key={item?.id} coordinate={
                        {
                            latitude: item?.latitude,
                            longitude: item?.longitude
                        }
                    } >
             <View className="w-[40px] h-[40px]  bg-gray-200 flex rounded-full items-center justify-center">
               <Image source={item?.image} className="w-2/3 h-2/3" />
           
               </View>
                    </Marker>  
                )
            })}
            {coordinates&&
            <Polyline coordinates={coordinates} strokeColor="#000" strokeWidth={3} />
            }
            {
                newcoordinates&&
                <Polyline coordinates={newcoordinates} strokeColor="red" strokeWidth={3} />
            }
            <Marker coordinate={destination} >
            <View className="w-[30px] h-[30px] bg-green-500 flex rounded-full items-center justify-center">
                <View className=" w-2/3 h-2/3 bg-zinc-700 rounded-full flex items-center justify-center">
                    <Text className="text-white ">B</Text>
                </View>
            </View>
            </Marker>
        </MapView>
    <View className="absolute top-0 right-0  h-full w-full flex flex-col justify-between">
    <View className=" my-[30px]  w-full flex flex-row items-center justify-between  ">
        <Roundedbuttons onpress={ontoogle} icon={<FontAwesome name="bars" size={24} color="black" />}/>
       
        
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
<Text className="text-sm font-bold text-black px-3 py-3 bg-zinc-50">plateNo :</Text>
<Text className="text-sm font-bold text-yellow-400 px-3 py-3 bg-zinc-700 rounded-md">🇪🇹 ET:12345</Text>
                </View>
                    
            </View>
        

          
      </View>
    </View>

     <DriverArrived visible={DriverArrives}/>
    </View>
  )
}

const styles = StyleSheet.create({})