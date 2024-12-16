import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker, Polyline,Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import Roundedbuttons from '../../../Components/Roundedbuttons';
import { source,destination} from "../../../Context/Actions/CordinateActions"
import { connect, useDispatch,useSelector } from 'react-redux';
import { router } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UsePlaceNames from '../../../hooks/UsePlaceNames';
import UseGetRoute from '../../../hooks/UseGetRoute';
function MapModal() {
    const dispatch=useDispatch()
  
    const startingPoint = useSelector(state => state.corrdinate.source);
  
    const [markerCoordinate, setMarkerCoordinate] = useState({ latitude: startingPoint?.latitude, longitude: startingPoint?.longitude });
  
    const [coordinates, setCoordinates] = useState(null);
  
    const {data,error,isLoading,refetch}= UsePlaceNames(markerCoordinate?.latitude||null,markerCoordinate?.longitude||null)
    
   useEffect(()=>{
    refetch()
   },[markerCoordinate?.latitude,markerCoordinate?.longitude])

  
    const {data:RouterData,refetch:ReGetRoute}= UseGetRoute(startingPoint.latitude,startingPoint.longitude,markerCoordinate?.latitude,markerCoordinate?.longitude)
 useEffect(()=>{
     setCoordinates(RouterData?.data?.features[0]?.geometry?.coordinates[0].map(coord => ({
        latitude: coord[1],
        longitude: coord[0]
      })))
    
 },[RouterData])

 useEffect(()=>{
    ReGetRoute()
    console.log("kkkk")
  
 },[startingPoint?.latitude,startingPoint?.longitude,markerCoordinate?.latitude,markerCoordinate?.longitude])
    

  
    const zoomIn = () => {
        if (markerCoordinate) {
            let region = {
                latitude: markerCoordinate?.latitude,
                longitude: markerCoordinate?.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            };

            mapView.animateToRegion(region, 1000);
        }
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerCoordinate({ latitude, longitude });
    };

  

    const handleConfirmDestination = () => {
        if (!markerCoordinate) {
            return;
        }
      dispatch(destination({
            latitude: markerCoordinate?.latitude,
            longitude: markerCoordinate?.longitude,
            PlaceName:data?.data?.features[0]?.properties?.city||data?.data?.features[0]?.properties?.county,
            state:data?.data?.features[0]?.properties?.state
        }));
     
        router.navigate('/SetPickupPoint');
        console.log('markerCoordinate', markerCoordinate);


      
    
    };
if(startingPoint){
    return (
      
            <View className=" relative w-full h-full flex flex-col items-start justify-between  bg-white">
                 <MapView
                        className="w-full  h-full"
                        initialRegion={{
                            latitude: startingPoint.latitude || 0,
                            longitude: startingPoint.longitude || 0,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        }}
                        onPress={handleMapPress}
                        ref={(ref) => (mapView = ref)}>
                        {markerCoordinate && (
                            <Marker
                                title={"Your Marker"}
                                coordinate={markerCoordinate}
                                onPress={zoomIn}
                            >
<FontAwesome name="map-marker" size={44} color="black" />
                            </Marker>
                        )}
                  <Circle   center={startingPoint}
                                radius={4}
                                fillColor="rgba(0, 0, 0, 0.5)"
                                strokeColor="green" />

                        {coordinates && (
                            <Polyline
                                coordinates={coordinates}
                                strokeColor="green"
                                strokeWidth={2}
                            />
                        )}
                    </MapView>
                    <LinearGradient
        colors={['rgba(255, 255, 255, 0.83)',' rgba(255, 255, 255, 0.60) ', 'rgba(255, 255, 255, 0.13)']}
        className="absolute z-30 w-full top-0 right-0 h-[100px]"
       
      ></LinearGradient>
      
                    <View className="absolute  w-full h-full  flex flex-col items-center justify-between top-0 right-0">
                  <View className="w-full flex flex-col items-center justify-center">
                  <View className="h-[70px] w-full flex flex-row justify-between items-center z-50">
                    <Roundedbuttons icon={<AntDesign name="close" size={24} color="black" />} className="" onpress={()=>router.back()} />
                </View>
                {data&&
                    <View className=" z-40 h-[70px] w-full flex flex-col items-center justify-center  ">
                     

                        <Text className="ml-1 font-bold text-lg text-black bg-inherit">{ data?.data?.features[0]?.properties?.city||data?.data?.features[0]?.properties?.county||"No Road Name" }</Text>
                    <Text className="ml-1 font-bold text-sm text-black">{data?.data?.features[0]?.properties?.state}</Text>
                        
                    </View>}
                    {isLoading&&
                    <View className=" z-40 h-[70px] w-full flex flex-col items-center justify-center  ">

                   <Text className="ml-1 font-bold text-lg text-black bg-inherit">Searching For place Name ..</Text>
                    </View>}
             
                  </View>
                  
               <View className="w-full flex flex-col items-center justify-center">
               <TouchableNativeFeedback onPress={handleConfirmDestination}>

<View className="w-[88%] h-[50px] mt-4 rounded-lg  bg-yellow-500 flex items-center justify-center">
    <Text className="text-lg font-bold">Confirm destination</Text>
</View>

</TouchableNativeFeedback>
<Text className="mt-2 mb-2  text-[10px]">Confirm destination By Pressing the button</Text>
               </View>
       
                    </View>
              
            </View>

    );
   
}
}
const mapStateToProps = state => ({
    markerCoordinate: state.corrdinate.destination,
    location: state.corrdinate.source
});
export default connect(mapStateToProps)(MapModal);

const styles = StyleSheet.create({});
