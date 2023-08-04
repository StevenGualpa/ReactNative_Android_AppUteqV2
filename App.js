import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function App() {
  const [deviceToken, setDeviceToken] = useState('');

  // Obtiene el token del dispositivo al iniciar la aplicación
  useEffect(() => {
    messaging().getToken().then(setDeviceToken);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Push Notificacion recibida", remoteMessage);
      // Muestra la notificación en la bandeja de notificaciones del sistema
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('en bacm', remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const email = 'Jorge.gualpa2015@uteq.edu.ec';
    const password = '12345';

    const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        deviceToken: deviceToken,
      }),
    });

    const data = await response.json();

    // Verifica si el inicio de sesión fue exitoso o no
    if (data.error) {
      Alert.alert('Error', data.error);
    } else {
      Alert.alert('Login exitoso', 'Bienvenido ' + data.usuario.email);
      console.log(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
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
