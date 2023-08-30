import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import { stylesVisNotices } from './Styles/Styles';
import { AuthContext } from './AuthContext';

const NewsCard = ({ image, title, date, url, category, onButtonPress }) => {
  const handleReadMore = () => {
    if (onButtonPress) {
      onButtonPress();
    }
    Linking.openURL(url);
  };

  return (
    <View style={stylesVisNotices.card}>
      <Image source={{ uri: image }} style={stylesVisNotices.image} />
      <Text style={stylesVisNotices.title}>{String(title)}</Text>
      <Text style={stylesVisNotices.category}>{String(category)}</Text>
      <Text style={stylesVisNotices.date}>{formatDate(date)}</Text>
      <TouchableOpacity style={stylesVisNotices.button} onPress={handleReadMore}>
        <View style={stylesVisNotices.buttonContent}>
          <Text style={stylesVisNotices.buttonText}>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const ViewNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const { user } = useContext(AuthContext);

  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de noticia:", { seccion: "Noticia", nombre: nombre });
      await axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        seccion: "Noticia",
        nombre: nombre
      });
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  };

  const fetchData = () => {
    axios.get(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/byUsuario/${user.ID}`)
      .then((response) => {
        if (response.data && response.data.noticias && response.data.noticias.length > 0) {
          setNoticias(response.data.noticias);
        } else {
          return axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/GetAll');
        }
      })
      .then((response) => {
        if (response && response.data && response.data.noticias) {
          setNoticias(response.data.noticias);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 6000);  // Refrescar cada 6 segundos
    return () => clearInterval(interval);  // Limpia el intervalo cuando el componente se desmonte
  }, [user.ID]);

  return (
    <View style={stylesVisNotices.container}>
      <Text style={stylesVisNotices.header}>Vista de Noticias</Text>
      <ScrollView>
        {noticias.map((noticia, index) => (
          <NewsCard
            key={index}
            image={noticia.portada}
            title={noticia.titulo}
            date={noticia.CreatedAt}
            url={noticia.url}
            category={noticia.categoria}
            onButtonPress={() => registerView(noticia.titulo)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewNoticias;
