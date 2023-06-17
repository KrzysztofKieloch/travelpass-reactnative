import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";  

const SignUp = () => {

  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
     headerShown: false,
    })
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://azuredjangoapi.azurewebsites.net/auth/register/ ', {
        username: userName,
        email: userEmail,
        password: userPassword,
      })
      if (response.status = 200) {
        const data = response.data;
        alert('Register successful', data);
        setUserName('')
        setUserEmail('')
        setUserPassword('')
        navigation.navigate("Signin")
      } else {
       alert('Register error');
      }
    } catch (error) {
      alert('Register error');
    }    
  };

  return (
    <SafeAreaView className="flex-1">
    <View className="flex-row px-6 mt-8 items-center space-x-3 justify-center">
        <FontAwesome5 name="plane" size={30} color="rgb(13 148 136)" />
        <Text className=" text-black text-4xl">Travelpass</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}className="w-10 h-10 rounded-md items-center justify-center bg-white ml-2">
          <Entypo name="chevron-left" size={30} color="black" />                 
         </TouchableOpacity>
    <View className="flex-1 items-center justify-center bg-gray">
      <View className="p-8 w-full">
        <Text className="text-4xl font-bold mb-6">Sign Up</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholder="Enter username"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholder="Enter email address"
          onChangeText={text => setUserEmail(text)}
          value={userEmail}
        />
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholder="Enter password"
          secureTextEntry
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
        />       
        <View>
        <TouchableOpacity onPress={handleLogin} className="flex-1 h-12 bg-teal-600 rounded-md flex flex-row justify-center items-center px-6">
            <Text className="text-white text-base text-[20px]">Register</Text>
          </TouchableOpacity>
        </View>
        <View>
        </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default SignUp