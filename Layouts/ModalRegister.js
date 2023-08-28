import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {stylesRegister} from './Styles/Styles'


const RegistroModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState('institucional');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [claveRepetida, setClaveRepetida] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState(null);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const modalRef = useRef(null);

  const handleRadioButtonPress = (type) => {
    setSelectedType(type);
    setMessage('');
  };

  const isValidName = (value) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(value);
  };

  const isValidApellido = (value) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(value);
  };

  const isValidEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const isValidPassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]).{8,15}$/;
    return regex.test(value);
  };

  const renderPublicoFields = () => {
    if (selectedType === 'publico') {
      return (
        <>
          <View style={stylesRegister.inputContainer}>
            <Icon name="user" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              onChangeText={(value) => {
                if (isValidName(value)) {
                  setNombre(value);
                }
              }}
              value={nombre}
            />
          </View>
          <View style={stylesRegister.inputContainer}>
            <Icon name="user" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Apellido"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              onChangeText={(value) => {
                if (isValidApellido(value)) {
                  setApellido(value);
                }
              }}
              value={apellido}
            />
          </View>
          <View style={stylesRegister.inputContainer}>
            <Icon name="envelope" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Correo"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={stylesRegister.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Clave"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              secureTextEntry={!showPassword}
              onChangeText={setClave}
              value={clave}
            />
            <TouchableOpacity
              style={stylesRegister.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (selectedType === 'institucional') {
      return (
        <>
          <View style={stylesRegister.inputContainer}>
            <Icon name="envelope" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Correo"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={stylesRegister.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Clave"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              secureTextEntry={!showPassword}
              onChangeText={setClave}
              value={clave}
            />
            <TouchableOpacity
              style={stylesRegister.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={stylesRegister.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={stylesRegister.inputIcon} />
            <TextInput
              placeholder="Repetir Clave"
              placeholderTextColor="gray"
              style={stylesRegister.textInput}
              secureTextEntry={!showPassword}
              onChangeText={setClaveRepetida}
              value={claveRepetida}
            />
          </View>
        </>
      );
    }
    return null;
  };

  const handleRegister = () => {
    setMessage('');

    if (!isValidEmail(email)) {
      setMessage('Por favor, ingresa un correo válido.');
      return;
    }
    if (!email.trim()) {
      setMessage('Por favor, ingresa un correo válido.');
      return;
    }

    if (selectedType === 'publico') {
      // Validaciones para el registro público
      if (!nombre.trim() || !apellido.trim() || !clave.trim()) {
        setMessage('Por favor, completa todos los campos.');
        return;
      }

      const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'outlook.es'];
      const endsWithAllowedDomain = allowedDomains.some((domain) =>
        email.toLowerCase().endsWith('@' + domain)
      );
      if (!endsWithAllowedDomain) {
        setMessage(
          'El correo público debe tener uno de los siguientes dominios: @gmail.com, @hotmail.com, @yahoo.com, @outlook.com, @outlook.es'
        );
        return;
      }

      const isValidPublicoPassword = isValidPassword(clave);
      if (!isValidPublicoPassword) {
        setMessage(
          'La clave debe tener entre 8 y 15 caracteres y contener letras mayúsculas, minúsculas, números y caracteres especiales.'
        );
        return;
      }

      //AQUI REGISTRAR COMO INVITADO
      // Realizar el registro público mediante POST al web service
      const data = {
        nombre,
        apellido,
        email,
        password: clave,
        rol: 'invitado',

      };

      axios
        .post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/registercorreocode', data)
        .then((response) => {
          console.log('Registro exitoso:', response.data);
          const userId = response.data.data.ID;
          setUserId(userId);
          setOpenVerificationModal(true);
        })
        .catch((error) => {
          console.error('Error al registrar:', error);
          setMessage('Error al registrar. Por favor, inténtalo de nuevo.');
        });
      }
    else if (selectedType === 'institucional') {
      // Validaciones para el registro institucional
      if (!clave.trim() || !claveRepetida.trim()) {
        setMessage('Por favor, completa todos los campos.');
        return;
      }

      const isValidInstitucionalPassword = isValidPassword(clave);
      if (!isValidInstitucionalPassword) {
        setMessage(
          'La clave debe tener entre 8 y 15 caracteres y contener letras mayúsculas, minúsculas, números y caracteres especiales.'
        );
        return;
      }

      if (clave !== claveRepetida) {
        setMessage('Las claves no coinciden.');
        return;
      }

      //ESTO NO TOCAR SINO NO REGISTRA INSTITUCIONAL
      const data = {
        nombre: 'UTEQ-sino',
        email,
        password: clave,
        rol: 'Institucional',
      };

      axios
        .post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/registercorreocode', data)
        .then((response) => {
          console.log('Registro exitoso:', response.data);
          const userId = response.data.data.ID;
          setUserId(userId);
          setOpenVerificationModal(true);
        })
        .catch((error) => {
          console.error('Error al registrar:', error);
          setMessage('Error al registrar. Por favor, inténtalo de nuevo.');
        });
    }
  };

  const handleVerification = () => {
    if (!verificationCode.trim()) {
      setMessage('Por favor, ingresa el código de verificación.');
      return;
    }
    axios
      .put(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/verifyUser/${userId}/${verificationCode}`)
      .then((response) => {
        console.log('Usuario verificado exitosamente:', response.data);
        // Aquí puedes realizar acciones adicionales en caso de que el usuario haya sido verificado exitosamente.
        // Por ejemplo, redireccionar a otra pantalla, mostrar un mensaje de éxito, etc.
        Alert.alert('Éxito', 'Usuario verificado exitosamente.', [{ text: 'Aceptar', onPress: handleCloseAllModals }]);
      })
      .catch((error) => {
        console.error('Error al verificar usuario:', error);
        setMessage('Código de verificación incorrecto. Por favor, inténtalo de nuevo.');
      });
  };

  const handleCloseAllModals = () => {
    // Cerrar todos los modales
    modalRef.current?.close();
    setOpenVerificationModal(false);

    // Limpiar todos los campos y estados
    setEmail('');
    setSelectedType('institucional');
    setNombre('');
    setApellido('');
    setClave('');
    setClaveRepetida('');
    setShowPassword(false);
    setMessage('');
    setVerificationCode('');
    setUserId(null);
    // Cerrar el modal principal (RegistroModal)
    onClose();
  };
  const handleCloseModalPin= () =>
  {
    onClose();
    setEmail('');
    setSelectedType('institucional');
    setNombre('');
    setApellido('');
    setClave('');
    setClaveRepetida('');
    setShowPassword(false);
    setMessage('');
    setVerificationCode('');
    setUserId(null);

  }
  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={stylesRegister.modalContainer}>
          <ScrollView contentContainerStyle={stylesRegister.scrollViewContent}>
            <View style={stylesRegister.modalContent}>
              <Text style={stylesRegister.modalTitle}>Registro</Text>
              <View style={stylesRegister.radioContainer}>
                <TouchableOpacity
                  style={[stylesRegister.radio, selectedType === 'institucional' && stylesRegister.radioSelected]}
                  onPress={() => handleRadioButtonPress('institucional')}
                >
                  {selectedType === 'institucional' && <View style={stylesRegister.radioInner} />}
                </TouchableOpacity>
                <Text style={stylesRegister.radioLabel}>Institucional</Text>
                <TouchableOpacity
                  style={[stylesRegister.radio, selectedType === 'publico' && stylesRegister.radioSelected]}
                  onPress={() => handleRadioButtonPress('publico')}
                >
                  {selectedType === 'publico' && <View style={stylesRegister.radioInner} />}
                </TouchableOpacity>
                <Text style={stylesRegister.radioLabel}>Público</Text>
              </View>
              {renderPublicoFields()}
              {message ? <Text style={stylesRegister.errorMessage}>{message}</Text> : null}
              <TouchableOpacity style={stylesRegister.registerButton} onPress={handleRegister}>
                <Icon name="user-plus" size={20} color="white" style={stylesRegister.registerButtonIcon} />
                <Text style={stylesRegister.registerButtonText}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesRegister.closeButton} onPress={handleCloseModalPin}>
                <Icon name="times" size={20} color="white" style={stylesRegister.closeButtonIcon} />
                <Text style={stylesRegister.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* Modal de verificación */}
      <Modal visible={openVerificationModal} animationType="slide" transparent>
        <View style={stylesRegister.modalContainer}>
          <View style={stylesRegister.modalContent}>
            <Text style={stylesRegister.modalTitle}>Verificación de Usuario</Text>
            <View style={stylesRegister.inputContainer}>
              <Icon name="key" size={20} color="gray" style={stylesRegister.inputIcon} />
              <TextInput
                placeholder="Código de verificación"
                placeholderTextColor="gray"
                style={stylesRegister.textInput}
                onChangeText={setVerificationCode}
                value={verificationCode}
              />
            </View>
            {message ? <Text style={stylesRegister.errorMessage}>{message}</Text> : null}
            <TouchableOpacity style={stylesRegister.registerButton} onPress={handleVerification}>
              <Text style={stylesRegister.registerButtonText}>Validar Usuario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};



export default RegistroModal;
