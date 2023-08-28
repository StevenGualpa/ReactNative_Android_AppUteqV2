import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export const BotonContenido = ({ onPress, usuarioTipo }) => {
  if (usuarioTipo !== 'Administrador') {
    return null;
  }
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="md-document" size={60} color="#46741e" />
      <Text style={styles.titulo}>Contenido</Text>
    </TouchableOpacity>
  );
};
export const BotonCarreras = ({ onPress, usuarioTipo }) => {
  if (usuarioTipo !== 'Administrador') {
    return null;
  }
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="book" size={60} color="#46741e" />
      <Text style={styles.titulo}>Carreras</Text>
    </TouchableOpacity>
  );
};
export const BotonFacultades = ({ onPress, usuarioTipo }) => {
  if (usuarioTipo !== 'Administrador') {
    return null;
  }

  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="md-school" size={60} color="#46741e" />
      <Text style={styles.titulo}>Facultades</Text>
    </TouchableOpacity>
  );
};

export const BotonUsuarios = ({ onPress, usuarioTipo }) => {
  if (usuarioTipo !== 'Administrador') {
    return null;
  }

  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="md-person" size={60} color="#46741e" />
      <Text style={styles.titulo}>Administradores</Text>
    </TouchableOpacity>
  );
};

export const BotonEstadisticas = ({ onPress, usuarioTipo }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="md-analytics" size={60} color="#46741e" />
      <Text style={styles.titulo}>Estadísticas</Text>
    </TouchableOpacity>
  );
};

export const BotonSGA = ({ onPress, usuarioTipo }) => {

  if(usuarioTipo==='invitado'){
    return;
  }
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
    <FontAwesome name="university" size={60} color="#46741e" />
      <Text style={styles.titulo}>SGA</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    backgroundColor: '#f5f6fa',
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
