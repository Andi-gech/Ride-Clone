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
     
      <Stack.Screen name="Feedback" options={{}} />
    </Stack>
  );
}
