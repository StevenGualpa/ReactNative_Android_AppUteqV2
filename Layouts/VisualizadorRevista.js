import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { stylesVisRevistas } from './Styles/Styles';

const NewsCard = ({ image, title, url, date, onButtonPress }) => {
  const formattedDate = moment(date).format('D MMM YYYY');

  const handleReadMore = () => {
    if (onButtonPress) {
      onButtonPress();
    }
    Linking.openURL(url);
  };

  return (
    <View style={stylesVisRevistas.card}>
      <Image source={{ uri: image }} style={stylesVisRevistas.image} resizeMode="stretch" />
      <Text style={stylesVisRevistas.title}>{title}</Text>
      <Text style={stylesVisRevistas.date}>{formattedDate}</Text>
      <TouchableOpacity style={stylesVisRevistas.button} onPress={handleReadMore}>
        <Text style={stylesVisRevistas.buttonText}><Icon name="book" size={20} color="#fff" /> Leer más</Text>
      </TouchableOpacity>
    </View>
  );
};

const ViewRevista = () => {
  const [revistas, setRevistas] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

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

  const fetchRevistaData = () => {
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

  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de revista:", { seccion: "Revistas", nombre: nombre });
      await RNFetchBlob.config({
        trusty: true
      }).fetch('POST', 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        'Content-Type': 'application/json',
      }, JSON.stringify({
        seccion: "Revistas",
        nombre: nombre
      }));
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchRevistaData();
    const interval = setInterval(fetchRevistaData, 6000);  // Refrescar cada 6 segundos
    return () => clearInterval(interval);  // Limpia el intervalo cuando el componente se desmonte
  }, [accessToken]);

  return (
    <View style={stylesVisRevistas.container}>
      <Text style={stylesVisRevistas.header}>Vista de Revistas</Text>
      <ScrollView>
        {revistas.map((revista) => (
          <NewsCard
            key={revista.anio + '-' + revista.mes}
            image={`https://uteq.edu.ec/assets/images/newspapers/${revista.urlportada}`}
            title={`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`}
            url={revista.urlpw}
            date={new Date(revista.anio, revista.mes - 1)}
            onButtonPress={() => registerView(`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewRevista;
