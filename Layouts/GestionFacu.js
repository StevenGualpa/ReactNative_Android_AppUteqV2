import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert,ActivityIndicator,RefreshControl } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import EditFacultadModal from './EditFacultad';
import axios from 'axios';
import {stylesGestionF} from './Styles/Styles'

const { width } = Dimensions.get('window');

const cardWidth = width - 75;

const FacultadCard = ({ id, nombre, mision, vision, urlVideo, urlFacebook, urlSitioWeb,correo,latitud,longitud}) => {

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
    <View style={stylesGestionF.card}>
      <Text style={stylesGestionF.title}>{nombre}</Text>
      <View style={stylesGestionF.buttonContainer}>
        <TouchableOpacity style={stylesGestionF.button} onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={24} color="#46741e" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesGestionF.button} onPress={handleDelete}>
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
          correo:correo,
          latitud:latitud,
          longitud:longitud,
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

  return (
    <View style={stylesGestionF.container}>
      <Text style={stylesGestionF.header}>Gestión de facultades</Text>
      <ScrollView
        contentContainerStyle={stylesGestionF.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="green" style={stylesGestionF.loadingIndicator} />
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
          correo={facultad.correo}
          latitud={facultad.latitud}
          longitud={facultad.longitud}
        />
        ))
        )}
      </ScrollView>
    </View>
  );
};



export default GestiFacu;
