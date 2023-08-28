import React, { useState, useEffect } from 'react';
import { View, Text, stylesGestionUserheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { AntDesign, FontAwesome,Ionicons  } from '@expo/vector-icons';
import {stylesGestionUser} from './Styles/Styles'

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

const ProfileCard = ({ id, Nombre, Apellidos, Correo, Contraseña, onDelete, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editNombre, setEditNombre] = useState(Nombre);
  const [editApellidos, setEditApellidos] = useState(Apellidos);
  const [editCorreo, setEditCorreo] = useState(Correo);
  const [editPass, setEditPass] = useState(Contraseña);
  const [editRepeatPass, setEditRepeatPass] = useState('');
const [showNewPassword, setShowNewPassword] = useState(false);
const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Función para manejar la acción de edición
  const handleEdit = () => {
    setModalVisible(true);

  };
  const alertMessageStyles = { textAlign: 'center' };
  const handleDelete = () => {
    // Mostrar confirmación antes de eliminar el contenido
    Alert.alert(
      `¿Desea eliminar "${Nombre}"?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  // Función para manejar la acción de cancelar edición
  const handleCancel = () => {
    // Restaurar los valores originales
    setEditNombre(Nombre);
    setEditApellidos(Apellidos);
    setEditCorreo(Correo);
    setEditPass(Contraseña);
    setModalVisible(false);
  };

  //VALIDACION PARA LA CQUE LA CLAVE DEBA CONTENER MAYUSCULAS, MINUSCULAS, NUMERO Y CARACTERES ESPECIALES DE 8 A 15
  const isValidPassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]).{8,15}$/;
    return regex.test(value);
  };
  // Función para manejar la acción de guardar cambios
  const handleSave = () => {
    // Validar campos vacíos
    if ( !editCorreo.trim() || !editPass.trim()) {
      Alert.alert('Campos vacíos', 'Por favor, complete todos los campos antes de guardar los cambios.');
      return;
    }
    const isValidAdminPassword = isValidPassword(editPass);
    if (!isValidAdminPassword) {
      Alert.alert('Contraseña', 'La clave debe tener entre 8 y 15 caracteres y contener letras mayúsculas, minúsculas, números y caracteres especiales.', [{ text: 'OK' }],
        { multiline: true, style: alertMessageStyles }
      );
      return;
    }
    if (editPass !== editRepeatPass) {
      Alert.alert('Contraseñas no coinciden', 'Por favor, asegúrese de que las contraseñas nueva y repetida sean iguales.');
      return;
    }
  

    // Si los datos son válidos, muestra el diálogo de confirmación
    Alert.alert(
      'Guardar cambios',
      '¿Desea guardar los cambios?',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            setEditNombre(Nombre);
            setEditApellidos(Apellidos);
            setEditCorreo(Correo);
            setEditPass(Contraseña);
            setModalVisible(false);

          },
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {

              const editedData = {
               id:id,
               password: editPass,
              };

              // Actualizar el documento con los datos editados
              await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
              });
              console.log("edit", editedData);
              // Mostrar mensaje de éxito y actualizar la información en la lista
              Alert.alert('Los datos se modificaron correctamente');
              onUpdate(id, editedData);
              setModalVisible(false);
            } catch (error) {
              console.error('Error al guardar los cambios:', error);
            }
          },
        },
      ]
    );

  };

  return (
    <View style={stylesGestionUser.card}>
      <Text style={stylesGestionUser.title}>Perfil de Usuario</Text>
      <View style={stylesGestionUser.profileInfo}>
        <Text style={stylesGestionUser.label}>Nombre Completo:</Text>
        <Text style={stylesGestionUser.valueComple}>{Nombre} {Apellidos}</Text>
      </View>
      <View style={stylesGestionUser.profileInfo}>
        <Text style={stylesGestionUser.label}>Correo:</Text>
        <Text style={stylesGestionUser.value}>{Correo}</Text>
      </View>
      <View style={stylesGestionUser.profileInfo}>
        <Text style={stylesGestionUser.label}>Contraseña:</Text>
        <Text style={stylesGestionUser.value}>{Contraseña}</Text>
      </View>
      <View style={stylesGestionUser.buttonContainer}>
        <TouchableOpacity style={stylesGestionUser.button} onPress={handleEdit}>
          <AntDesign name="edit" size={24} color="#46741e" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesGestionUser.button} onPress={handleDelete}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={stylesGestionUser.modalContainer}>
          <View style={stylesGestionUser.modalContent}>
            <Text style={stylesGestionUser.modalTitle}>Editar Usuario</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nombre Completo:</Text>
            <Text style={stylesGestionUser.modalValue}>{editNombre} {editApellidos}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', borderRadius: 14 }}>Correo</Text>
            <Text style={stylesGestionUser.modalValue}>{editCorreo}</Text>
<Text style={stylesGestionUser.modalLabel}>Contraseña Nueva:</Text>
<View style={stylesGestionUser.passwordInputContainer}>
  <TextInput
    style={stylesGestionUser.passwordInput}
    onChangeText={setEditPass}
    placeholder="Contraseña nueva"
    secureTextEntry={!showNewPassword} // Mostrar contraseña nueva solo si showNewPassword es false
  />
  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
    <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
  </TouchableOpacity>
</View>

<Text style={stylesGestionUser.modalLabel}>Repetir Contraseña:</Text>
<View style={stylesGestionUser.passwordInputContainer}>
  <TextInput
    style={stylesGestionUser.passwordInput}
    value={editRepeatPass}
    onChangeText={setEditRepeatPass}
    placeholder="Repetir contraseña"
    secureTextEntry={!showRepeatPassword} // Mostrar contraseña repetida solo si showRepeatPassword es false
  />
  <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
    <Ionicons name={showRepeatPassword ? "eye-off" : "eye"} size={24} color="gray" />
  </TouchableOpacity>
</View>
            <View style={stylesGestionUser.modalButtonContainer}>
              <TouchableOpacity style={stylesGestionUser.modalButton} onPress={handleSave}>
              <View style={stylesGestionUser.buttonContent}>
                  <Ionicons name="save" size={19} color="white" style={stylesGestionUser.buttonIcon}/>
                  <Text style={stylesGestionUser.modalButtonText}>Guardar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={[stylesGestionUser.modalButton, stylesGestionUser.cancelButton]} onPress={handleCancel}>
              <View style={stylesGestionUser.buttonContent}>
                  <Ionicons name="close" size={20} color="white" style={stylesGestionUser.buttonIcon}/>
                  <Text style={stylesGestionUser.modalButtonText}>Cancelar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AppUser = () => {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Limpiar los datos existentes al hacer refresh
    setContentData([]);
    try {
      // Obtener los nuevos datos actualizados
      await fetchContentData();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchContentData = () => {
    fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/getRoleUsers/Administrador')
      .then((response) => response.json())
      .then((data) => {
        setContentData(
          data.usuarios.map((item) => ({
            id: item.ID,
            Nombre: item.nombre,
            Apellidos: item.apellido,
            Correo: item.email,
            Contraseña: item.password
          }))
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false); // Aquí finalizas el loading, ya sea que ocurra un error o se complete exitosamente la solicitud
      });
  };

  useEffect(() => {
    fetchContentData();
  }, []);


  const handleDeleteUser = async (id) => {
    try {
      // Eliminar el documento correspondiente al contenido
      await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/deleteUser/${id}`, {
        method: 'DELETE',
      });

      // Actualizar la lista de contenido en el estado
      setContentData((prevData) => prevData.filter((content) => content.id !== id));
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
    }
  };
  const onUpdate = (id, updatedData) => {
    // Update the state to reflect the changes made to the user data
    setContentData((prevData) =>
      prevData.map((content) => (content.id === id ? { ...content, ...updatedData } : content))
    );
  };

  return (
    <View style={stylesGestionUser.titleContainer}>
      <Text style={stylesGestionUser.title}>Gestión de Usuario</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={stylesGestionUser.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={stylesGestionUser.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {contentData.map((content) => (
            <View style={stylesGestionUser.cardContainer} key={content.id}>
              <ProfileCard
                key={content.id}
                id={content.id}
                Nombre={content.Nombre}
                Apellidos={content.Apellidos}
                Correo={content.Correo}
                Contraseña={content.Contraseña}
                onDelete={handleDeleteUser}
                onUpdate={onUpdate}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};




export default AppUser;
