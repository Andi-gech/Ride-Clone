import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Roundedbuttons from '../Components/Roundedbuttons'
import { AntDesign } from '@expo/vector-icons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';

export default function Verification() {
  const{phone}=useLocalSearchParams()
  console.log(typeof(phone))
  const mutationKey = ['Send Otp']
  const {signIn}=useAuth()
  const mutation = useMutation(
    {
      mutationKey,
      mutationFn: (newPost) => {
          return axios.post(`http://192.168.1.5:5000/api/user/verify-otp`, newPost)
      },
      onSuccess: (data) => {
        console.log(data.data)
        signIn(data.data.token)
   router.navigate({
    pathname: '/'
   })

     
     

  
      },
      onError: (error) => {
          console.error('Mutation failed:', error?.response.data);
          setError(error?.response?.data)
          setInterval(() => {
              setError(null)
          }, 2000);

      }
  }
  )
  const [error, setError] = React.useState();
  const [otp, setOtp] = React.useState();
  const verfy = () => {
    console.log(typeof(Number(otp)))
    console.log(typeof(phone))
    mutation.mutate({phone:Number(phone),otp:Number(otp)})
    

  }
  console.log(phone)
  
  return (
    <View className=" w-full h-full  pl-[20px] mt-[20px] bg-white  pr-[20px]">
        <View className="  flex-1 flex ">
            <View className="w-full h-[80px] flex flex-row justify-between mr-4 items-center ">
              
                <Roundedbuttons icon={<AntDesign name="arrowleft" size={32} color="black" />} onpress={()=>router.replace('/')}/>
                <Text className=" text-xl ">Try Again in <Text className=" font-bold">14 min 44 sec</Text></Text>
            </View>
            <View>
                <Text className="text-2xl font-bold">Code Sent Via SMS,Telegram To <Text className=" text-yellow-600">{'+25193205538'}</Text></Text>
                <View className="flex flex-row items-center">
                <TextInput onChangeText={setOtp} className=" w-[200px]  border-b-2 mt-[50px] h-[50px]" placeholder='Code Here'/>
               <TouchableOpacity onPress={verfy}>
               <View className=" mt-[50px]   h-[50px] w-[50px] flex items-center justify-center">
                <AntDesign name="rightcircleo" size={34} color="gray" />
                </View>
               </TouchableOpacity>
               
               
               
                </View>
        
            </View>

        </View>
 
    </View>
  )
}

