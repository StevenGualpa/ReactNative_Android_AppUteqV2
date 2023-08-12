import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesVisRevistas } from './Styles/Styles'; // Ajusta la ruta si es necesario


const NewsCard = ({ image, title, url }) => {
  const handleReadMore = () => {
    Linking.openURL(url);
  };

  return (
    <View style={stylesVisRevistas.card}>
      <Image source={{ uri: image }} style={stylesVisRevistas.image} resizeMode="stretch" />
      <Text style={stylesVisRevistas.title}>{title}</Text>
      <TouchableOpacity style={stylesVisRevistas.button} onPress={handleReadMore}>
        <Text style={stylesVisRevistas.buttonText}><Icon name="book" size={20} color="#fff" /> Leer más</Text>
      </TouchableOpacity>
    </View>
  );
};

const ViewRevista = () => {
  const [revistas, setRevistas] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/StevenGualpa/Api_Historial/Revistas')
      .then((response) => {
        setRevistas(response.data);
      })
      .catch((error) => console.error(error));
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
        />
      ))}
    </ScrollView>
  </View>
  );
};
export default ViewRevista;
