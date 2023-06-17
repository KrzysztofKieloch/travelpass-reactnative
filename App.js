import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { NativeWindStyleSheet } from "nativewind";
import Signin from './screens/Signin';
import SignUp from './screens/SignUp';
import Discover from './screens/Discover';
import ItemScreen from './screens/ItemScreen';
import AddItem from './screens/AddItem';
import DiscoverAdmin from './screens/DiscoverAdmin';
import ItemScreenAdmin from './screens/ItemScreenAdmin';
import { AuthProvider } from './AuthContext';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>  
      <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={Discover}/>
        <Stack.Screen name="ItemScreen" component={ItemScreen}/>
        <Stack.Screen name="Signin" component={Signin}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="AddItem" component={AddItem}/>
        <Stack.Screen name="DiscoverAdmin" component={DiscoverAdmin}/>
        <Stack.Screen name="ItemScreenAdmin" component={ItemScreenAdmin}/>
      </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
     </TailwindProvider> 
    );
}