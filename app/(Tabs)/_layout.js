import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer  } from 'expo-router/drawer';
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import { useAuth } from '../../Context/AuthProvider';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';


export default function Layout() {
  
 

  
  return (
 
      
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor:"white",
        drawerActiveTintColor:"black",
        

      } } >
        
        <Drawer.Screen
          name="(root)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'overview',
            drawerIcon:({size,color})=>(
<AntDesign name="user" size={size} color={color} />
            ),
            drawerItemStyle: { height: 0 }
          }}
        />
        <Drawer.Screen
          name="(Profile)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Profile',
            title: 'overview',
            drawerIcon:({size,color})=>(
              <AntDesign name="user" size={size} color={color} />
                          )
          }}
        />
        <Drawer.Screen
          name="(MyWallet)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Wallet',
            title: 'overview',
            drawerIcon:({size,color})=>(
              <Ionicons name="wallet-outline" size={size} color={color} />
            
                          )
          }}
        />
        <Drawer.Screen
          name="(MyOrders)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'MyOrders',
            title: 'overview',
            drawerIcon:({size,color})=>(
             
              <Ionicons name="book-outline" size={size} color={color} />
                          )
          }}
        />
         <Drawer.Screen
          name="(Promo)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Promo',
            title: 'overview',
            drawerIcon:({size,color})=>(
             
              <Ionicons name="pricetag-outline" size={size} color={color} />
                          )
          }}
        />
         <Drawer.Screen
          name="(Settings)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            title: 'overview',
            drawerIcon:({size,color})=>(
              <Ionicons name="settings-outline" size={size} color={color} />
            
                          )
                          
          }}
        />
         <Drawer.Screen
          name="(App feedback)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'App feedback',
            title: 'overview',
            drawerIcon:({size,color})=>(
             
              <Feather name="smartphone" size={size} color={color} />
                          )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

  );
        
}
