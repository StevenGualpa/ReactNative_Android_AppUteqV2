import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useContext } from 'react';
import {stylesCrearC} from './Styles/Styles'
import { AuthContext } from './AuthContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export function Prefer() {
  const { user } = useContext(AuthContext);
  const [checkedItems, setCheckedItems] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getall');
      const data = await response.json();
      setFacultades(data.facultad);
      
      // Una vez que las facultades han sido establecidas, marca los ítems correspondientes.
      const userPreferences = await fetchUserPreferences();
      const checkedFacultades = data.facultad.filter(facultad => 
        userPreferences.includes(facultad.ID)
      ).map(facultad => facultad.nombre);
      setCheckedItems(checkedFacultades);

    } catch (error) {
      console.error('Error al obtener las facultades:', error);
    }
  };

  const fetchUserPreferences = async () => {
    
    try {
      
      const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/getall/${user.ID}`);
      const data = await response.json();
      
      return data.usuarioFacultades.map(pref => pref.FacultadID);
    } catch (error) {
      console.error('Error al obtener las preferencias del usuario:', error);
      return [];
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
    } else {
      if (checkedItems.length < 3) {
        setCheckedItems([...checkedItems, item]);
      }
    }
  };

  const renderCheckbox = ({ item }) => {
    const isChecked = checkedItems.includes(item.nombre);
    return (
      <CheckBox
        key={item.id}
        title={item.nombre}
        size={windowHeight * 0.03}
        checked={isChecked}
        checkedColor="#46b41e"
        onPress={() => handleCheckboxChange(item.nombre)}
      />
    );
  };
  const handleSave = async () => {
    if (checkedItems.length === 0) {
      Alert.alert('Advertencia', 'Debes seleccionar al menos una facultad');
      return;
    }
    const payload = checkedItems.map(item => {
      const facultadData = facultades.find(facultad => facultad.nombre === item);
      return {
        UsuarioID: user.ID,
        FacultadID: facultadData.ID
      };
    });
  
    try {
      setIsLoading(true);
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setIsLoading(false);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Preferencias guardadas:', data);
        Alert.alert('Éxito', 'Preferencias guardadas correctamente.');
      } else {
        throw new Error(data.msg || 'Error al guardar las preferencias');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error al guardar las preferencias:', error);
      Alert.alert('Error', 'Ha ocurrido un error al guardar las preferencias. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferencias</Text>
      <FlatList
        data={facultades}
        renderItem={renderCheckbox}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.checkboxContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
 <TouchableOpacity
        style={[styles.button, { backgroundColor: '#46741e' }, isButtonPressed]}
        onPress={handleSave}
        disabled={isButtonPressed} 
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
{isLoading && (
      <View style={stylesCrearC.loadingOverlay}>
        <ActivityIndicator size="large" color="#46741e" />
      </View>
    )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: windowHeight * 0.04,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
  },
  checkboxContainer: {
    paddingTop: windowHeight * 0.02,
    paddingBottom: windowHeight * 0.02,
    width: windowWidth * 0.9,
  },
  button: {
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: windowHeight * 0.01,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.025,
  },
});

export default Prefer;
