import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { stylesPerfil } from './Styles/Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = (id,Contraseña) => {

    //Verificamos si jalamos el id
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation(); // Obtener el objeto de navegación

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [editPass, setEditPass] = useState(Contraseña);

  const handleSavePassword = () => {
    if ( !editPass || !repeatNewPassword) {
      Alert.alert('Error', 'Ninguno de los campos puede estar vacío.');
      return;
    }

    if (!isValidPassword(editPass)) {
      Alert.alert(
        'Error',
        'La contraseña nueva debe tener entre 8 y 15 caracteres y contener una combinación de mayúsculas, minúsculas, números y caracteres especiales.'
      );
      return;
    }

    if (editPass !== repeatNewPassword) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden.');
      return;
    }

    Alert.alert(
      'Guardar cambios',
      '¿Desea guardar los cambios?',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            setEditPass(Contraseña);
            setModalVisible(false);

          },
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              const userId = user.ID; // Aquí obtienes el ID del usuario desde el contexto
              const editedData = {
                id: userId,
                password: editPass,
              };
          
              // Actualizar el documento con los datos editados
              await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
              });
              console.log("edit", editedData);
              // Mostrar mensaje de éxiton
              Alert.alert('Los datos se modificaron correctamente');
              setModalVisible(false);
            } catch (error) {
              console.error('Error al guardar los cambios:', error);
            }          
          },
        },
      ]
    );
    setModalVisible(false);
  };

  const handleLogout = () => {
    try {
      // Limpia el estado del usuario en el contexto
      setUser(null);
    navigation.navigate("Login"); // Asegúrate de que 'LoginScreen' sea el nombre correcto de tu pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const isValidPassword = (password) => {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return passwordRegex.test(password);
  };
  const openModal = () => {
    // Limpia los estados de los inputs
    
    setEditPass('');
    setRepeatNewPassword('');
    // Abre el modal
    setModalVisible(true);
  };

  return (
    <View style={stylesPerfil.container}>
      <View style={stylesPerfil.profileContainer}>
        <View style={stylesPerfil.profileCard}>
          <Image
            source={require('./iconos/Avatar.png')}
            style={stylesPerfil.profilePicture}
          />
        </View>
        <Text style={stylesPerfil.text}>{user ? user.nombre +" "+ user.apellido : 'Nombre no disponible'}</Text>
        <View style={stylesPerfil.line} />
        <Text style={stylesPerfil.label}>  Nombres  </Text>

        <Text style={stylesPerfil.textCorre}>{user ? user.email : 'Correo no disponible'}</Text>

        {/* Botón "Cambiar Clave" */}
        <TouchableOpacity style={stylesPerfil.changePasswordButton} onPress={openModal}>
          <Icon name="lock" size={windowWidth * 0.05} color="#6A6C88" />
          <Text style={stylesPerfil.buttonText}> Cambiar Clave </Text>
        </TouchableOpacity>

        {/* Botón "Cerrar Sesión" */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="sign-out" size={windowWidth * 0.05} color="#6A6C88" />
          <Text style={styles.buttonText}> Cerrar sesión </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar la clave */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Clave</Text>
          <Text style={styles.modalLabel}>Nombre:</Text>
          <Text style={styles.modalText}>{user? user.nombre +" "+ user.apellido : 'Nombre no disponible'}</Text>

          <Text style={styles.modalLabel}>Correo:</Text>
          <Text style={styles.modalText}>{user ? user.email : 'Correo no disponible'}</Text>

        

          <Text style={styles.modalLabel}>Clave Nueva:</Text>
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalInput}
              value={editPass}
              onChangeText={setEditPass}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon name={showNewPassword ? 'eye-slash' : 'eye'} size={windowWidth * 0.05} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalLabel}>Repetir Clave Nueva:</Text>
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalInput}
              value={repeatNewPassword}
              onChangeText={setRepeatNewPassword}
              secureTextEntry={!showRepeatNewPassword}
            />
            <TouchableOpacity onPress={() => setShowRepeatNewPassword(!showRepeatNewPassword)}>
              <Icon name={showRepeatNewPassword ? 'eye-slash' : 'eye'} size={windowWidth * 0.05} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Botón "Guardar" */}
          <TouchableOpacity style={styles.modalSaveButton} onPress={handleSavePassword}>
            <Icon name="save" size={windowWidth * 0.05} color="#FFFFFF" />
            <Text style={styles.buttonTextModal}>Guardar</Text>
          </TouchableOpacity>

          {/* Botón "Cancelar" */}
          <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={windowWidth * 0.05} color="#FFFFFF" />
            <Text style={styles.buttonTextModal}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderColor: '#46741e', // Color del borde
    borderWidth: 3, // Ancho del borde
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileContainer: {
    flex: 1, // Expande el profileContainer por toda la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.1,
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#f5f6fa',
  },
  profilePicture: {
    resizeMode: 'stretch',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginBottom: windowHeight * 0.01,
  },
  label: {
    fontSize: windowWidth * 0.04,
    color: '#f5f6fa',
    marginBottom: windowHeight * 0.01,
    borderRadius: 25,
    backgroundColor: '#46741e',
    padding: 5,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  textCorre: {
    fontSize: windowWidth * 0.04,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
    color: '#2a2d3f',
  },
  buttonText: {
    color: '#6A6C88',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 19,
  },
  buttonTextModal: {
    color: '#f5f6fa',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 19,
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
    marginTop: -windowWidth * 0.2, // Ajusta el margen superior para que la tarjeta esté un poco más arriba
    marginBottom: windowWidth * 0.0,
    elevation: 10, // Agrega la elevación (sombra) aquí
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  changePasswordButton: {
    borderColor: '#46741e', // Color del borde
    borderWidth: 3, // Ancho del borde
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',

  },
  // Estilos para el modal
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalInput: {
    flex: 1,
  },
  modalSaveButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalCancelButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#46741e', // Color de la línea
    marginBottom: 5,
  },
});

export default ProfileScreen;
