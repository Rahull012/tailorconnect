import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/home/header'
import {currentlocation} from '.././Components/getcurrentlocation/currentlocation';

function Home(props) {
  return (
    <View>
      <Header/>
      {/* <Currentlocation/> */}
    </View>
  )
}

export default Home;
