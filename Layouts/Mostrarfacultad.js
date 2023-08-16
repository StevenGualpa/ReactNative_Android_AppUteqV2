import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

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

  const openCarreraModal = (carrera) => {
    setSelectedCarrera(carrera);
    setModalVisible(true);
  };

  const closeCarreraModal = () => {
    setSelectedCarrera(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Icon name="arrow-back" size={30} color={'#46741e'} />
        </TouchableOpacity>
        <Text style={styles.title}>{facultad.nombre}</Text>
      </View>
      <WebView style={styles.video} source={{ uri: facultad.urlVideo }} />
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => handleTabPress('mision')} style={styles.tab}>
          <Icon name="book-outline" size={20} color="#46741e" />
          <Text style={styles.tabText}>MISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('vision')} style={styles.tab}>
          <Icon name="eye-outline" size={20} color="#46741e" />
          <Text style={styles.tabText}>VISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('carreras')} style={styles.tab}>
          <Icon name="school-outline" size={20} color="#46741e" />
          <Text style={styles.tabText}>CARRERAS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {activeTab === 'mision' && (
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>MISIÓN</Text>
            <Text style={styles.cardContent}>{facultad.mision}</Text>
          </View>
        )}
        {activeTab === 'vision' && (
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>VISIÓN</Text>
            <Text style={styles.cardContent}>{facultad.vision}</Text>
          </View>
        )}
        {activeTab === 'carreras' &&
          carrerasData.map((carrera) => (
            <TouchableOpacity
              key={carrera.id}
              style={styles.carreraCard}
              onPress={() => openCarreraModal(carrera)}
            >
              <Image source={{ uri: carrera.imageURL }} style={styles.carreraImage} resizeMode="contain" />
              <Text style={styles.carreraTitle}>{carrera.nombre}</Text>
              <Text style={styles.carreraDescription}>{carrera.descripcion.substring(0, 120)}... Ver mas</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.socialLinks}>
        <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL(facultad.facebookURL)}>
          <Icon name="logo-facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL(facultad.googleURL)}>
          <Icon name="logo-google" size={24} color="#db4437" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeCarreraModal}
      >
        {selectedCarrera ? (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedCarrera.imageURL }} style={styles.modalImage} resizeMode="contain" />
              <Text style={styles.modalTitle}>{selectedCarrera.nombre}</Text>
              <ScrollView style={styles.modalDescriptionContainer}>
                <Text style={styles.modalDescription}>{selectedCarrera.descripcion}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => Linking.openURL(selectedCarrera.UrlSitioOf)}
              >
                <View style={styles.buttonContent}>
                  <Icon name="globe-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Visitar Sitio Web</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeCarreraModal}
              >
                <View style={styles.buttonContent}>
                  <Icon name="close-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Cerrar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4caf50" />
          </View>
        )}
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cardView: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50', // Green color
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#46741e', // Title color in green
  },
  video: {
    width: windowWidth,
    height: 200,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    elevation: 15,
    padding: 10,
    margin: 5,
  },
  tabText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  scrollContainer: {
    marginTop: 5,
    flex: 1,
  },
  tabContent: {
    padding: 15,
    fontSize: 16,
  },
  carreraCard: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  carreraImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  carreraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  carreraDescription: {
    fontSize: 15,
    color: '#555',
  },
  websiteButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  socialButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '95%',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: windowWidth - 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },
  modalDescriptionContainer: {
    maxHeight: 350,
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
});

export default FacuDetails;
