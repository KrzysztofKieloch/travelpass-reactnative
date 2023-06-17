import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, usePreventRemoveContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';   
import axios from 'axios';

const ItemScreenAdmin = ({route}) => {

const navigation = useNavigation();
const data = route?.params?.param; 

const [putName, setPutName] = useState(data.name);
const [putCountry, setPutCountry] = useState(data.country);
const [putDescription, setPutDescription] = useState(data.description);
const [putPopularPlaces, setPutPopularPlaces] = useState(data.popularPlaces);
const [putImage, setPutImage] = useState(data.image)

useLayoutEffect(() => {
    navigation.setOptions({
     headerShown: false,
    })
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPutImage(result.assets[0].uri);
    }
  };

  const putData = async (id) => {  
    const response = await axios.put(`https://azuredjangoapi.azurewebsites.net/posts/${id}/`, {
        name: putName,
        country: putCountry,
        description: putDescription,
        popularPlaces: putPopularPlaces,
    }, {
      body: JSON.stringify(putData),
    })
    .then(response => {
        console.log(response.data);
        alert("Edit succesfully")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const convertToBlob = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('Conversion to Blob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  const putData1 = async (id) => {
    const imageBlob = await convertToBlob(putImage);

    const formData = new FormData();
    formData.append('name', putName);
    formData.append('country', putCountry);
    formData.append('description', putDescription);
    formData.append('popularPlaces', putPopularPlaces);
    formData.append('image', imageBlob, 'image.jpg');

    axios.put(`https://azuredjangoapi.azurewebsites.net/posts/${id}/`, formData)
      .then(response => {
        console.log(response.data);
        alert("Edit successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteDataById = (id) => {
    axios.delete(`https://azuredjangoapi.azurewebsites.net/posts/${id}/`)
    .then(result => { 
        alert('Entry deleted.')
        navigation.navigate("AddItem")
    });
    }

return (
    <SafeAreaView className="flex-1 bg-gray relative">
        <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1 px-4 py-8 ">
            <View className="relative bg-white shadow-lg border rounded-2xl"> 
                <Image 
                    source={putImage}
                    className="w-full h-64 rounded-2xl"
                />
                <View className="absolute flex-row inset-x-0 top-5 justify-between px-4">
                    <TouchableOpacity onPress={() => navigation.navigate("DiscoverAdmin")}className="w-10 h-10 rounded-md items-center justify-center bg-white">
                        <Entypo name="chevron-left" size={30} color="black" />                 
                    </TouchableOpacity>
                </View>
                <View className="absolute flex-row px-4 right-0 bottom-5">
                    <TouchableOpacity onPress={pickImage} className="bg-black rounded-2xl">
                        <Text className="text-[20px] text-white bg-black">Upload a photo</Text>                 
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white mt-4 rounded-2xl shadow-lg">
            <View className="ml-3 mr-3 flex-row mt-2 justify-between inset-x-0">
            <TextInput className="text-teal-600 text-[30px] font-bold" 
                placeholder="Town"
                onChangeText={putName => setPutName(putName)}
                defaultValue={putName}
            >
            </TextInput>
            </View>
            <View className="ml-3 mr-3 mb-2 flex-row items-center space-x-2">
                <FontAwesome5 name="map-marker-alt" size={16} color="gray" />
                <TextInput className="text-[16px]" 
                placeholder="Country"
                onChangeText={putCountry => setPutCountry(putCountry)}
                defaultValue={putCountry}
                >
                </TextInput>
            </View>
            </View>
            <View className="ml-3 mr-3 mt-8 mb-8 justify-center">
                <Text className="font-bold text-[20px]">Introduction</Text>
                <View className="w-full rounded-2xl mt-2">
                <TextInput className="text-[15px]" 
                    placeholder="Something about town..."
                    onChangeText={putDescription => setPutDescription(putDescription)}
                    defaultValue={putDescription}
                    >
                </TextInput>
                </View>
            </View>
            <View className="bg-white rounded-2xl shadow-lg">
            <View className="ml-3 mr-3 mt-4">
                <View className=" justify-center items-center">
                    <Text className="text-[20px] font-bold text-teal-600">- Popular places -</Text>
                </View>
                <View className="ml-3 mr-3 mt-8 mb-8 items-center">  
                <TextInput className="w-full h-8 text-[16px] font-semibold mb-1 border border-teal-600 rounded-md p-2" 
                    placeholder="Popular places"
                    onChangeText={putPopularPlaces => setPutPopularPlaces(putPopularPlaces)}
                    defaultValue={putPopularPlaces}
                    >
                    </TextInput>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => putData1(data.id)} className="flex-1 h-12 bg-green-700 rounded-md flex flex-row justify-center items-center px-6 m-2">
                    <Text className="text-white text-base text-[20px]">Save changes</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => deleteDataById(data.id)} className="flex-1 h-12 bg-red-700 rounded-md flex flex-row justify-center items-center px-6 m-2">
                    <Text className="text-white text-base text-[20px]">Delete</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ItemScreenAdmin