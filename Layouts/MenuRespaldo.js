import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text } from 'react-native';
import ModalContenido from './ModalContenido';
import ModalFacultades from './ModalFacu';
import ModalUsuario from './ModalUsuario'
import { BotonContenido, BotonFacultades, BotonUsuarios, BotonCarreras, BotonEstadisticas
, BotonSGA} from './Components/cardsmenu';
import ModalCarrera from './ModalCarreras';
import { useNavigation } from "@react-navigation/native";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import {stylesMenuR} from './Styles/Styles'


const { width } = Dimensions.get('window');

const MenuComple = () => {
  const { user } = useContext(AuthContext);
  const cardWidthMenu = (width - 70) / 2;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalFacultadesVisible, setModalFacultadesVisible] = useState(false);
  const [isModalUsuarioVisible, setModalUsuarioVisible] = useState(false);
  const [ismodalcarreravisible, setModalCarrera]=useState(false);
  const navigation = useNavigation();

  let userTipo = null; // Valor inicial si el usuario no está autenticado

  if (user) {
    userTipo = user.rol;
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFacultades = () => {
    setModalFacultadesVisible(!isModalFacultadesVisible);
  };
  const toggleModalUsuario = () => {
    setModalUsuarioVisible(!isModalUsuarioVisible);
  };
  const toggleModalCarrea=()=>{
    setModalCarrera(!ismodalcarreravisible);
  };

  const handleCardPress=()=> {
      navigation.navigate("Estadisticas");
  };
  const handleAbrirSga=()=> {
    Linking.openURL('https://sga.uteq.edu.ec/loginsga?ret=/')
  };

  return (
    <ScrollView contentContainerStyle={stylesMenuR.container}>
      <View style={stylesMenuR.header}>
        <Text style={stylesMenuR.headerText}>Menú</Text>
      </View>
      <View style={stylesMenuR.column}>
        <View style={stylesMenuR.cardContainer}>
          <BotonContenido onPress={toggleModal} usuarioTipo={userTipo} />
        </View>
        <View style={stylesMenuR.cardContainer}>
          <BotonFacultades onPress={toggleModalFacultades} usuarioTipo={userTipo} />
        </View>        
      </View>
      <View style={stylesMenuR.column}>
        <View style={stylesMenuR.cardContainer}>
          <BotonCarreras onPress={toggleModalCarrea} usuarioTipo={userTipo} />
        </View>
        <View style={stylesMenuR.cardContainer}>
          <BotonUsuarios onPress={toggleModalUsuario} usuarioTipo={userTipo} />
        </View>                
      </View>
      <View style={stylesMenuR.column}>
        <View style={stylesMenuR.cardContainer}>
          <BotonEstadisticas onPress={handleCardPress} usuarioTipo={userTipo} />
        </View>  
        <View style={stylesMenuR.cardContainer}>
          <BotonSGA onPress={handleAbrirSga} usuarioTipo={userTipo} />
        </View>                
      </View>
      
      <ModalContenido isVisible={isModalVisible} onClose={toggleModal} cardWidth={cardWidthMenu} />
      <ModalFacultades isVisible={isModalFacultadesVisible} onClose={toggleModalFacultades} />
      <ModalUsuario isVisible={isModalUsuarioVisible} onClose={toggleModalUsuario} />
      <ModalCarrera isVisible={ismodalcarreravisible} onClose={toggleModalCarrea}/>

    </ScrollView>
  );
};

export default MenuComple;
