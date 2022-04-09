import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Utama from '../Page/Utama';
import Form from '../Page/Form';
    const Stack = createStackNavigator();
export default function Router() { 
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Form'>
        <Stack.Screen name='Form' component={Form} options={{headerShown:false}}/>
        <Stack.Screen name='Utama' component={Utama} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home(){
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Utama'>
        <Stack.Screen name='Form' component={Form} options={{headerShown:false}}/>
        <Stack.Screen name='Utama' component={Utama} options={{headerShown:false}}/>
        <Stack.Screen name='Router' component={Router} options={{headerShadown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
}

const styles = StyleSheet.create({})