import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';

const EditarCarreraModal = ({ visible, carrera, onClose, onEdit }) => {
  const [editNombre, setEditNombre] = useState(carrera ? carrera.nombre : '');
  const [editDescripcion, setEditDescripcion] = useState(carrera ? carrera.descripcion : '');
  const [editUrlImagen, setEditUrlImagen] = useState(carrera ? carrera.imageURL : '');
  const [editUrlSitioWeb, setEditUrlSitioWeb] = useState(carrera ? carrera.UrlSitio : '');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFacultad, setSelectedFacultad] = useState(carrera ? carrera.facultadID : null);
  const [facultades, setFacultades] = useState([]);

  useEffect(() => {
    setEditNombre(carrera ? carrera.nombre : '');
    setEditDescripcion(carrera ? carrera.descripcion : '');
    setEditUrlImagen(carrera ? carrera.imageURL : '');
    setEditUrlSitioWeb(carrera ? carrera.UrlSitio : '');
    setSelectedFacultad(carrera ? carrera.facultadID : null);
    fetchFacultades();
  }, [carrera]);

  const fetchFacultades = async () => {
    try {
      const response = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getAll');
      setFacultades(response.data.facultad);
    } catch (error) {
      console.error('Error al obtener las facultades:', error);
    }
  };

  const getFacultadName = (id) => {
    const facultad = facultades.find((fac) => fac.ID === id);
    return facultad ? facultad.nombre : '';
  };

  const renderDropdown = () => {
    return (
      <Modal visible={dropdownVisible} transparent onRequestClose={() => setDropdownVisible(false)}>
        <View style={styles.dropdownContainer}>
          <View style={styles.ContenedorFacultades}>
            <Text style={styles.facultadHeaderText}>Facultades</Text>
            <ScrollView style={styles.scrollView}>
              {facultades.map((facultad, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedFacultad(facultad.ID);
                    setDropdownVisible(false);
                  }}>
                  <Text style={styles.dropdownText}>{facultad.nombre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const isImageURL = async (url) => {
    const imageFormats = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
    if (url.startsWith('data:image')) {
      return true;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) return false;
      const contentType = response.headers.get('content-type');
      if (!contentType) return false;
      const extension = contentType.split('/').pop().toLowerCase();
      return imageFormats.includes(extension);
    } catch (error) {
      return false;
    }
  };

  const handleSave = async () => {
    // Validar campos requeridos
    if (!editNombre || !editDescripcion || !editUrlImagen || !editUrlSitioWeb || !selectedFacultad) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
  
    // Validar URL del sitio web
    if (!editUrlSitioWeb.startsWith('https://www.uteq.edu.ec')) {
      Alert.alert('Error', 'La URL del sitio web debe comenzar con https://www.uteq.edu.ec');
      return;
    }
  
    // Validar la URL de la imagen
    const isValidImageURL = await isImageURL(editUrlImagen);
    if (!isValidImageURL) {
      Alert.alert('Error', 'La URL de la imagen no es válida o no es una imagen.');
      return;
    }
  
    // Preparar datos para la solicitud PUT
    const updatedCarrera = {
      nombre: editNombre,
      descripcion: editDescripcion,
      imageURL: editUrlImagen,
      UrlSitio: editUrlSitioWeb,
      facultadID: selectedFacultad,
    };
  
    try {
      await axios.put(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/update/${carrera.ID}`, updatedCarrera);
  
      Alert.alert('Éxito', 'La carrera ha sido actualizada con éxito.');
        onClose();
      if (onEdit) {
        onEdit(updatedCarrera);
      }
    } catch (error) {
      // Manejar error
      console.error('Error al actualizar la carrera:', error);
      Alert.alert('Error', 'Ha ocurrido un error al actualizar la carrera. Por favor, inténtelo de nuevo.');
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const modalContentWidth = windowWidth > 400 ? '80%' : '90%';

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Carrera</Text>
          <Text style={styles.modalLabel}>Nombre:</Text>
          <TextInput
            style={styles.modalInput}
            value={editNombre}
            onChangeText={setEditNombre}
            placeholder="Nombre de la carrera"
          />
          <Text style={styles.modalLabel}>Descripción:</Text>
          <TextInput
            style={styles.modalInput}
            value={editDescripcion}
            onChangeText={setEditDescripcion}
            multiline
            placeholder="Descripción de la carrera"
          />
          <Text style={styles.modalLabel}>URL de la imagen:</Text>
          <TextInput
            style={styles.modalInput}
            value={editUrlImagen}
            onChangeText={setEditUrlImagen}
            placeholder="Ingrese la URL de la imagen"
          />
          <Text style={styles.modalLabel}>URL del sitio web:</Text>
          <TextInput
            style={styles.modalInput}
            value={editUrlSitioWeb}
            onChangeText={setEditUrlSitioWeb}
            placeholder="Ingrese la URL del sitio web"
          />
          <Text style={styles.modalLabel}>Facultad:</Text>
          <TouchableOpacity style={styles.facultadSelector} onPress={() => setDropdownVisible(true)}>
            <Text style={styles.facultadText}>{selectedFacultad ? getFacultadName(selectedFacultad) : 'Selecciona una facultad'}</Text>
          </TouchableOpacity>
          {renderDropdown()}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#46741e',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#46741e',
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
  dropdownContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 15,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
  facultadSelector: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  facultadText: {
    fontSize: 16,
  },
  ContenedorFacultades: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    width: '95%',
    borderRadius: 15,
    
  },
  scrollView: {
    width: '100%',
  },
  facultadHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 15,
    color: '#46741e',
  },
});

export default EditarCarreraModal;
