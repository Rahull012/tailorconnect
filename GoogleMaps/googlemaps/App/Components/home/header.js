import { View, Text ,StyleSheet, TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View>
        <View style={styles.heading}>
        <Text style={styles.headingtext}>Enter your Location</Text>
        </View>
        <View style={styles.secondpart}>
        <View style={styles.textinputdiv}>
            <Ionicons name="ios-search" size={24} color="black" />
            <TextInput style={styles.textinput} placeholder="Enter" />
        </View>
        </View>
    </View>

  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
    },
    heading:{
        height:50,
        width:'100%',
        justifyContent:'center',
    },

    headingtext:{
        fontSize:25,
        fontWeight:'bold',
        left:10
    },

    textinputdiv:{
        backgroundColor:'#e0e0e0',
        height:40,
        width:'90%',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
       position:'relative',
       alignContent:'center',
       top:30
    },

    textinput:{
        height:40,
        width:'90%',
        paddingLeft:10,
    },

    secondpart:{
        alignItems:'center',
    }
   
})