import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';   

const AddItem = () => {

    const navigation = useNavigation();

    const [postResult, setPostResult] = useState(null);
    const [postName, setPostName] = useState('');
    const [postCountry, setPostCountry] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPopularPlaces, setPostPopularPlaces] = useState('');
    const [postImage, setPostImage] = useState(null);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setPostImage(result.assets[0].uri);
        }
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

    const postData = async () => {
      try {
        const imageBlob = await convertToBlob(postImage);
  
        const formData = new FormData();
        formData.append('name', postName);
        formData.append('country', postCountry);
        formData.append('description', postDescription);
        formData.append('popularPlaces', postPopularPlaces);
        formData.append('image', imageBlob, 'image.jpg');
  
        const response = await axios.post("https://azuredjangoapi.azurewebsites.net/posts/", formData);
        setPostResult(JSON.stringify(response.data, null, 2));
        
        if (response.status = 200) {
            alert("New entry added")
            setPostName("")
            setPostCountry("")
            setPostDescription("")
            setPostPopularPlaces("")
            setPostImage(null)
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    }, []);

  return (
    <SafeAreaView>
        <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1 px-4 py-8 ">
            <View className="relative bg-white shadow-lg border rounded-md"> 
                <Image 
                    source={postImage}
                    className="w-full h-64"
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
                onChangeText={postName => setPostName(postName)}
                value={postName}
                >
                </TextInput>
            </View>
            <View className="ml-3 mr-3 mb-2 flex-row items-center space-x-2">
                <FontAwesome5 name="map-marker-alt" size={16} color="gray" />
                <TextInput className="text-[16px]" 
                placeholder="Country"
                onChangeText={postCountry => setPostCountry(postCountry)}
                value={postCountry}
                >
                </TextInput>
            </View>
            </View>
            <View className="ml-3 mr-3 mt-8 mb-8 justify-center">
                <Text className="font-bold text-[20px]">Introduction</Text>
                <View className="w-full rounded-2xl mt-2">
                    <TextInput className="text-[15px]" 
                    placeholder="Something about town..."
                    onChangeText={postDescription => setPostDescription(postDescription)}
                    value={postDescription}
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
                    onChangeText={postPopularPlaces => setPostPopularPlaces(postPopularPlaces)}
                    value={postPopularPlaces}
                    >
                    </TextInput>
                </View>
                    <View>
                    <TouchableOpacity onPress={postData} className="flex-1 h-12 bg-green-700 rounded-md flex flex-row justify-center items-center px-6 m-2">
                        <Text className="text-white text-base text-[20px]">Save</Text>
                    </TouchableOpacity>
                    </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("DiscoverAdmin")} className="flex-1 h-12 bg-teal-600 rounded-md flex flex-row justify-center items-center px-6 m-2">
                        <Text className="text-white text-base text-[20px]">Go to city list</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </ScrollView>
        <View className="absolute inset-x-16 bottom-0 items-center justify-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Signin")}>
            <Text className="text-black underline text-[16px] md:underline-offset-8">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default AddItem