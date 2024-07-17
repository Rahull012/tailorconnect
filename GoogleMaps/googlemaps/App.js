import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabnavigation from './App/Navigations/tabnavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tabnavigation/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
