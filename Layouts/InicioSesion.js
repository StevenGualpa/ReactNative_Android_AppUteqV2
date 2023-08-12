import React, { useEffect, useState } from 'react';
import {
  View,Text,TextInput,TouchableOpacity,ImageBackground,Dimensions,
  ScrollView,SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegistroModal from './ModalRegister';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import VerificationModal from './VerificationModal'; // Asegúrate de ajustar la ruta si es necesario
import { styles } from './Styles/Styles'; // Ajusta la ruta si es necesario

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
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

  // Obtener el token del dispositivo
  useEffect(() => {
    messaging().getToken().then(setDeviceToken);
  }, []);

  const handleLogin = () => {
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['uteq.edu.ec', 'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'outlook.es'];
    const endsWithAllowedDomain = allowedDomains.some((domain) => correo.toLowerCase().endsWith('@' + domain));
    
    if (!emailRegex.test(correo) || !endsWithAllowedDomain) {
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

        if (data.usuario.verificado === false) {
          setUserID(data.usuario.ID); // Guardar el ID del usuario
          setVerificationModalVisible(true); // Mostrar el modal de verificación
        } 
        else {
          if (data.usuario.email === correo && data.usuario.password === contraseña) {
            navigation.navigate('NavigationBar');
          } else {
            console.log('El correo electrónico y la contraseña devueltos no coinciden con los enviados.');
          }
        }       
      })
      .catch(error => {
        console.error('Error en el JSON:', error);
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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
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
