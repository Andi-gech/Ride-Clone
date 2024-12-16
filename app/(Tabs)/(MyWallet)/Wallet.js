import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Roundedbuttons from '../../../Components/Roundedbuttons'
import { EvilIcons,AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
export default function Wallet() {
  const navigation=useNavigation()
  return (
    <View className="w-full h-full px-[20px]">
      <View className=" h-[100px] w-full  flex flex-row  items-center justify-between">
    
<Roundedbuttons icon={<EvilIcons name="close" size={24} color="black" onPress={()=>navigation.goBack()} />} />
<Text className="mr-4 font-semibold ">About</Text>
      </View>
      <View className=" py-[1px] w-full  flex flex-row items-center">
        <Text className="font-bold text-2xl">Wallet</Text>
      </View>
      <View className=" py-[1px] w-full  flex flex-col i h-[200px] mt-3 bg-zinc-800 rounded-md">
        <View className=" w-full   "><Text className="text-sm font-bold text-zinc-500 ml-2">Ride Ethiopia</Text></View>
        <View className=" w-full  mt-2 "><Text className="text-4xl font-bold text-zinc-100 ml-2">0.00</Text></View>
      </View>
      <View className=" py-4 w-full  flex flex-col items-center mt-3">
        <View className=" w-full  mt-5 shadow-sm shadow-zinc-500   bg-white py-3  "><Text className="text-sm font-bold text-zinc-500 ml-2">Payment Methods</Text></View>
        <View className=" w-full  mt-5 shadow-sm shadow-zinc-500   bg-white py-3  "><Text className="text-sm font-bold text-zinc-500 ml-2">Default Method</Text></View>
        <View className=" w-full  mt-5 shadow-sm shadow-zinc-500   bg-white py-3  "><Text className="text-sm font-bold text-zinc-500 ml-2">Transactions</Text></View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({})