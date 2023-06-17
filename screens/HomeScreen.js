import { Text, View, SafeAreaView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'; 


const HomeScreen = () => {
  
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      {/* first serction */}

      <View className="flex-row px-6 mt-8 items-center space-x-3 justify-center">
        <FontAwesome5 name="plane" size={30} color="rgb(13 148 136)" />
        <Text className=" text-black text-4xl">Travelpass</Text>
      </View>

      <View className="px-6 mt-20 space-y-3 items-center">
        <Text className="text-black text-[40px] text-center">Search your dream destination</Text>
        <Text className="text-teal-500 text-[38px] font-bold">Inspire Yourself</Text>
      </View>

      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
        animation="fadeIn"
        easing="ease-in-out" 
          source={{uri: "https://images.unsplash.com/photo-1533764780527-f107e7afbe15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"}}
          className="w-full h-full object-cover mt-20"
        />
        <View className="absolute top-20 items-center justify-center"> 
          <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}>
          <Animatable.View className="w-60 h-10 items-center justify-center bg-teal-600 rounded-md">
            <Text className="text-white  text-[20px]">
              Continue as guest 
            </Text>
          </Animatable.View>
        </TouchableOpacity>
        </View>
        
        <View className="absolute bottom-4 items-center justify-center">
          <TouchableOpacity
          onPress={() => navigation.navigate("Signin")}>
            <Text className="text-white underline text-[16px] md:underline-offset-8">
                Sign In as admin
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>

    </SafeAreaView>
  )
}

export default HomeScreen;