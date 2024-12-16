import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";

const PrivecyNoticeModel = ({ onclose, opennotice }) => {
  return (
    <Modal visible={opennotice} animationType="slide" transparent>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className=" absolute top-0 h-full   flex-1 flex justify-end flex-col"
      >
        <View
          style={{
            shadowRadius: 2,
            shadowOffset: {
              width: 7,
              height: 10,
            },
            shadowColor: "#000000",
            elevation: 15,
            shadowOpacity: 1,
          }}
          className="w-full h-[300px] bg-white border-t-2  justify-between border-t-zinc-100    rounded-t-lg flex "
        >
          <View className="w-full">
            <Text className="text-xl  font-bold">Privacy notice</Text>
            <Text className="  text-base  mt-2">Application</Text>
            <Text className=" text-base mt-2">
              Ride Collectes locations data to enable tracking Your Path only
              during ride,even the app is closed or not in use{" "}
            </Text>
          </View>
          <TouchableNativeFeedback onPress={onclose}>
            <View className=" w-full bg-yellow-400 h-[50px] mb-2 flex items-center justify-center">
              <Text className=" text-white text-lg font-bold">Ok</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </Modal>
  );
};

export default PrivecyNoticeModel;

const styles = StyleSheet.create({});
