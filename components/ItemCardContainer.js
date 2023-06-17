import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const ItemCardContainer = ({item}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
     onPress={() => navigation.navigate("ItemScreen", {param: item})}
     className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-full my-2">
        <Image 
            source={{uri: item.image}} 
            className="w-full h-40 rounded-md object-cover"
        />
        <Text className="text-teal-600 text-[18px] font-bold">
            {item.length > 14 ? `${item.data.name.slice(0,14)}..` : item.name}
        </Text>

        <View className="flex-row items-center space-x-2">
        <FontAwesome5 name="map-marker-alt" size={12} color="gray" />
        <Text>
            {item.country.length > 14 ? `${title.slice(0,14)}..` : item.country}
        </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ItemCardContainer