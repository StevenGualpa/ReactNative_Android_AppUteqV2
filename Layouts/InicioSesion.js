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
    // Genera un código único (en este caso un número aleatorio, pero debería ser algo más seguro)
    const codigo = Math.random().toString(36).substring(2);
    
    // Cambia la URL por la URL de tu backend
    const backendUrl = 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/google/login';
    
    try {
        // Envía una solicitud POST a tu servidor backend con el "código" en el cuerpo de la solicitud
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo }),
        });

        if (!response.ok) {
            // Si la respuesta no es 200 OK, lanza un error
            throw new Error('Respuesta no exitosa del servidor: ' + response.statusText);
        }

        // Intenta leer el cuerpo de la respuesta como texto
        const responseText = await response.text();
        console.log('Respuesta del servidor (texto):', responseText);

        // Intenta analizar el texto como JSON (esto podría fallar si el texto no es JSON válido)
        const responseData = JSON.parse(responseText);
        console.log('Respuesta del servidor (JSON):', responseData);

        if (responseData.error) {
            console.error('Error del servidor:', responseData.error);
            return;
        }

        // Utiliza la URL proporcionada por el backend para iniciar el flujo OAuth en el navegador del sistema
        if (responseData.url) {
            Linking.openURL(responseData.url);
        } else {
            console.error('Error: No se proporcionó la URL');
        }
    } catch (error) {
        // Si hay un error, captúralo y maneja la situación como sea necesario
        console.error('Error en el proceso de inicio de sesión:', error);
    }
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



  
  const handleOpenURL = (event) => {
     console.log('URL recibida:');
    // Extrae el token o código de la URL
    const [, query_string] = event.url.split('?');
    const queries = Object.fromEntries(new URLSearchParams(query_string));
  
    // Aquí estoy asumiendo que recibes un "code" en la URL, ajusta según lo que recibes
    const code = queries.code;
    console.log('URL recibida:');
    console.log('Código extraído de la URL:', code);
    if (code) {
      // Cambia la URL por la URL de tu backend y la ruta a la que debes enviar el código
      fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data recibida:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('No se recibió ningún código en la URL');
    }
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