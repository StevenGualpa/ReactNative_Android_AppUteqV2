import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,

  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {stylesMostrarF}from './Styles/Styles'

const windowWidth = Dimensions.get('window').width;

export const FacuDetails = ({ facultad, onGoBack }) => {
  const [activeTab, setActiveTab] = useState('mision');
  const [carrerasData, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCarreras();
  }, []);

  
  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'carreras') {
      fetchCarreras();
    }
  };

  const fetchCarreras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/getall/${facultad.ID}`
      );
      const carrerasData = response.data.carreras.map((carrera) => ({
        id: carrera.id,
        nombre: carrera.nombre,
        descripcion: carrera.descripcion,
        imageURL: carrera.imageURL,
        UrlSitioOf: carrera.UrlSitio,
      }));
      setCarreras(carrerasData);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
      setLoading(false);
    }
  };
  const sendEmail = () => {
    const emailAddress = facultad.correo;
    const subject = 'Consulta sobre la facultad';
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(emailUrl);
  };

  const openGoogleMaps = () => {
    const latitude = facultad.latitud;
    const longitude = facultad.longitud;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(googleMapsUrl);
  };


  const openCarreraModal = (carrera) => {
    setSelectedCarrera(carrera);
    setModalVisible(true);
  };

  const closeCarreraModal = () => {
    setSelectedCarrera(null);
    setModalVisible(false);
  };

  return (
    <View style={stylesMostrarF.container}>
      <View style={stylesMostrarF.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Icon name="arrow-back" size={30} color={'#46741e'} />
        </TouchableOpacity>
        <Text style={stylesMostrarF.title}>{facultad.nombre}</Text>
      </View>
      <WebView style={stylesMostrarF.video} source={{ uri: facultad.urlVideo }} />
      <View style={stylesMostrarF.tabs}>
        <TouchableOpacity onPress={() => handleTabPress('mision')} style={stylesMostrarF.tab}>
          <Icon name="book-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>MISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('vision')} style={stylesMostrarF.tab}>
          <Icon name="eye-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>VISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('carreras')} style={stylesMostrarF.tab}>
          <Icon name="school-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>CARRERAS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={stylesMostrarF.scrollContainer}>
        {activeTab === 'mision' && (
          <View style={stylesMostrarF.cardView}>
            <Text style={stylesMostrarF.cardTitle}>MISIÓN</Text>
            <Text style={stylesMostrarF.cardContent}>{facultad.mision}</Text>
          </View>
        )}
        {activeTab === 'vision' && (
          <View style={stylesMostrarF.cardView}>
            <Text style={stylesMostrarF.cardTitle}>VISIÓN</Text>
            <Text style={stylesMostrarF.cardContent}>{facultad.vision}</Text>
          </View>
        )}
        {activeTab === 'carreras' &&
          carrerasData.map((carrera) => (
            <TouchableOpacity
              key={carrera.id}
              style={stylesMostrarF.carreraCard}
              onPress={() => openCarreraModal(carrera)}
            >
              <Image source={{ uri: carrera.imageURL }} style={stylesMostrarF.carreraImage} resizeMode="contain" />
              <Text style={stylesMostrarF.carreraTitle}>{carrera.nombre}</Text>
              <Text style={stylesMostrarF.carreraDescription}>{carrera.descripcion.substring(0, 120)}... Ver mas</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={stylesMostrarF.socialLinks}>
        <TouchableOpacity style={stylesMostrarF.socialButton} onPress={() => Linking.openURL(facultad.facebookURL)}>
          <Icon name="logo-facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesMostrarF.socialButton} onPress={() => Linking.openURL(facultad.googleURL)}>
          <Icon name="logo-google" size={24} color="#db4437" />
        </TouchableOpacity>
        <TouchableOpacity style={[stylesMostrarF.socialButton, stylesMostrarF.gmailButton]} onPress={sendEmail}>
          <Icon name="mail" size={24} color="#db4437" />
        </TouchableOpacity>
      </View>
      <View style={stylesMostrarF.googleMapsButtonContainer}>
        <TouchableOpacity
          style={[stylesMostrarF.googleMapsButton, stylesMostrarF.googleButton]}
          onPress={openGoogleMaps}
        >
          <Icon name="location-outline" size={24} color="#fff" />
          <Text style={[stylesMostrarF.googleMapsButtonText, stylesMostrarF.googleButtonText]}>Abrir en Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeCarreraModal}
      >
        {selectedCarrera ? (
          <View style={stylesMostrarF.modalContainer}>
            <View style={stylesMostrarF.modalContent}>
              <Image source={{ uri: selectedCarrera.imageURL }} style={stylesMostrarF.modalImage} resizeMode="contain" />
              <Text style={stylesMostrarF.modalTitle}>{selectedCarrera.nombre}</Text>
              <ScrollView style={stylesMostrarF.modalDescriptionContainer}>
                <Text style={stylesMostrarF.modalDescription}>{selectedCarrera.descripcion}</Text>
              </ScrollView>
              <TouchableOpacity
                style={stylesMostrarF.websiteButton}
                onPress={() => Linking.openURL(selectedCarrera.UrlSitioOf)}
              >
                <View style={stylesMostrarF.buttonContent}>
                  <Icon name="globe-outline" size={20} color="#fff" />
                  <Text style={stylesMostrarF.buttonText}>Visitar Sitio Web</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesMostrarF.closeButton}
                onPress={closeCarreraModal}
              >
                <View style={stylesMostrarF.buttonContent}>
                  <Icon name="close-outline" size={20} color="#fff" />
                  <Text style={stylesMostrarF.buttonText}>Cerrar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={stylesMostrarF.loadingContainer}>
            <ActivityIndicator size="large" color="#4caf50" />
          </View>
        )}
      </Modal>
    </View>
  );
};




export default FacuDetails;
