import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FacuCreate from './CrearFacultad';
import GestiFacu from './GestionFacu';
import { useNavigation } from "@react-navigation/native";
import {stylesModalF} from './Styles/Styles'


const Card = ({ iconName, title, onPress }) => (
  <TouchableOpacity style={stylesModalF.card} onPress={onPress}>
    <Ionicons name={iconName} size={40} color="#46741e" />
    <Text style={stylesModalF.title}>{title}</Text>
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
       //llamar a la interfaz de Facultad mediente por navigation y cierra el modal 
      navigation.navigate("Facul");
      isVisible=onClose();
      console.log('Abrir Facultad');
    } else if (title === 'Gestionar') {
      navigation.navigate("FaculG");
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
      <View style={stylesModalF.modalContainer}>
        {!openContenido && !openGestion ? (
          <View style={stylesModalF.modalContent}>
            <Text style={stylesModalF.modalTitle}>Facultades</Text>
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
              <TouchableOpacity style={stylesModalF.modalCloseButton} onPress={onClose}>
                <Ionicons name="md-close" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={[stylesModalF.modalContent, openContenido || openGestion ? stylesModalF.expandedModal : null]}>
            {openContenido ? (
              <FacuCreate />
            ) : (
              <GestiFacu />
            )}
            {showBackButton && (
              <TouchableOpacity style={stylesModalF.backButton} onPress={handleBackButtonPress}>
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
