import Geolocation from '@react-native-community/geolocation';
import React from 'react'

export default function Currentlocation() {
    let live_location=Geolocation.getCurrentPosition(info => console.log(info));
    return (
    <div>
         {live_location}
    </div>
  )
}
