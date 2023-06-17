import { View, Text, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from "../assets";
import { Entypo } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import useFetch from '../hooks/useFetch';

const Discover = () => {
  const navigation = useNavigation();
  
  const { data } = useFetch("https://azuredjangoapi.azurewebsites.net/posts/")
  
  useLayoutEffect(() => {
    navigation.setOptions({
     headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray relative mt-4">
      <View className="flex-row items-center justify-between px-8">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}className="w-10 h-10 rounded-md items-center justify-center bg-white">
              <Entypo name="chevron-left" size={30} color="black" />                 
            </TouchableOpacity>
          <View>    
            <Text className="text-[30px] font-bold text-teal-600">Search</Text>
            <Text className="text-[30px] text-gray-500">Your destination</Text>
          </View>
        <View className="w-12 h-12 rounded-full items-center justify-center"> 
          <Image 
            source={Avatar}
            className="w-full h-full rounded-full"
          />
        </View>
      </View>
      <View className="flex-row items-center justify-between px-8 p-4">
          <TextInput className="w-full h-10 flex-row bg-white border-solid pl-4 mt-3" placeholder="Travel to..."/>
      </View>

      <ScrollView>
      <View>
          <View className="px-4 mt-8 items-center justify-evenly space-x-2">
          {data.map((item) => 
            <ItemCardContainer item={item} key={item.id}/>
          )}   
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Discover