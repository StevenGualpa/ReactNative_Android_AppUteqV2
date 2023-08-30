import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import axios from 'axios';
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

  const fetchRevistaData = () => {
    axios.get('https://my-json-server.typicode.com/StevenGualpa/Api_Historial/Revistas')
      .then((response) => {
        setRevistas(response.data);
      })
      .catch((error) => console.error(error));
  };

  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de revista:", { seccion: "Revistas", nombre: nombre });
      await axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        seccion: "Revistas",
        nombre: nombre
      });
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  };

  useEffect(() => {
    fetchRevistaData();
    const interval = setInterval(fetchRevistaData, 6000);  // Refrescar cada 6 segundos
    return () => clearInterval(interval);  // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <View style={stylesVisRevistas.container}>
      <Text style={stylesVisRevistas.header}>Vista de Revistas</Text>
      <ScrollView>
        {revistas.map((revista) => (
          <NewsCard
            key={revista.Titulo}
            image={revista.Portada}
            title={revista.Titulo}
            url={revista.url}
            date={revista.date}
            onButtonPress={() => registerView(revista.Titulo)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewRevista;
