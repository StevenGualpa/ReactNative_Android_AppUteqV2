import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const NewsCard = ({ image, title, url }) => {
  const handleReadMore = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="stretch" />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={handleReadMore}>
        <Text style={styles.buttonText}><Icon name="book" size={20} color="#fff" /> Leer más</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>Vista de Revistas</Text>
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
    height: 350,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewRevista;
