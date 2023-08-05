import React, { useEffect, useState } from 'react';
import AppNavigator from './Layouts/NavBarDown';
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

  return (
    <AppNavigator />
  );
}
