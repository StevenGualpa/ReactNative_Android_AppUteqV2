import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import ModalContenido from './ModalContenido';
import ModalFacultades from './ModalFacu';
import ModalUsuario from './ModalUsuario'
import { BotonContenido, BotonFacultades, BotonUsuarios, BotonCarreras } from './Components/cardsmenu';
import { useNavigation } from "@react-navigation/native";
import ModalCarrera from './ModalCarreras';
import {stylesMenu} from './Styles/Styles'
const { width } = Dimensions.get('window');

const MenuComple = () => {
  const cardWidthMenu = (width - 70) / 2;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalFacultadesVisible, setModalFacultadesVisible] = useState(false);
  const [isModalUsuarioVisible, setModalUsuarioVisible] = useState(false);
  const [ismodalcarreravisible, setModalCarrera]=useState(false);
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCarreraPress = () => {
    console.log('hola');
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
  return (
    <ScrollView contentContainerStyle={stylesMenu.container}>
      <View style={stylesMenu.header}>
        <Text style={stylesMenu.headerText}>Menú</Text>
      </View>
      <View style={stylesMenu.column}>
        <View style={stylesMenu.cardContainer}>
          <BotonContenido onPress={toggleModal} />
        </View>
        <View style={stylesMenu.cardContainer}>
          <BotonFacultades onPress={toggleModalFacultades} />
        </View>        
      </View>
      <View style={stylesMenu.column}>
        <View style={stylesMenu.cardContainer}>
          <BotonCarreras onPress={toggleModalCarrea} />
        </View>
        <View style={stylesMenu.cardContainer}>
          <BotonUsuarios onPress={toggleModalUsuario} />
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
