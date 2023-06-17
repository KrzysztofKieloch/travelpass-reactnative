import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCardContainerAdmin from '../components/ItemCardContainerAdmin';
import useFetch from '../hooks/useFetch';
import { Entypo } from '@expo/vector-icons';

const DiscoverAdmin = () => {
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
          <View>
            <Text className="text-[30px] font-bold text-teal-600">Edit</Text>
            <Text className="text-[30px] text-gray-500">Your destinations</Text>
          </View>
        <View className="w-12 h-12 rounded-full items-center justify-center"> 
        <TouchableOpacity onPress={() => navigation.navigate("AddItem")}className="w-10 h-10 rounded-md items-center justify-center bg-white">
            <Entypo name="chevron-left" size={30} color="black" />                 
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View>
          <View className="px-4 mt-8 items-center justify-evenly space-x-2">
          {data.map((item) => 
            <ItemCardContainerAdmin item={item} key={item.id}/>
          )}   
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DiscoverAdmin