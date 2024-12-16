import { Stack } from 'expo-router';

export default function Layout() {
  return (
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
      }}>
      {/* Optionally configure static options outside the route. */}
      <Stack.Screen name="index" options={{}} />
      
      <Stack.Screen name="PickDestination"  options={{
        animation: 'slide_from_bottom',
        animationDuration: 1000,
    
      }} />
      <Stack.Screen name='MapModal' options={{
        animation: 'slide_from_bottom',
      }}/>
      <Stack.Screen name='SetPickupPoint' options={{
        animation: 'slide_from_right',
      }}/>
    </Stack>
  );
}
