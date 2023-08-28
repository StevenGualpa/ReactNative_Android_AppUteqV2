import AppGestion from './GestionContenido';
import Contenido from './Contenido';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {stylesModalC} from './Styles/Styles'

const Card = ({ iconName, title, onPress }) => (
  <TouchableOpacity style={stylesModalC.card} onPress={onPress}>
    <Ionicons name={iconName} size={40} color="#46741e" />
    <Text style={stylesModalC.title}>{title}</Text>
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
      <View style={stylesModalC.modalContainer}>
        {!openContenido && !openGestion ? (
          <View style={stylesModalC.modalContent}>
            <Text style={stylesModalC.modalTitle}>Contenido</Text>
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
              <TouchableOpacity style={stylesModalC.modalCloseButton} onPress={onClose}>
                <Ionicons name="md-close" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={[stylesModalC.modalContent, openContenido || openGestion ? stylesModalC.expandedModal : null]}>
            {openContenido ? (
              <Contenido />
            ) : (
              <AppGestion />
            )}
            {showBackButton && (
              <TouchableOpacity style={stylesModalC.backButton} onPress={handleBackButtonPress}>
                <Ionicons name="md-arrow-back" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};



export default ModalContenido;
