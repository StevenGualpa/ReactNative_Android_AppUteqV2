import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditFacultadModal = ({ visible, onSave, onCancel, facultadData }) => {
  console.log('facultadData:', facultadData);
  const [editedNombre, setEditedNombre] = useState(facultadData.nombre);
  const [editedMision, setEditedMision] = useState(facultadData.mision);
  const [editedVision, setEditedVision] = useState(facultadData.vision);
  const [editedVideoURL, setEditedVideoURL] = useState(facultadData.urlVideo);
  const [editedUrlFacebook, setEditedUrlFacebook] = useState(facultadData.urlFacebook);
  const [editedUrlSitioWeb, setEditedUrlSitioWeb] = useState(facultadData.urlSitioWeb);
  const [editedCorreo, setEditedCorreo] = useState(facultadData.correo);
  const [editedLatitud, setEditedLatitud] = useState(facultadData.latitud);
  const [editedLongitud, setEditedLongitud] = useState(facultadData.longitud);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: editedLatitud || '',
    longitude: editedLongitud || '',
  });

  useEffect(() => {
    setEditedNombre(facultadData.nombre);
    setEditedMision(facultadData.mision);
    setEditedVision(facultadData.vision);
    setEditedVideoURL(facultadData.urlVideo);
    setEditedUrlFacebook(facultadData.urlFacebook);
    setEditedUrlSitioWeb(facultadData.urlSitioWeb);
    setEditedCorreo(facultadData.correo);
    setEditedLatitud(facultadData.latitud);
    setEditedLongitud(facultadData.longitud);
     // Actualizar la dirección si las coordenadas están disponibles
     if (facultadData.latitud && facultadData.longitud) {
      setAddress(`${facultadData.latitud}, ${facultadData.longitud}`);
    }
  }, [facultadData]);

  const isURLValid = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  const isValidCoordinate = (value) => {
    if (value.includes(',')) {
      const [lat, lon] = value.split(',');
      return !isNaN(parseFloat(lat.trim())) && !isNaN(parseFloat(lon.trim()));
    }
    return false;
  };
  const isFacebookURLValid = (url) => {
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
    return facebookRegex.test(url);
  };

  const isUteqURLValid = (url) => {
    const uteqRegex = /^https:\/\/www\.uteq\.edu\.ec(\/.*)?$/;
    return uteqRegex.test(url);
  };

  const openGoogleMaps = () => {
    Linking.openURL('https://www.google.com/maps')
      .catch(() => {
        Alert.alert('Error', 'No se puede abrir Google Maps.');
      });
  };

  const handleGetCoordinates = async () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Ingrese una dirección válida.');
      return;
    }

    const apiKey = 'AIzaSyD0ONVovLBMhzWI2nU0XEkJguQO-y_cJrI'; // Reemplaza con tu API key de Google Maps
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingApiUrl);
      const data = await response.json();
      console.log('Geocoding API response:', data);
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({
          latitude: location.lat.toString(),
          longitude: location.lng.toString(),
        });
        setAddress(`${location.lat}, ${location.lng}`);
        console.log('Latitud:', location.lat);
        console.log('Longitud:', location.lng);
        Alert.alert('Éxito', 'Coordenadas obtenidas correctamente.');
      } else {
        Alert.alert('Error', 'No se pudo obtener las coordenadas.');
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      Alert.alert('Error', 'Ha ocurrido un error al obtener las coordenadas.');
    }
  };

  const handleSave = async () => {
    if (
      !editedNombre.trim() ||
      !editedMision.trim() ||
      !editedVision.trim() ||
      !editedVideoURL.trim() ||
      !editedUrlFacebook.trim() ||
      !editedUrlSitioWeb.trim() ||
      !editedCorreo.trim() ||
      !coordinates.latitude.trim() ||
      !coordinates.longitude.trim() ||
      address.trim()===''
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    const formatVideoURL = (url) => {
      // Expresión regular para verificar si la URL tiene el formato correcto de YouTube
      const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+).*$/;
    
      // Expresión regular para verificar si la URL ya tiene el formato de inserción de YouTube
      const embedRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+).*$/;
    
      // Comprobar si la URL ya tiene el formato correcto (contiene "embed")
      if (embedRegex.test(url)) {
        return url; // Si ya tiene el formato correcto, simplemente devolvemos la misma URL
      }
    
      // Verificar si la URL tiene el formato correcto de YouTube
      if (youtubeRegex.test(url)) {
        const videoId = url.match(youtubeRegex)[3];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    
      // Si la URL no es válida, simplemente devolvemos la misma URL
      return url;
    };
   
    if (!(await isURLValid(editedVideoURL))) {
      Alert.alert('Error', 'La URL del video promocional no existe o no es válida');
      return;
    }

    if (!isFacebookURLValid(editedUrlFacebook)) {
      Alert.alert('Error', 'La URL de Facebook no es válida');
      return;
    }

    if (!isUteqURLValid(editedUrlSitioWeb)) {
      Alert.alert('Error', 'La URL del sitio web no es válida. Debe iniciar con "https://www.uteq.edu.ec"');
      return;
    }
    const formattedVideoURL = formatVideoURL(editedVideoURL);

    const editedFacultad = {
      id: facultadData.id,
      nombre: editedNombre,
      mision: editedMision,
      vision: editedVision,
      urlVideo: formattedVideoURL,
      urlFacebook: editedUrlFacebook,
      urlSitioWeb: editedUrlSitioWeb,
      correo: editedCorreo,
      latitud: coordinates.latitude,
      longitud: coordinates.longitude,
    };

    try {
      const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/update/${facultadData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFacultad),
      });

      if (response.ok) {
        onSave(editedFacultad);
        Alert.alert('Facultad actualizada', 'Los datos de la facultad se han actualizado correctamente');
        onCancel();
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar la facultad. Por favor, inténtalo nuevamente.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar la facultad. Por favor, verifica tu conexión a Internet.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Editar Facultad</Text>

            <Text style={styles.modalLabel}>Nombre de la Facultad</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre de la facultad"
              value={editedNombre}
              onChangeText={setEditedNombre}
            />

            <Text style={styles.modalLabel}>Misión</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Misión"
              multiline
              value={editedMision}
              onChangeText={setEditedMision}
            />

            <Text style={styles.modalLabel}>Visión</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Visión"
              multiline
              value={editedVision}
              onChangeText={setEditedVision}
            />

            <Text style={styles.modalLabel}>URL del Video Promocional</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="URL del video promocional"
              value={editedVideoURL}
              onChangeText={setEditedVideoURL}
            />

            <Text style={styles.modalLabel}>URL de Facebook</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="URL de Facebook"
              value={editedUrlFacebook}
              onChangeText={setEditedUrlFacebook}
            />

            <Text style={styles.modalLabel}>URL del Sitio Web</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="URL del sitio web"
              value={editedUrlSitioWeb}
              onChangeText={setEditedUrlSitioWeb}
            />

            <Text style={styles.modalLabel}>Dirección de Gmail</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Dirección de Gmail"
              value={editedCorreo}
              onChangeText={setEditedCorreo}
            />

            <Text style={styles.modalLabel}>Coordenadas (Latitud, Longitud) o Dirección</Text>
            <View style={styles.coordinatesContainer}>
            <TextInput
                style={styles.coordinateInput}
                placeholder="Latitud, Longitud o dirección"
                value={address}
                onChangeText={(value) => {
                  setAddress(value);

                  // Comprobar si la dirección es válida antes de actualizar las coordenadas
                  if (value.trim() !== '' && isValidCoordinate(value)) {
                    const [lat, lon] = value.split(',');
                    setCoordinates({ latitude: lat.trim(), longitude: lon.trim() });
                  } else {
                    setCoordinates({ latitude: '', longitude: '' });
                  }
                }}
              />
              <TouchableOpacity style={styles.getCoordinatesButton} onPress={handleGetCoordinates}>
              <Icon name="search" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.googleMapsButton} onPress={openGoogleMaps}>
                <Icon name="map" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={{ ...styles.modalButton, backgroundColor: '#46741e' }}
                onPress={handleSave}
              >
                <Icon name="save" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.modalButton, backgroundColor: '#d32f2f' }}
                onPress={onCancel}
              >
                <Icon name="close" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    width: windowWidth * 1,
    maxHeight: windowHeight * 0.9,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#46741e',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 150,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  getCoordinatesButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  getCoordinatesButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleMapsButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    padding: 10,
    marginLeft:5
  },
  coordinateInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: '#333333',
  },
});

export default EditFacultadModal;
