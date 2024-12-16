import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, useNavigation } from 'expo-router';
import Roundedbuttons from '../../../Components/Roundedbuttons';
import { EvilIcons,FontAwesome5 } from '@expo/vector-icons';

export default function Orders() {
    const navigation=useNavigation()
    const goBack = () => {
     
        navigation.goBack();
      };
      
  return (
   <View className="w-full h-full">
      <View className="w-full  px-[20px]">
      <View className=" h-[100px] w-full  flex flex-row  items-center justify-between">
    
<Roundedbuttons icon={<EvilIcons name="close" size={24} color="black" onPress={()=>navigation.goBack()} />} />
<Text className="mr-4 font-semibold ">About</Text>
      </View>
      </View>
      <View className=" py-[1px] w-full  flex   justify-center h-[500px]  flex-col items-center"><FontAwesome5 name="images" size={34} color="gray" />
      <Text>No Orders Yet</Text></View>
   </View>
  )
}

const styles = StyleSheet.create({})