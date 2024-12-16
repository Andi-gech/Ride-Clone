import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DriverArrived({visible, onClose}) {
  return (
    <Modal visible={visible} animationType="slide" transparent  >
        <View className=" w-8/12 h-[100px]  bg-white flex flex-col items-center justify-end  ">

            <Text className="text-3xl font-bold">Driver Arrived</Text>
            <Text className="text-lg font-bold">Your Driver has Arrived</Text>
            </View>
        </Modal>
  )
}

const styles = StyleSheet.create({})