import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer  } from 'expo-router/drawer';
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from '../Context/Store'
import { Redirect, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import registerNNPushToken from 'native-notify';
import SocketService from '../Components/SocketService';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../Context/AuthProvider';
import { getToken } from '../Context/secureTokenStore';

export default function Layout() {
  const queryClient = new QueryClient()
  registerNNPushToken(20102, 'kuOxw3Bdzg86CJTpNKc76j');

  
  
  

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      
      
   

    <Stack
      // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerShown:false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} initialRouteName='(Tabs)'>
        <Stack.Screen name="(Tabs)" options={{}} />
    
      <Stack.Screen name="signin" options={{}} />
      <Stack.Screen name="Verification" options={{}} />
    </Stack>

    </Provider>
    </QueryClientProvider>
    </AuthProvider>
  );
}
