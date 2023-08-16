import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert,ActivityIndicator,RefreshControl } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import EditFacultadModal from './EditFacultad';
import axios from 'axios';

const { width } = Dimensions.get('window');

const cardWidth = width - 75;

const FacultadCard = ({ id, nombre, mision, vision, urlVideo, urlFacebook, urlSitioWeb, carreras, onSave }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    // Mostrar confirmación antes de eliminar la facultad
    Alert.alert(
      'Eliminar Facultad',
      `¿Estás seguro de eliminar la facultad "${nombre}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              // Hacer la solicitud DELETE al webservice con el ID de la facultad
              const response = await axios.delete(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/delete/${id}`);
              Alert.alert('Información','La facultad se a eliminado con exito');

              // Aquí podrías realizar acciones adicionales después de eliminar la facultad, si es necesario
            } catch (error) {
              console.error('Error al eliminar la facultad:', error);
              Alert.alert('Error', 'Ha ocurrido un error al eliminar la facultad.');
            }
          },
        },
      ]
    );
  };

  const handleSave = async (editedFacultad) => {
    console.log('Facultad editada:', editedFacultad);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{nombre}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={24} color="#46741e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Modal de edición de facultad */}
      <EditFacultadModal
        visible={modalVisible}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
        facultadData={{
          id: id,
          nombre: nombre,
          mision: mision,
          vision: vision,
          urlVideo: urlVideo,
          urlFacebook: urlFacebook,
          urlSitioWeb: urlSitioWeb,
          carreras: carreras,
        }}
      />
    </View>
  );
};

const GestiFacu = () => {
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFacultades = async () => {
    try {
      const apiUrl = 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getAll';
      const response = await fetch(apiUrl);
      const data = await response.json();
      setFacultades(data.facultad);
    } catch (error) {
      console.error('Error al obtener las facultades:', error);
    }
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFacultades();
  };

  useEffect(() => {
    fetchFacultades();
  }, []);

  const handleFacultadSave = async (editedFacultad) => {
    // Aquí puedes implementar la lógica para guardar los cambios en la facultad
    // Por ejemplo, podrías hacer una solicitud POST a la API para actualizar la facultad
    console.log('Facultad editada:', editedFacultad);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de facultades</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="green" style={styles.loadingIndicator} />
        ) : (
          facultades.map((facultad) => (
          <FacultadCard
          key={facultad.ID}
          id={facultad.ID}
          nombre={facultad.nombre}
          mision={facultad.mision}
          vision={facultad.vision}
          urlVideo={facultad.urlVideo}
          urlFacebook={facultad.urlFacebook}
          urlSitioWeb={facultad.UrlSitio}
          carreras={[]} // Aquí pasamos las carreras correspondientes a la facultad desde la API
          onSave={handleFacultadSave}
        />
        ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#46741e',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  carreraItem: {
    marginBottom: 10,
  },
  carreraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carreraDescription: {
    fontSize: 16,
    color: '#555555',
  },
});

export default GestiFacu;
