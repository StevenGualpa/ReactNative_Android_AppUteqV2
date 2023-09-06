import React, { useEffect, useState } from 'react';
import AppNavigator from './Layouts/NavBarDown';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import { AuthProvider } from './Layouts/AuthContext';
import { GoogleSignin } from '@react-native-community/google-signin';


export default function App() {
  const [deviceToken, setDeviceToken] = useState('');

  // Crear un canal de notificación al iniciar la aplicación
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "my-channel-id", // Debe ser único
        channelName: "My Channel", // Nombre legible por humanos
        channelDescription: "A channel to categorize your notifications", // Descripción del canal
        playSound: true, // Sonido de la notificación
        soundName: "default", // Nombre del archivo de sonido
        importance: PushNotification.Importance.HIGH, // Importancia del canal
        vibration: true, // Vibración de la notificación
      },
      (created) => console.log(`createChannel returned '${created}'`) // Se llama si el canal se crea exitosamente
    );
  }, []);

  // Obtiene el token del dispositivo al iniciar la aplicación
  useEffect(() => {
    messaging().getToken().then(setDeviceToken);
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '798041694675-4ktjr02iokc9paphm6o3funvb5srsirt.apps.googleusercontent.com', // obtenido de la consola de desarrolladores de Google
      offlineAccess: true,
    });
  }, []);
    


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Push Notificacion recibida", remoteMessage);
      // Muestra la notificación en la bandeja de notificaciones del sistema
      PushNotification.localNotification({
        channelId: "my-channel-id", // Utiliza el mismo ID de canal que se creó anteriormente
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

  return (
    <AuthProvider>
    <AppNavigator />
  </AuthProvider>
  );
}