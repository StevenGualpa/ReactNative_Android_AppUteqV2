import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ImageBackground, Dimensions,
  ScrollView, SafeAreaView, ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegistroModal from './ModalRegister';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import VerificationModal from './VerificationModal'; // Asegúrate de ajustar la ruta si es necesario
import { styles } from './Styles/Styles'; // Ajusta la ruta si es necesario
import { useAuth } from './AuthContext';
import ChangePasswordModal from './Cambio'
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = () => {
  const { setUser } = useAuth();
  const navigation = useNavigation();
  const [deviceToken, setDeviceToken] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [userID, setUserID] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = async () => {
    const codigo = Math.random().toString(36).substring(2);
    const deviceToken = "dispositivo-token"; // Reemplaza con la obtención real del deviceToken
    const backendUrl = 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/google/login';

    try {
        await AsyncStorage.setItem('codigo', codigo);

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo }),
        });

        if (!response.ok) throw new Error('Respuesta no exitosa del servidor: ' + response.statusText);

        const responseData = await response.json();

        if (responseData.error) {
            console.error('Error del servidor:', responseData.error);
            return;
        }

        if (responseData.url) {
            Linking.openURL(responseData.url);
        } else {
            console.error('Error: No se proporcionó la URL');
        }
    } catch (error) {
        console.error('Error en el proceso de inicio de sesión:', error);
    }

    const checkSession = async () => {
        console.log("Verificando sesión...");

        try {
            const codigo = await AsyncStorage.getItem('codigo');
            const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/sesiones/google/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo, deviceToken }),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Respuesta del servidor:', responseData);
                if (responseData.message && responseData.message.trim() === 'Inicio de sesión exitoso') {
                    clearInterval(intervalId); // Detiene el intervalo una vez que la respuesta es exitosa
                    setUser(responseData.usuario); 
                //    navigation.navigate('NavigationBar', { usuario: responseData.usuario }); // Navega a 'NavigationBar' pasando los datos del usuario
                navigation.navigate('NavigationBar');    
                return;
                }
            } else {
                console.error('Error en la verificación de la sesión:', responseData);
                console.error('Código:', codigo);
                console.error('Token del dispositivo:', deviceToken);
            }
        } catch (error) {
            console.error('Error en la verificación de la sesión:', error);
            const codigo = await AsyncStorage.getItem('codigo');
            console.error('Código:', codigo);
            console.error('Token del dispositivo:', deviceToken);
        }
    };

    const intervalId = setInterval(checkSession, 10000); // Verifica la sesión cada segundo
};



  


  
  const openChangePasswordModal = () => {
    setChangePasswordModalVisible(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalVisible(false);
  };
  // Obtener el token del dispositivo
  useEffect(() => {
    messaging().getToken().then(setDeviceToken);
  }, []);

  const handleLogin = () => {
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos.');
      return;
    }
    setIsButtonDisabled(true); // Deshabilitar el botón
    setIsLoading(true); // Mostrar la animación de carga
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['uteq.edu.ec', 'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'outlook.es'];
    const endsWithAllowedDomain = allowedDomains.some((domain) => correo.toLowerCase().endsWith('@' + domain));

    if (!emailRegex.test(correo) || !endsWithAllowedDomain) {
      setIsButtonDisabled(false);
      setIsLoading(false);
      Alert.alert('Correo inválido', 'Por favor, ingresa un correo válido con uno de los siguientes dominios: @uteq.edu.ec, @gmail.com, @hotmail.com, @yahoo.com, @outlook.com');
      return;
    }
    
    fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: correo,
        password: contraseña,
        deviceToken: deviceToken
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.usuario && typeof data.usuario.verificado !== 'undefined') {
          if (data.usuario.verificado === false) {
            setUserID(data.usuario.ID);
            setVerificationModalVisible(true);
          } else {
            if (data.usuario.email === correo && data.usuario.password === contraseña) {
              setUser(data.usuario); // Correcto // Guardar el usuario en el contexto
              navigation.navigate('NavigationBar');
              setCorreo("");
              setContraseña("");
            }
          }
        } else {
          Alert.alert('correo o contraseña incorrecta', 'El correo electrónico y la contraseña devueltos no coinciden con los enviados.');
        }
        setIsButtonDisabled(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error en el JSON:', error);
        setIsButtonDisabled(false);
      setIsLoading(false);
      });
  };

  const handleRegisterModal = () => {
    setModalVisible(true);
  };

  const handleRegister = (email, type) => {
    setModalVisible(false);
  };

  const handleVerification = (code) => {
    fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/verifyUser/${userID}/${code}`, {
      method: 'PUT',
    })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Respuesta no JSON: ' + response.statusText);
        }
      })
      .then(data => {
        if (data.message === "Cuenta verificada") {
          Alert.alert('Verificación exitosa', 'Usuario verificado exitosamente');
          setVerificationModalVisible(false);
          setUser(data.usuario);
          navigation.navigate('NavigationBar');
        } else if (data.message === "Código caducado. Se ha generado un nuevo código.") {
          Alert.alert('Verificación fallida', 'El código de verificación ha expirado. Se ha generado uno nuevo.');
        } else if (data.error === "El código de verificación no es correcto") {
          Alert.alert('Verificación fallida', 'El código de verificación no es correcto');
        } else {
          Alert.alert('Error desconocido', 'Ocurrió un error inesperado durante la verificación.');
        }
      })
      .catch(error => {
        console.error('Error en la verificación:', error);
        Alert.alert('Error', 'Ocurrió un error durante la verificación. Por favor, inténtalo de nuevo más tarde.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={require('./src/Fondo.jpg')}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.logoContainer}>
            <ImageBackground
              source={require('./src/UTEQBL.png')}
              resizeMode="contain"
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.title}>APP</Text>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="white" style={styles.inputIcon} />
            <TextInput
              placeholder="Correo"
              placeholderTextColor="white"
              style={styles.textInput}
              onChangeText={setCorreo}
              value={correo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="white" style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="white"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              onChangeText={setContraseña}
              value={contraseña}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={openChangePasswordModal}>
            <Text style={styles.passwordText}>Has olvidado la contraseña</Text>
          </TouchableOpacity>
          <ChangePasswordModal
            isVisible={changePasswordModalVisible}
            onClose={closeChangePasswordModal}
          />

<TouchableOpacity
  style={styles.loginButton}
  onPress={googleSignIn}
  activeOpacity={0.7}
>
  <Text style={styles.loginButtonText}>Iniciar sesión con Google</Text>
</TouchableOpacity>



          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.7}
            disabled={isButtonDisabled} // Deshabilitar el botón según el estado
          >
            {isLoading ? (
              <ActivityIndicator color="#46741e" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegisterModal}>
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>

          <RegistroModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onRegister={handleRegister}
          />
        </ImageBackground>
      </ScrollView>
      <VerificationModal
        visible={verificationModalVisible}
        onVerify={handleVerification}
        onClose={() => setVerificationModalVisible(false)}
        errorMessage={errorMessage}
      />
    </SafeAreaView>
  );
};
export default LoginScreen;