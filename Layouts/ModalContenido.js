import AppGestion from './GestionContenido';
import Contenido from './Contenido';
import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
const cardWidth = (width - 150) / 2;

const Card = ({ iconName, title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Ionicons name={iconName} size={40} color="#46741e" />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const ModalContenido = ({ isVisible, onClose }) => {
  const [openContenido, setOpenContenido] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [openGestion, setOpenGestion] = useState(false);
  const navigation = useNavigation();

  const handleCardPress = (title) => {
    if (title === 'Crear') {
      //llamar a la interfaz de cotenido mediente por navigation y cierra el modal 
      navigation.navigate("Conten");
      isVisible=onClose();
      console.log('Abrir Crear');
    } else if (title === 'Gestionar') {
      navigation.navigate("ContenG");
      isVisible=onClose();
      console.log('Abrir Gestionar');
    } else {
      console.log(`Presionaste ${title}`);
    }
  };

  const handleBackButtonPress = () => {
    setOpenContenido(false);
    setOpenGestion(false);
    setShowBackButton(false);
    setShowCloseButton(true);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {!openContenido && !openGestion ? (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contenido</Text>
            <FlatList
              data={[
                { iconName: 'md-add', title: 'Crear' },
                { iconName: 'md-cog', title: 'Gestionar' },
              ]}
              keyExtractor={(item) => item.title}
              numColumns={2}
              renderItem={({ item }) => (
                <Card iconName={item.iconName} title={item.title} onPress={() => handleCardPress(item.title)} />
              )}
            />
            {showCloseButton && (
              <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                <Ionicons name="md-close" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={[styles.modalContent, openContenido || openGestion ? styles.expandedModal : null]}>
            {openContenido ? (
              <Contenido />
            ) : (
              <AppGestion />
            )}
            {showBackButton && (
              <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
                <Ionicons name="md-arrow-back" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#f5f6fa',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ModalContenido;
