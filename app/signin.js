import { Button, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { Navigator, Redirect, router, useNavigation } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import AnimatedLoader from 'react-native-animated-loader';




export default function SignupScreen() {
  const mutationKey = ['Send Otp']
  const { userToken, signIn, signOut, loadToken } = useAuth();

    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const [isChecked, setChecked] = React.useState(false);
    const [phone, setPhone] = React.useState();
    const [error, setError] = React.useState();
 
    const mutation = useMutation({
      mutationKey,
      mutationFn: (newPost) => {
          return axios.post(`http://192.168.1.5:5000/api/user/send-otps`, newPost)
      },
      onSuccess: (data) => {
      router.navigate(
        {
          pathname:'/Verification',
          params: {phone:Number(phone)}
        }
      )
     
     

  
      },
      onError: (error) => {
          console.error('Mutation failed:', error);
          setError(error?.response?.data)
          setInterval(() => {
              setError(null)
          }, 2000);

      }
  });
  const handlesignin = () => {
    mutation.mutate({
        phone: Number(phone)
    })
  }

  
  return (
    <View className=" relative  w-full h-full  flex   bg-white ">
      {mutation.isPending && <View className=" absolute z-30 top-0 right-0 h-full w-full items-center justify-center  ">
      <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>}
  <View className=" flex-1  flex flex-col pt-[30px] ">
    <View className="    mt-4 ml-2 h-[100px] w-full">
    <Text className="text-3xl font-bold text-left ">
        Enter Your Phone Number To Start
        </Text>
    </View>
    <View className="  h-[150px] w-full flex flex-row justify-between items-center  mt-2 mx-2 ">
    <Picker
    mode='dropdown'

style={{height: 50, width: 140,color: 'black',borderWidth: 1,backgroundColor: 'white', borderRadius: 5, borderColor: 'black' }}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item color='black' label="🇪🇹 Eth" value="Ethiopia" />
  <Picker.Item label="EthiopiaScript" value="jss" />
</Picker>
<View className="   h-[90px] ml-[10px] flex flex-1">
    <Text className=" text-[10px] mr-[4px] text-left   ">Phone</Text>
     <TextInput className="  border-b-[1px] h-[50px]  " placeholder="+251" keyboardType='numeric'  onChangeText={setPhone} />
</View>
       
    </View>
    

    <View className="   "></View>
  </View>
  <View className=" flex-1  flex-col items-center justify-end ">
    <View className="flex flex-row mb-3">
    <Checkbox  value={isChecked} onValueChange={setChecked} />
    <Text className="ml-3">I agree to <Text className="pl-[2px] font-bold">Terms And Condition</Text></Text>
    </View>
<TouchableNativeFeedback  onPress={handlesignin}>
<View className="  bg-yellow-400 w-4/5 h-[60px] rounded-lg mb-4 flex items-center justify-center">
   <Text>RequestCode</Text>
  </View>
</TouchableNativeFeedback>
  

  </View>
  </View>
  )
}
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
})
