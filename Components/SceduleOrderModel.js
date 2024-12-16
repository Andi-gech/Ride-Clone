import { Modal, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Roundedbuttons from './Roundedbuttons'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickers from './DateTimePiker';

export default function SceduleOrderModel({visible, onClose}) {
  return (
    <Modal visible={visible} animationType="slide" transparent  >
    <View className=" flex-1 flex flex-col items-center justify-end  ">
        <TouchableNativeFeedback  className="h-screen w-screen  opacity-5 "  onPress={onClose} activeOpacity={0.5}>
           <View  className="h-full w-full"></View>
        </TouchableNativeFeedback>
     
      <View className="bg-white h-[40%] w-[99%] shadow-md shadow-black p-[20px] rounded-lg" >
        <View className="flex flex-row w-full  justify-between items-center">
        <TouchableOpacity onPress={onClose}><View className=" flex items-center justify-center w-[100px] h-[50px]"><Text  className=" text-lg  font-bold">
          Order</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={onClose}><View className=" flex items-center justify-center w-[100px] h-[50px]"><Text  className=" text-lg  font-bold">close</Text></View></TouchableOpacity>
        </View>
   
   
    <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-bold">When ??</Text>
    </View>
    <View className="flex flex-row justify-center items-center  flex-1">
      {false && 
    <DateTimePickers/>}
    </View>
  
    <View className=" w-[80%] mx-auto h-[50px]  self-end bg-yellow-400 rounded-md flex items-center justify-center">
      <Text className="text-xl font-bold">Set up Your Order</Text>
    </View>
    
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({})