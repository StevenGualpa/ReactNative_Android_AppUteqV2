import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditFacultadModal = ({ visible, onSave, onCancel, facultadData }) => {
  const [editedNombre, setEditedNombre] = useState(facultadData.nombre);
  const [editedMision, setEditedMision] = useState(facultadData.mision);
  const [editedVision, setEditedVision] = useState(facultadData.vision);
  const [editedVideoURL, setEditedVideoURL] = useState(facultadData.urlVideo);
  const [editedUrlFacebook, setEditedUrlFacebook] = useState(facultadData.urlFacebook);
  const [editedUrlSitioWeb, setEditedUrlSitioWeb] = useState(facultadData.urlSitioWeb);

  useEffect(() => {
    setEditedNombre(facultadData.nombre);
    setEditedMision(facultadData.mision);
    setEditedVision(facultadData.vision);
    setEditedVideoURL(facultadData.urlVideo);
    setEditedUrlFacebook(facultadData.urlFacebook);
    setEditedUrlSitioWeb(facultadData.urlSitioWeb);
  }, [facultadData]);

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

  const isURLValid = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const isFacebookURLValid = (url) => {
    // Expresión regular para verificar si la URL tiene el formato correcto de Facebook
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
  
    return facebookRegex.test(url);
  };

  const isUteqURLValid = (url) => {
    // Expresión regular para verificar si la URL comienza con "https://www.uteq.edu.ec"
    const uteqRegex = /^https:\/\/www\.uteq\.edu\.ec(\/.*)?$/;
  
    return uteqRegex.test(url);
  };

  const handleSave = async () => {
    // Validar campos vacíos
    if (
      !editedNombre.trim() ||
      !editedMision.trim() ||
      !editedVision.trim() ||
      !editedVideoURL.trim() ||
      !editedUrlFacebook.trim() ||
      !editedUrlSitioWeb.trim()
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    // Validar URL del video promocional
    if (!(await isURLValid(editedVideoURL))) {
      Alert.alert('Error', 'La URL del video promocional no existe o no es válida');
      return;
    }

    // Validar URL de Facebook
    if (!isFacebookURLValid(editedUrlFacebook)) {
      Alert.alert('Error', 'La URL de Facebook no es válida');
      return;
    }

    // Validar URL del Sitio Web
    if (!isUteqURLValid(editedUrlSitioWeb)) {
      Alert.alert('Error', 'La URL del sitio web no es válida. Debe iniciar con "https://www.uteq.edu.ec"');
      return;
    }

    // Formatear la URL del video promocional antes de guardarla
    const formattedVideoURL = formatVideoURL(editedVideoURL);

    const editedFacultad = {
      id: facultadData.id,
      nombre: editedNombre,
      mision: editedMision,
      vision: editedVision,
      urlVideo: formattedVideoURL,
      urlFacebook: editedUrlFacebook,
      urlSitioWeb: editedUrlSitioWeb,
    };

    try {
      // Hacer la petición PUT al webservice
      const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/update/${facultadData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFacultad),
      });

      // Verificar si la petición fue exitosa
      if (response.ok) {
        // Llamar a la función onSave para guardar los cambios localmente
        onSave(editedFacultad);

        // Mostrar mensaje de éxito y ocultar el modal de edición
        Alert.alert('Facultad actualizada', 'Los datos de la facultad se han actualizado correctamente');
        onCancel();
      } else {
        // Mostrar mensaje de error si la petición no fue exitosa
        Alert.alert('Error', 'Hubo un problema al actualizar la facultad. Por favor, inténtalo nuevamente.');
      }
    } catch (error) {
      // Mostrar mensaje de error si hubo un error en la petición
      Alert.alert('Error', 'Hubo un problema al actualizar la facultad. Por favor, verifica tu conexión a Internet.');
    }

  };



  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={{ ...styles.modalContent}}>
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
    width: windowWidth * 1, // Hacer el ancho del modal el 90% del ancho de la pantalla
    maxHeight: windowHeight * 0.9, // Hacer la altura máxima del modal el 80% del alto de la pantalla
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#46741e'
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color:'#46741e'
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
  carreraItem: {
    marginBottom: 10,
  },
});

export default EditFacultadModal;

