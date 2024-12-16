import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EvilIcons,AntDesign } from '@expo/vector-icons';
import Roundedbuttons from '../../../Components/Roundedbuttons'
import { Picker } from '@react-native-picker/picker';
import { router, useNavigation } from 'expo-router';
import { useAuth } from '../../../Context/AuthProvider';
export default function profile() {
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const navigation=useNavigation()
  const{signOut}=useAuth()
  const handleSignout=()=>{

    signOut()

  }
  
  return (
    <View className=" w-full h-full  px-[15px]   ">
      <View className=" h-[100px] w-full  flex flex-row  items-center justify-between">
<Roundedbuttons icon={<EvilIcons name="close" size={24} color="black" onPress={()=>navigation.goBack()} />} />
<Text className="mr-4 font-semibold ">Save</Text>
      </View>
      <View className=" py-4 w-full  flex flex-row items-center">
        <Roundedbuttons icon={<AntDesign name="user" size={24} color="black" />} isgray={true}/>
        <Text className="ml-[10px] font-semibold text-lg">Add a Photo</Text>

      </View>
      <View className="flex flex-row   mt-5 items-center ">
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

<View className="   h-[50px] ml-[10px] flex flex-1  flex-col  justify-between ">
    <Text className=" text-[10px] mr-[4px] text-left   ">Phone</Text>
     <TextInput className="  border-b-[1px]" placeholder="+251" keyboardType='numeric' />
</View>

      </View>
      <View className="flex flex-row   mt-5 items-center  h-[64px] ">
      <View className="   h-[50px] ml-[10px] flex flex-1  flex-col  justify-between ">
    <Text className=" text-[10px] mr-[4px] text-left   ">Name</Text>
     <TextInput className="  border-b-[1px]" placeholder="+251" keyboardType='numeric' />
</View>
      </View>
      <View className="flex flex-row   mt-5 items-center  h-[64px] ">
      <View className="   h-[50px] ml-[10px] flex flex-1  flex-col  justify-between ">

     <TextInput className="  border-b-[1px]" placeholder="Email" keyboardType='numeric' />
</View>
      </View>
      <View className="flex flex-col    bg-zinc-300  bg-opacity-5 h-[164px] ">
      <Text className="  text-sm font-semibold mb-[10px] ">Emergency Contact number(SOS Button) </Text>
      <View className="flex flex-row   mt-5 items-center ">
      
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

<View className="   h-[50px] ml-[10px] flex flex-1  flex-col  justify-between ">
    <Text className=" text-[10px] mr-[4px] text-left   ">Phone</Text>
     <TextInput className="  border-b-[1px]" placeholder="+251" keyboardType='numeric' />
</View>

      </View>
      </View>
      <View className="flex flex-col " >
        <Text className="text-sm font-semibold bg-slate-100  py-3 mt-5">Delete My account</Text>
        <TouchableOpacity onPress={handleSignout}> 
        <Text className="text-sm font-semibold  mt-2 bg-slate-100 py-3  ">Log Out</Text>
    
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})