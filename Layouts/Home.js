import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, Animated,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es'; 
import { BackHandler,Alert  } from 'react-native';
import { styleshome } from './Styles/Styles'; // Ajusta la ruta si es necesario



moment.locale('es');
const Home = () => {
  const navigation = useNavigation();

  //declaracion de estados
  const [refreshing, setRefreshing] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);
  const [noticeData, setnoticeData] = useState([]);
  const [loading, setLoading] = useState(true);

 /* const blockBackButton = () => {
    Alert.alert(
      "Confirmar salida",
      "¿Estás seguro de que quieres salir de la aplicación?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", onPress: () => BackHandler.exitApp() }
      ]
    );
    return true; // Indica que el botón de retroceso está bloqueado
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', blockBackButton);

      // Limpia el listener cuando la pantalla ya no tiene el foco
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', blockBackButton);
      };
    }, [])
  );*/

  // Función para obtener los contenidos desde heroku
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
 // Función para manejar el evento de "pull to refresh" en la lista de contenidos
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContentData();
    setRefreshing(false);
  };

  const handleButtonPress = (link) => {
    Linking.openURL(link);
  };
  
  // Función para obtener los datos de las revistas desde la API
  const fetchMagazineData = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/StevenGualpa/Api_Historial/Revistas'); // La ruta de tu API
      setMagazineData(response.data);
    } catch (error) {
      console.error('Error al obtener los contenidos de la API:', error);
    }
  };

  useEffect(() => {
    fetchMagazineData();
  }, []);


  // Función para obtener los datos de las noticias desde la API
  const fetchnoticeData = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/StevenGualpa/Api_Historial/Noticias'); // La ruta de tu API
      setnoticeData(response.data);
    } catch (error) {
      console.error('Error al obtener los contenidos de la API:', error);
    }
  };
  useEffect(() => {
    fetchnoticeData();
  }, []);

 
  
  // Función para manejar la acción de presionar una sección
  const handleSectionPress = (section) => {
    if (section === 'Noticias') {
      navigation.navigate("Noticias");
    } else {
      if (section === 'Revistas') {
        navigation.navigate("Revistas");
      } else {
        if (section === 'Contenido') {
          navigation.navigate("Contenido");
        } else {
          console.log(`Redirigiendo a la sección: ${section}`);
        }
      }
    }


  };
  const handleFloatingButtonPress = () => {
    navigation.navigate("ChatBoxito");
    console.log('Botón flotante presionado');
  };
  

  // Función para renderizar las tarjetas de noticias
  const renderNewsCards = () => {
    const visibleNews = noticeData.slice(0, 5);
    return (
      <ScrollView horizontal>
        {visibleNews.map((content) => (
          <View key={content.id || content.Titulo} style={styleshome.cardNoti}>
            <View style={styleshome.logoContainer}>
              <Image source={{ uri: content.Portada }} style={styleshome.logo} />
            </View>
            <Text style={styleshome.title} numberOfLines={2}>{content.Titulo}</Text>
            <TouchableOpacity style={styleshome.button} onPress={() => handleButtonPress(content.url)}>
              <View style={styleshome.buttonContent}>
                <Icon name="arrow-right" size={16} color="white" style={styleshome.buttonIcon} />
                <Text style={styleshome.buttonText}> Leer más</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  
  // Función para renderizar las tarjetas de noticias
  const renderMagazineCards = () => {
    const visibleMagazines = magazineData.slice(0, 5);
    return (
      <ScrollView horizontal>
        {visibleMagazines.map((content) => (
          <View key={content.id || content.Titulo} style={styleshome.cardRevis}>
            <View style={styleshome.logoContainer}>
              <Image source={{ uri: content.Portada }} style={styleshome.logoRevis} />
            </View>
            <Text style={styleshome.title} numberOfLines={2}>{content.Titulo}</Text>
            <Text style={styleshome.category}>{content.date}</Text>
            <TouchableOpacity style={styleshome.button} onPress={() => handleButtonPress(content.url)}>
              <View style={styleshome.buttonContent}>
                <Icon name="arrow-right" size={16} color="white" style={styleshome.buttonIcon} />
                <Text style={styleshome.buttonText}> Leer más</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  
  // Función para renderizar las tarjetas de contenido
  const renderContentCards = () => {
    const visibleContent = contentData.slice(0, 5);
    return (
      <ScrollView horizontal>
        {loading ? (
          <ActivityIndicator size="large" color="green" style={styleshome.loadingIndicator} />
        ) : (
          visibleContent.map((content) => (
            <View key={content.id} style={[styleshome.cardConte, styleshome.contentCard]}>
              <View style={styleshome.contentContainer}>
                <Image source={{ uri: content.url_imageb }} style={styleshome.contentImage} />
                <Text style={styleshome.titleconte} numberOfLines={1}>{content.titulo}</Text>
                <Text>{moment(content.UpdatedAt).format('DD MMM YYYY')}</Text>
              </View>
              <TouchableOpacity
                style={styleshome.button}
                onPress={() => handleButtonPress(content.url_video)}
              >
                <View style={styleshome.buttonContent}>
                  <Icon name="play-circle" size={24} color="white" />
                  <Text style={styleshome.buttonText}> Visualizar</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    );
  };
  
  return (
    <View style={styleshome.container}>
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {/* Secciones del contenido */}
      <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Noticias')}>
        <Icon name="newspaper-o" size={28} color="#46741e" />
        <Text style={styleshome.sectionTitle}>Noticias</Text>
      </TouchableOpacity>
      {renderNewsCards()}

      <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Revistas')}>
        <Icon name="book" size={28} color="#46741e" />
        <Text style={styleshome.sectionTitle}>Revistas</Text>
      </TouchableOpacity>
      {renderMagazineCards()}

      <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Contenido')}>
        <Icon name="film" size={28} color="#46741e" />
        <Text style={styleshome.sectionTitle}>Contenido</Text>
      </TouchableOpacity>
      {renderContentCards()}
    </ScrollView>

    {/* Botón flotante */}
    <Animated.View style={styleshome.floatingButton}>
      <TouchableOpacity style={styleshome.floatingButtonTouchable} onPress={handleFloatingButtonPress}>
        <Icon name="comments" size={24} color="#ffffff" />
      </TouchableOpacity>
    </Animated.View>
  </View>
  );
};



export default Home;
