import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import 'moment/locale/es'; 
moment.locale('es');

import { stylesVisContenidos } from './Styles/Styles';
import axios from 'axios';

const ContentCard = () => {
  const [contentData, setContentData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentData();
  }, []);

  const fetchContentData = async () => {
    try {
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/multimedia/getAll');
      const data = await response.json();
      setContentData(data.multimedias);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los contenidos:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContentData();
    setRefreshing(false);
  };

  const handleReadMore = (link, title) => {
    Linking.openURL(link);
    registerView(title);
  };

  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de contenido:", { seccion: "Contenido", nombre: nombre });
      await axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        seccion: "Contenido",
        nombre: nombre
      });
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={stylesVisContenidos.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={stylesVisContenidos.header}>Vista de contenido</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={stylesVisContenidos.loadingIndicator} />
      ) : (
        contentData.map((content) => (
          <View key={content.ID} style={stylesVisContenidos.card}>
            <View style={stylesVisContenidos.logoContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={stylesVisContenidos.title}>{content.titulo}</Text>
              <Image source={{ uri: content.url_imageb }} style={stylesVisContenidos.logo} />
            </View>
            <View>
              <Text style={stylesVisContenidos.fecha}>{moment(content.created_at).format('LL')}</Text>
              <Text style={stylesVisContenidos.description}>{content.descripcion}</Text>
            </View>
            <TouchableOpacity style={stylesVisContenidos.button} onPress={() => handleReadMore(content.url_video, content.titulo)}>
              <Icon name="external-link" size={20} color="white" />
              <Text style={stylesVisContenidos.buttonText}>Ver contenido</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ContentCard;
