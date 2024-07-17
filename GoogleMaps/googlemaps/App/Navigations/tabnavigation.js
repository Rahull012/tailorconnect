import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Fav from '../Screens/Fav';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
function Tabnavigation() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} options={{tabBarLabel:'Home',tabBarIcon:({color,size})=>{
        return <Ionicons name="ios-home-outline" size={24} color="black" />
      }}}/>
      <Tab.Screen name="Fav" component={Fav} options={{tabBarLabel:'Fav',tabBarIcon:({color,size})=>{
        return <Ionicons name="ios-heart-outline" size={24} color="black" />
      }}}/>
       <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel:'Profile',tabBarIcon:({color,size})=>{
        return <Ionicons name="ios-person-outline" size={24} color="black" />
      }}}/>
       <Tab.Screen name="Search" component={Search} options={{tabBarLabel:'Search',tabBarIcon:({color,size})=>{
        return <Ionicons name="ios-search-sharp" size={24} color="black" />
      }}} />
    </Tab.Navigator>
  )
}


export default Tabnavigation;