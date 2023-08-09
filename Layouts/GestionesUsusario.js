import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { AntDesign, FontAwesome,Ionicons  } from '@expo/vector-icons';

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
    <View style={styles.card}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nombre Completo:</Text>
        <Text style={styles.valueComple}>{Nombre} {Apellidos}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{Correo}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Contraseña:</Text>
        <Text style={styles.value}>{Contraseña}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <AntDesign name="edit" size={24} color="#46741e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nombre Completo:</Text>
            <Text style={styles.modalValue}>{editNombre} {editApellidos}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', borderRadius: 14 }}>Correo</Text>
            <Text style={styles.modalValue}>{editCorreo}</Text>
<Text style={styles.modalLabel}>Contraseña Nueva:</Text>
<View style={styles.passwordInputContainer}>
  <TextInput
    style={styles.passwordInput}
    onChangeText={setEditPass}
    placeholder="Contraseña nueva"
    secureTextEntry={!showNewPassword} // Mostrar contraseña nueva solo si showNewPassword es false
  />
  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
    <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
  </TouchableOpacity>
</View>

<Text style={styles.modalLabel}>Repetir Contraseña:</Text>
<View style={styles.passwordInputContainer}>
  <TextInput
    style={styles.passwordInput}
    value={editRepeatPass}
    onChangeText={setEditRepeatPass}
    placeholder="Repetir contraseña"
    secureTextEntry={!showRepeatPassword} // Mostrar contraseña repetida solo si showRepeatPassword es false
  />
  <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
    <Ionicons name={showRepeatPassword ? "eye-off" : "eye"} size={24} color="gray" />
  </TouchableOpacity>
</View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <View style={styles.buttonContent}>
                  <Ionicons name="save" size={19} color="white" style={styles.buttonIcon}/>
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
              <View style={styles.buttonContent}>
                  <Ionicons name="close" size={20} color="white" style={styles.buttonIcon}/>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
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
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Gestión de Usuario</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={styles.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {contentData.map((content) => (
            <View style={styles.cardContainer} key={content.id}>
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


const styles = StyleSheet.create({
  container: {
    paddingTop: 10, // Ajustar el espacio superior para separar las tarjetas del título
    paddingBottom: 20, // Ajustar el espacio inferior para separar las tarjetas del borde inferior
  },
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContainer: {
    alignItems: 'center', // Centrar horizontalmente las tarjetas en el contenedor
    marginBottom: 20, // Agregar espacio entre las tarjetas
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#46741e'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns "Nombre Completo" to the left and Name and Surname to the right
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  valueComple: {
    flex: 2,
    fontSize: 16,
    color: 'black',
    marginTop: 18,
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalValue: {
    fontSize: 16,
    color: '#46741e',
    marginBottom: 11,
    marginTop: 9,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection:'row',
  },
  buttonIcon: {
    marginRight: 5, // Agregar margen a la derecha del icono
  },
  cancelButton: {
    backgroundColor: 'red', // Agrega el color de fondo deseado, por ejemplo, rojo
  },
});

export default AppUser;
