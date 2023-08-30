import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import { stylesVisNotices } from './Styles/Styles';

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
    // Autenticarse y obtener el token
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

      // Obtener las noticias usando el token
      RNFetchBlob.config({
        trusty: true
      }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/2', {
        'Authorization': `Bearer ${accessToken}`
      })
      .then((newsResponse) => {
        setNoticias(JSON.parse(newsResponse.data));
      })
      .catch((error) => {
        console.error('Error al obtener las noticias:', error);
      });
    })
    .catch((error) => {
      console.error('Error al autenticarse:', error);
    });
  }, []);

  return (
    <View style={stylesVisNotices.container}>
      <Text style={stylesVisNotices.header}>Vista de Noticias</Text>
      <ScrollView>
        {noticias.map((noticia) => (
          <NewsCard
            key={noticia.ntTitular} 
            image={noticia.ntUrlPortada}
            title={noticia.ntTitular}
            category={noticia.objCategoriaNotc.gtTitular}
            url={noticia.ntUrlNoticia}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewNoticias;
