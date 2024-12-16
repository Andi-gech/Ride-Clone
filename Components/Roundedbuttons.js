import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'

export default function Roundedbuttons({icon,onpress,isgray}) {
  return (
    <TouchableNativeFeedback className="rounded-full " onPress={onpress}>
       <View className={` rounded-full  ${isgray?'bg-gray-800':'bg-white'} bg-white shadow-sm shadow-black flex items-center justify-center w-[47px] h-[47px] `}>
{icon}
     
    </View>
    </TouchableNativeFeedback>
   
  )
}

