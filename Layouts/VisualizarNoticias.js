import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import { stylesVisNotices } from './Styles/Styles'; // Ajusta la ruta si es necesario


const NewsCard = ({ image, title, category, url }) => {
  const handleReadMore = () => {
    Linking.openURL(url);
  };

  return (
    <View style={stylesVisNotices.card}>
      <Image source={{ uri: image }} style={stylesVisNotices.image} />
      <Text style={stylesVisNotices.title}>{title}</Text>
      <Text style={stylesVisNotices.category}>{category}</Text>
      <TouchableOpacity style={stylesVisNotices.button} onPress={handleReadMore}>
        <View style={stylesVisNotices.buttonContent}>
          <Text style={stylesVisNotices.buttonText}>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ViewNoticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/StevenGualpa/Api_Historial/Noticias')
      .then((response) => {
        setNoticias(response.data); // La respuesta ya es un arreglo
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={stylesVisNotices.container}>
      <Text style={stylesVisNotices.header}>Vista de Noticias</Text>
      <ScrollView>
        {noticias.map((noticia) => (
          <NewsCard
            key={noticia.Titulo} // Usar el título como clave
            image={noticia.Portada}
            title={noticia.Titulo}
            category={noticia.date} // O cualquier otra propiedad que desees mostrar
            url={noticia.url}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewNoticias;
