import AppUser from './GestionesUsusario';
import AppUsuario from './CrearUsuario';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {stylesModalU} from './Styles/Styles'
const Card = ({ iconName, title, onPress }) => (
  <TouchableOpacity style={stylesModalU.card} onPress={onPress}>
    <Ionicons name={iconName} size={40} color="#46741e" />
    <Text style={stylesModalU.title}>{title}</Text>
  </TouchableOpacity>
);

const ModalUsuario = ({ isVisible, onClose }) => {
  const [openCrearUsuario, setopenCrearUsuario] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [openGestion, setOpenGestion] = useState(false);
  const navigation = useNavigation();

  const handleCardPress = (title) => {
    if (title === 'Crear') {
       //llamar a la interfaz de Usuario mediente por navigation y cierra el modal 
      navigation.navigate("User");
      isVisible=onClose();
      console.log('Abrir CrearUsuario');
    } else if (title === 'Gestionar') {
      navigation.navigate("UserG");
      isVisible=onClose();
      console.log('Abrir Gestionar');
    } else {
      console.log(`Presionaste ${title}`);
    }
  };

  const handleBackButtonPress = () => {
    setopenCrearUsuario(false);
    setOpenGestion(false);
    setShowBackButton(false);
    setShowCloseButton(true);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={stylesModalU.modalContainer}>
        {!openCrearUsuario && !openGestion ? (
          <View style={stylesModalU.modalContent}>
            <Text style={stylesModalU.modalTitle}>Usuario</Text>
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
              <TouchableOpacity style={stylesModalU.modalCloseButton} onPress={onClose}>
                <Ionicons name="md-close" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={[stylesModalU.modalContent, openCrearUsuario || openGestion ? stylesModalU.expandedModal : null]}>
            {openCrearUsuario ? (
              <AppUsuario />
            ) : (
              <AppUser />
            )}
            {showBackButton && (
              <TouchableOpacity style={stylesModalU.backButton} onPress={handleBackButtonPress}>
                <Ionicons name="md-arrow-back" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};



export default ModalUsuario;
