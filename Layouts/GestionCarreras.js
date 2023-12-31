import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert,RefreshControl  } from 'react-native';
import { Card, Text, Image, Icon } from 'react-native-elements';
import axios from 'axios';
import EditarCarreraModal from './EditCarreras';
import { id } from 'date-fns/locale';
import {stylesGestionCrr} from './Styles/Styles'

const GestionCarreras = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/getAll'
        );
        setCarreras(response.data.carreras || response.data);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    const onRefresh = async () => {
      setRefreshing(true);
      // Limpiar los datos existentes al hacer refresh
      setCarreras([]);
      try {
        // Obtener los nuevos datos actualizados
        await fetchData();
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/delete/${id}`);
      setCarreras(carreras.filter(carrera => carrera.ID !== id));
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
    }
  };
  

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar Carrera',
      '¿Estás seguro de que deseas eliminar esta carrera?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => handleDelete(id),
        },
      ],
    );
  };

  const handleEditarCarrera = (carrera) => {
    console.log('Editar carrera:', carrera);
    setCarreraSeleccionada(carrera);
    setModalVisible(true);
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 ,color:'#46741e',textAlign:'center'}}>
        Lista de Carreras
      </Text>
      <FlatList
        data={carreras}
        keyExtractor={(item) => item.ID.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        renderItem={({ item }) => (
          <Card containerStyle={stylesGestionCrr.card}>
            <Image source={{ uri: item.imageURL }} style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            <Card.Title>{item.nombre}</Card.Title>
            <Card.Divider />
            <Text>{item.descripcion.substring(0, 50)}...</Text>
            <View style={stylesGestionCrr.buttonsContainer}>
              <TouchableOpacity style={stylesGestionCrr.editButton} onPress={() => handleEditarCarrera(item)}>
                <Icon name="edit" type="font-awesome" color="#fff" />
                <Text style={stylesGestionCrr.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesGestionCrr.deleteButton} onPress={() => confirmDelete(item.ID)}>
                <Icon name="trash" type="font-awesome" color="#fff" />
                <Text style={stylesGestionCrr.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    <EditarCarreraModal
  visible={modalVisible}
  carrera={carreraSeleccionada} // Aquí pasamos la carrera seleccionada
  onClose={() => setModalVisible(false)}
  onEdit={(editedCarrera) => {
    // Aquí puedes realizar la lógica para editar la carrera en la lista
    // Por ejemplo, puedes actualizar el estado de la lista de carreras con los cambios
    console.log('Carrera editada:', editedCarrera);
    setModalVisible(false);
  }}
/>
    </View>
  );
};

export default GestionCarreras;
