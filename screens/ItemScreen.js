import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const ItemScreen = ({route}) => {

const navigation = useNavigation();
const data = route?.params?.param; 

useLayoutEffect(() => {
    navigation.setOptions({
     headerShown: false,
    })
  }, []);

  const [clicked, setClicked] = useState(false);
  const changeIconColor = () => {
    setClicked(!clicked); 
  };


return (
    <SafeAreaView className="flex-1 bg-gray relative">
        <ScrollView className="flex-1 px-4 py-8 ">
            <View className="relative bg-gray shadow-lg"> 
                <Image 
                    source={data.image}
                    className="w-full h-64 rounded-2xl"
                />

                <View className="absolute flex-row inset-x-0 top-5 justify-between px-4">
                    <TouchableOpacity onPress={() => navigation.navigate("Discover")}className="w-10 h-10 rounded-md items-center justify-center bg-white">
                        <Entypo name="chevron-left" size={30} color="black" />                 
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white mt-4 rounded-2xl shadow-lg">
            <View className="ml-3 mr-3 flex-row mt-2 justify-between inset-x-0">
                <Text className="text-teal-600 text-[30px] font-bold">{data.name}</Text>
                <TouchableOpacity onPress={() => changeIconColor()} className="w-10 h-10 rounded-md items-center justify-center">
                    <Ionicons name={clicked ? 'heart' : 'heart-outline'} size={40} color="red" />                   
                </TouchableOpacity>
            </View>
            <View className="ml-3 mr-3 mb-2 flex-row items-center space-x-2">
                <FontAwesome5 name="map-marker-alt" size={16} color="gray" />
                <Text className="text-[16px]">{data.country}</Text>
            </View>
            </View>
            <View className="ml-3 mr-3 mt-8 mb-8 justify-center">
                <Text className="font-bold text-[20px]">Introduction</Text>
                <View className="w-full rounded-2xl mt-2">
                    <Text className="text-[15px]">{data.description}</Text>
                </View>
            </View>
            <View className="bg-white rounded-2xl shadow-lg">
            <View className="ml-3 mr-3 mt-4">
                <View className=" justify-center items-center">
                    <Text className="text-[20px] font-bold text-teal-600">- Popular places -</Text>
                </View>
                <View className="ml-3 mr-3 mt-8 mb-8 items-center">
                    <Text className="text-[16px] font-semibold  mb-1">{data.popularPlaces}</Text>
                </View>
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ItemScreen