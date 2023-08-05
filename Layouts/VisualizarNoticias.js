import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const NewsCard = ({ image, title, category, url }) => {
  const handleReadMore = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <TouchableOpacity style={styles.button} onPress={handleReadMore}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ViewRevista = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias')
      .then((response) => {
        setNoticias(response.data.noticias);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vista de Noticias</Text>
      <ScrollView>
        {noticias.map((noticia) => (
          <NewsCard
            key={noticia.ID}
            image={noticia.portada}
            title={noticia.titulo}
            category={noticia.tags.map(tag => tag.value).join(", ")}
            url={noticia.url}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: cardWidth,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewRevista;
