import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Push Notificacion recibida",remoteMessage);
    }); 

    const topic =messaging()
    .subscribeToTopic('stevengualpa')
    .then(()=> console.log('susvirofosfs'));

    const back =messaging().setBackgroundMessageHandler(async (remoteMessage)=>{
      console.log('en bacm',remoteMessage);
    })
    return ()=>{
back();
topic();
unsubscribe();

    } ;
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
