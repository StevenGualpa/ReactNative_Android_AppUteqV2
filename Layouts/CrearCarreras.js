import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';
import {stylesCrearCrr} from './Styles/Styles'

const CrearCarreras = () => {
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [descripcionCarrera, setDescripcionCarrera] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [urlSitioWeb, setUrlSitioWeb] = useState('');
  const [facultad, setFacultad] = useState('');
  const [facultadesList, setFacultadesList] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener las facultades desde el webservice
    axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getall')
      .then((response) => {
        setFacultadesList(response.data.facultad);
      })
      .catch((error) => {
        console.error('Error al obtener las facultades:', error);
      });
  }, []);
  
  // Lista de facultades disponibles (suponiendo que está definida en algún lugar del código)

  const isImageURL = async (url) => {
    const imageFormats = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp']; // Lista de formatos de imagen permitidos
  
    if (url.startsWith('data:image')) {
      // Si la URL comienza con "data:image", asumimos que es una URL válida de imagen en base64
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
  const carreraData = {
    nombre: nombreCarrera,
    descripcion: descripcionCarrera,
    imageURL: urlImagen,
    UrlSitio: urlSitioWeb,
    facultadID: facultad // Asegúrate de que esto sea un número
  };
  

  const handleGuardar = () => {
    if (!nombreCarrera || !descripcionCarrera || !urlImagen || !urlSitioWeb || !facultad) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (!urlSitioWeb.startsWith('https://www.uteq.edu.ec')) {
      Alert.alert('Error', 'La URL del sitio web debe comenzar con https://www.uteq.edu.ec');
      return;
    }

    isImageURL(urlImagen)
      .then((isValidImageURL) => {
        if (isValidImageURL) {
          const carreraData = {
            nombre: nombreCarrera,
            descripcion: descripcionCarrera,
            imageURL: urlImagen,
            UrlSitio: urlSitioWeb,
            facultadID: parseInt(facultad), // Asegúrate de que esto sea un número
          };

          axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/register', carreraData)
            .then((response) => {
              Alert.alert('Éxito', 'Carrera registrada exitosamente.');
              limpiarCampos();
            })
            .catch((error) => {
              console.error('Error al registrar la carrera:', error);
              Alert.alert('Error', 'Error al registrar la carrera.');
            });
        } else {
          Alert.alert('Error', 'La URL de la imagen no es válida.');
        }
      })
      .catch((error) => {
        console.error('Error al validar la URL de la imagen:', error);
        Alert.alert('Error', 'Ha ocurrido un error al validar la URL de la imagen.');
      });
  };

  const limpiarCampos = () => {
    setNombreCarrera('');
    setDescripcionCarrera('');
    setUrlImagen('');
    setUrlSitioWeb('');
    setFacultad('');
  };

  

  return (
    <View style={stylesCrearCrr.container}>
    <Text style={stylesCrearCrr.title}>Crear Carrera</Text>
    <ScrollView contentContainerStyle={stylesCrearCrr.scrollContent}>
      <View style={stylesCrearCrr.formContainer}>
        <Text style={stylesCrearCrr.label}>Nombre de la carrera:</Text>
        <TextInput
          style={stylesCrearCrr.input}
          value={nombreCarrera}
          onChangeText={setNombreCarrera}
          placeholder="Ingrese el nombre de la carrera"
        />

        <Text style={stylesCrearCrr.label}>Descripción de la carrera:</Text>
        <TextInput
          style={[stylesCrearCrr.input, stylesCrearCrr.textArea]}
          value={descripcionCarrera}
          onChangeText={setDescripcionCarrera}
          placeholder="Ingrese la descripción de la carrera"
          multiline
        />

        <Text style={stylesCrearCrr.label}>URL de la imagen:</Text>
        <TextInput
          style={stylesCrearCrr.input}
          value={urlImagen}
          onChangeText={setUrlImagen}
          placeholder="Ingrese la URL de la imagen"
        />

        <Text style={stylesCrearCrr.label}>URL del sitio web:</Text>
        <TextInput
          style={stylesCrearCrr.input}
          value={urlSitioWeb}
          onChangeText={setUrlSitioWeb}
          placeholder="Ingrese la URL del sitio web"
        />

        {/* Dropdown para seleccionar la facultad */}
        <Text style={stylesCrearCrr.label}>Facultad:</Text>
        <Picker
          selectedValue={facultad}
          onValueChange={(itemValue) => setFacultad(itemValue)}
          style={stylesCrearCrr.dropdown}
        >
          <Picker.Item label="Seleccione una facultad" value="" />
          {facultadesList.map((facultadItem) => (
            <Picker.Item
              key={facultadItem.ID}
              label={facultadItem.nombre}
              value={facultadItem.ID.toString()} // Convertimos el ID a cadena para el valor del Picker
            />
          ))}
        </Picker>

        <View style={stylesCrearCrr.buttonsContainer}>
          <TouchableOpacity style={stylesCrearCrr.botonGuardar} onPress={handleGuardar}>
            <Icon name="save" size={20} color="#ffffff" style={stylesCrearCrr.icon} />
            <Text style={stylesCrearCrr.botonTexto}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesCrearCrr.botonLimpiar} onPress={limpiarCampos}>
            <Icon name="refresh" size={20} color="#ffffff" style={stylesCrearCrr.icon} />
            <Text style={stylesCrearCrr.botonTexto}>Limpiar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CrearCarreras;
