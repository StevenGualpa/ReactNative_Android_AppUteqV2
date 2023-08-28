import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import {stylesEditCrr} from './Styles/Styles'
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
        <View style={stylesEditCrr.dropdownContainer}>
          <View style={stylesEditCrr.ContenedorFacultades}>
            <Text style={stylesEditCrr.facultadHeaderText}>Facultades</Text>
            <ScrollView style={stylesEditCrr.scrollView}>
              {facultades.map((facultad, index) => (
                <TouchableOpacity
                  key={index}
                  style={stylesEditCrr.dropdownItem}
                  onPress={() => {
                    setSelectedFacultad(facultad.ID);
                    setDropdownVisible(false);
                  }}>
                  <Text style={stylesEditCrr.dropdownText}>{facultad.nombre}</Text>
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
      <View style={stylesEditCrr.modalContainer}>
        <View style={stylesEditCrr.modalContent}>
          <Text style={stylesEditCrr.modalTitle}>Editar Carrera</Text>
          <Text style={stylesEditCrr.modalLabel}>Nombre:</Text>
          <TextInput
            style={stylesEditCrr.modalInput}
            value={editNombre}
            onChangeText={setEditNombre}
            placeholder="Nombre de la carrera"
          />
          <Text style={stylesEditCrr.modalLabel}>Descripción:</Text>
          <TextInput
            style={stylesEditCrr.modalInput}
            value={editDescripcion}
            onChangeText={setEditDescripcion}
            multiline
            placeholder="Descripción de la carrera"
          />
          <Text style={stylesEditCrr.modalLabel}>URL de la imagen:</Text>
          <TextInput
            style={stylesEditCrr.modalInput}
            value={editUrlImagen}
            onChangeText={setEditUrlImagen}
            placeholder="Ingrese la URL de la imagen"
          />
          <Text style={stylesEditCrr.modalLabel}>URL del sitio web:</Text>
          <TextInput
            style={stylesEditCrr.modalInput}
            value={editUrlSitioWeb}
            onChangeText={setEditUrlSitioWeb}
            placeholder="Ingrese la URL del sitio web"
          />
          <Text style={stylesEditCrr.modalLabel}>Facultad:</Text>
          <TouchableOpacity style={stylesEditCrr.facultadSelector} onPress={() => setDropdownVisible(true)}>
            <Text style={stylesEditCrr.facultadText}>{selectedFacultad ? getFacultadName(selectedFacultad) : 'Selecciona una facultad'}</Text>
          </TouchableOpacity>
          {renderDropdown()}
          <View style={stylesEditCrr.modalButtonContainer}>
            <TouchableOpacity style={stylesEditCrr.modalButton} onPress={handleSave}>
              <Text style={stylesEditCrr.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesEditCrr.modalButton} onPress={onClose}>
              <Text style={stylesEditCrr.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default EditarCarreraModal;
