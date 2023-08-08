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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Carrera</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre de la carrera:</Text>
        <TextInput
          style={styles.input}
          value={nombreCarrera}
          onChangeText={setNombreCarrera}
          placeholder="Ingrese el nombre de la carrera"
        />

        <Text style={styles.label}>Descripción de la carrera:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcionCarrera}
          onChangeText={setDescripcionCarrera}
          placeholder="Ingrese la descripción de la carrera"
          multiline
        />

        <Text style={styles.label}>URL de la imagen:</Text>
        <TextInput
          style={styles.input}
          value={urlImagen}
          onChangeText={setUrlImagen}
          placeholder="Ingrese la URL de la imagen"
        />

        <Text style={styles.label}>URL del sitio web:</Text>
        <TextInput
          style={styles.input}
          value={urlSitioWeb}
          onChangeText={setUrlSitioWeb}
          placeholder="Ingrese la URL del sitio web"
        />

        {/* Dropdown para seleccionar la facultad */}
        <Text style={styles.label}>Facultad:</Text>
        <Picker
          selectedValue={facultad}
          onValueChange={(itemValue) => setFacultad(itemValue)}
          style={styles.dropdown}
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Icon name="save" size={20} color="#ffffff" style={styles.icon} />
            <Text style={styles.botonTexto}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonLimpiar} onPress={limpiarCampos}>
            <Icon name="refresh" size={20} color="#ffffff" style={styles.icon} />
            <Text style={styles.botonTexto}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#46741e',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#46741e',
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    color: '#333333',
  },
  textArea: {
    height: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botonGuardar: {
    backgroundColor: '#46741e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonLimpiar: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
  imagePreview: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
  },
});




export default CrearCarreras;
