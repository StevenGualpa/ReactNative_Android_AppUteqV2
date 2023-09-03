import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, Animated, ActivityIndicator, Alert, BackHandler } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es';
import { styleshome } from './Styles/Styles';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import RNFetchBlob from 'rn-fetch-blob';

moment.locale('es');
const Home = () => {
  const navigation = useNavigation();

  //Verificamos si jalamos el id
  const { user } = useContext(AuthContext);

  const [accessToken, setAccessToken] = useState(null);
  const [revistas, setRevistas] = useState([]);

  useEffect(() => {
    //console.log('Usuario desde el contexto:', user); // Registro de depuración
    if (user) {
      Alert.alert("Usuario Ingresado", `Bienvenido ${user.nombre}`);
    } else {
      console.log("Usuario o ID no definido");
    }
  }, [user]);


  //declaracion de estados
  const [refreshing, setRefreshing] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);
  const [noticeData, setnoticeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState([]);

 const blockBackButton = () => {
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
  );

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

  const handleButtonPress = (link, section, nombre) => {
    Linking.openURL(link);

    // Registro de estadísticas al presionar "Leer más"
    const data = {
      seccion: section,
      nombre: nombre,
    };

    axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', data)
      .then(response => {
        console.log('Estadísticas registradas:', response.data);
      })
      .catch(error => {
        console.error('Error al registrar estadísticas:', error);
      });
  };
  
  
  
  const authenticate = () => {
    RNFetchBlob.config({
      trusty: true
    }).fetch('POST', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/api/auth/signin', {
      'Content-Type': 'application/json',
    }, JSON.stringify({
      username: '_x1userdev',
      password: 'LineGold179#5ft2'
    }))
    .then((response) => {
      const accessToken = JSON.parse(response.data).accessToken;
      setAccessToken(accessToken);
    })
    .catch((error) => {
      console.error('Error al autenticarse:', error);
    });
  };

  const fetchMagazineData = () => {
    if (!accessToken) return;

    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/6', {
      'Authorization': `Bearer ${accessToken}`
    })
    .then((response) => {
      setRevistas(JSON.parse(response.data));
    })
    .catch((error) => {
      console.error('Error al obtener las revistas:', error);
    });
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchMagazineData();
  }, [accessToken]);



//preferencias de usuario

const fetchUserPreferences = async () => {
  try {
    if (user && user.ID) {
      const response = await axios.get(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/getAll/${user.ID}`);
      if (response.data && response.data.preferencias) {
        setUserPreferences(response.data.preferencias); // Suponiendo que las preferencias vienen en el campo "preferencias" del response
      }
    }
  } catch (error) {
    console.error('Error al obtener las preferencias del usuario:', error);
  }
};



useEffect(() => {
  fetchUserPreferences();
}, [user]);

  // Función para obtener los datos de las noticias desde la API
  const fetchnoticeData = async () => {
    try {
      let userPreferences = await fetchUserPreferences();
      const response = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/GetAll');
      if (userPreferences && userPreferences.length > 0) {
        const filteredData = response.data.noticias.filter((noticia) => userPreferences.includes(noticia.categoria));
        setnoticeData(filteredData);
      } else {
        setnoticeData(response.data.noticias);
      }
    } catch (error) {
      console.error('Error al obtener los contenidos de la API:', error);
    }
  };

  useEffect(() => {
    fetchnoticeData();
  }, []);
  
  // Función para manejar la acción de presionar una sección
  const handleSectionPress = async (section) => {
    try {
      // Insertar estadísticas
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seccion: section,
          nombre: `${section}`,
        }),
      });
      const data = await response.json();
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
      console.log('Estadística insertada:', data);
    } catch (error) {
      console.error('Error al insertar estadística:', error);
    }


  };
  const handleFloatingButtonPress = () => {
    navigation.navigate("ChatBoxito");
    console.log('Botón flotante presionado');
  };
  

  // Función para renderizar las tarjetas de noticias
  const renderNewsCards = () => {
    const visibleNews = noticeData.slice(0, 10);
    return (
      <ScrollView horizontal>
        {visibleNews.map((content) => {
          console.log(content); // Agrega esta línea para imprimir los datos de la noticia en la consola
          return (
            <View key={content.id || content.titulo} style={styleshome.cardNoti}>
              <View style={styleshome.logoContainer}>
                <Image source={{ uri: content.portada }} style={styleshome.logo} />
              </View>
              <Text style={styleshome.title} numberOfLines={2}>{content.titulo}</Text>
              <Text style={styleshome.category} numberOfLines={1}>{content.categoria}</Text>
              <Text style={styleshome.category}>{moment(content.CreatedAt).format('LL')}</Text>
              <TouchableOpacity style={styleshome.button} onPress={() => handleButtonPress(content.url, 'Noticias', content.titulo)}>
                <View style={styleshome.buttonContent}>
                  <Icon name="arrow-right" size={16} color="white" style={styleshome.buttonIcon} />
                  <Text style={styleshome.buttonText}> Leer más</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  
  
  // Función para renderizar las tarjetas de revistas
  const renderMagazineCards = () => {
    return (
      <ScrollView horizontal>
        {revistas.map((revista) => (
          <View key={revista.anio + '-' + revista.mes} style={styleshome.cardRevis}>
            <View style={styleshome.logoContainer}>
              <Image source={{ uri: `https://uteq.edu.ec/assets/images/newspapers/${revista.urlportada}` }} style={styleshome.logoRevis} />
            </View>
            <Text style={styleshome.title} numberOfLines={2}>{`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`}</Text>
            <Text style={styleshome.category}>{moment(new Date(revista.anio, revista.mes - 1)).format('LL')}</Text>
            <TouchableOpacity style={styleshome.button} onPress={() => Linking.openURL(revista.urlpw)}>
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
                onPress={() => handleButtonPress(content.url_video, 'Contenido', content.titulo)}
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
