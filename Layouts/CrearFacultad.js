import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {stylesCrearf} from './Styles/Styles'

const FacuCreate = () => {
  const [facultadTitulo, setFacultadTitulo] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  const [UrlFace, SetUrlFACE] = useState('');
  const [UrlWebSite, setUrlWebSITE] = useState('');
  const [loading, setLoading] = useState(false);
  const [gmail, setGmail] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [address, setAddress] = useState('');


  const formatVideoURL = (url) => {
    // Expresión regular para verificar si la URL tiene el formato correcto de YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+).*$/;
  
    // Expresión regular para verificar si la URL ya tiene el formato de inserción de YouTube
    const embedRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+).*$/;
  
    // Comprobar si la URL ya tiene el formato correcto (contiene "embed")
    if (embedRegex.test(url)) {
      return url; // Si ya tiene el formato correcto, simplemente devolvemos la misma URL
    }  
    // Verificar si la URL tiene el formato correcto de YouTube
    if (youtubeRegex.test(url)) {
      const videoId = url.match(youtubeRegex)[3];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  
    // Si la URL no es válida, simplemente devolvemos la misma URL
    return url;
  };

  const getCoordinatesFromAddress = async () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Ingrese una dirección válida.');
      return;
    }
  
    const apiKey = 'AIzaSyD0ONVovLBMhzWI2nU0XEkJguQO-y_cJrI'; // Reemplaza con tu API key de Google Maps
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
      const response = await fetch(geocodingApiUrl);
      const data = await response.json();
      console.log('Geocoding API response:', data);
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({
          latitude: location.lat.toString(),
          longitude: location.lng.toString(),
        });
        setAddress(`${location.lat}, ${location.lng}`);
        console.log('Latitud:', location.lat);
        console.log('Longitud:', location.lng);
        Alert.alert('Éxito', 'Coordenadas obtenidas correctamente.');
      } else {
        Alert.alert('Error', 'No se pudo obtener las coordenadas.');
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      Alert.alert('Error', 'Ha ocurrido un error al obtener las coordenadas.');
    }
  };
  

  const openGoogleMaps = () => {
    Linking.openURL('https://www.google.com/maps')
      .catch(() => {
        Alert.alert('Error', 'No se puede abrir Google Maps.');
      });
  };

  //falta agregar los dominios permitidos
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isCoordinateValid = (coordinate) => {
    const coordinateRegex = /^-?(\d+(\.\d*)?|\.\d+)(,\s*-?(\d+(\.\d*)?|\.\d+))*$/;
    return coordinateRegex.test(coordinate);
  };

  const isURLValid = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const isFacebookURLValid = (url) => {
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
    return facebookRegex.test(url);
  };

  const isUteqURLValid = (url) => {
    const uteqRegex = /^https:\/\/www\.uteq\.edu\.ec(\/.*)?$/;
    return uteqRegex.test(url);
  };

  const handleGuardar = async () => {
    if (
      facultadTitulo.trim() === '' ||
      videoURL.trim() === '' ||
      mision.trim() === '' ||
      vision.trim() === '' ||
      UrlFace.trim() === '' ||
      UrlWebSite.trim() === '' ||
      gmail.trim() === '' ||
      address.trim()===''||
      !isCoordinateValid(coordinates.latitude) ||
      !isCoordinateValid(coordinates.longitude)
    ) {
      Alert.alert('Error', 'No puedes dejar campos en blanco o las coordenadas no son válidas');
      return;
    }

    if (!isEmailValid(gmail)) {
      Alert.alert('Error', 'La dirección de Gmail no es válida');
      return;
    }

    if (!(await isURLValid(videoURL))) {
      Alert.alert(
        'Error',
        'La URL del video promocional no existe o no es válida'
      );
      return;
    }

    if (!isFacebookURLValid(UrlFace)) {
      Alert.alert('Error', 'La URL de Facebook no es válida');
      return;
    }

    if (!isUteqURLValid(UrlWebSite)) {
      Alert.alert(
        'Error',
        'La URL del sitio web no es válida. Debe iniciar con "https://www.uteq.edu.ec"'
      );
      return;
    }
    const formattedVideoURL = formatVideoURL(videoURL);
    const facultadData = {
      nombre: facultadTitulo,
      urlVideo: formattedVideoURL,
      mision: mision,
      vision: vision,
      urlFacebook: UrlFace,
      UrlSitio: UrlWebSite,
      correo: gmail,
      latitud: coordinates.latitude.trim(),
      longitud: coordinates.longitude.trim(),
    };
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in facultadData) {
        formData.append(key, facultadData[key]);
      }

      const responseFacultad = await fetch(
        'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      const dataFacultad = await responseFacultad.json();

      if (!responseFacultad.ok) {
        throw new Error(
          Alert.alert(dataFacultad.msg || 'Error al registrar la facultad')
        );
      }

      Alert.alert(
        'Éxito',
        'Facultad registrada correctamente.'
      );
      
      setFacultadTitulo('');
      setVideoURL('');
      setMision('');
      setVision('');
      SetUrlFACE('');
      setUrlWebSITE('');
      setGmail('');
      setAddress('');
      setCoordinates({ latitude: '', longitude: '' });
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert(
        'Error',
        error.message ||
          'Ha ocurrido un error al registrar la facultad. Por favor, inténtalo de nuevo más tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setFacultadTitulo('');
    setVideoURL('');
    setMision('');
    setVision('');
    SetUrlFACE('');
    setUrlWebSITE('');
    setGmail('');
    setAddress('');
    setCoordinates({ latitude: '', longitude: '' });
  };

  return (
    <ScrollView style={stylesCrearf.container}>
      <View style={stylesCrearf.formContainer}>
        <Text style={stylesCrearf.heading}>Registrar Facultad</Text>
        <TextInput
          style={stylesCrearf.input}
          placeholder="Nombre de la facultad"
          value={facultadTitulo}
          onChangeText={setFacultadTitulo}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="Video promocional (URL)"
          value={videoURL}
          onChangeText={setVideoURL}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="Misión"
          multiline
          value={mision}
          onChangeText={setMision}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="Visión"
          multiline
          value={vision}
          onChangeText={setVision}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="URL de Facebook"
          value={UrlFace}
          onChangeText={SetUrlFACE}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="URL del sitio web"
          value={UrlWebSite}
          onChangeText={setUrlWebSITE}
        />
        <TextInput
          style={stylesCrearf.input}
          placeholder="Dirección de Gmail"
          value={gmail}
          onChangeText={setGmail}
        />
        <View style={stylesCrearf.coordinateContainer}>
        <TextInput
            style={stylesCrearf.inputCoord}
            placeholder="Coordenadas o dirección"
            value={address}
            onChangeText={(value) => {
              setAddress(value);
              
              if (value.includes(',')) {
                const [lat, lon] = value.split(',');
                setCoordinates({ latitude: lat.trim(), longitude: lon.trim() });
              } else {
                setCoordinates({ latitude: '', longitude: '' });
              }
            }}
          />

        <TouchableOpacity
          style={stylesCrearf.mapButton}
          onPress={openGoogleMaps}
        >
          <Icon name="map" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesCrearf.mapButton}
          onPress={getCoordinatesFromAddress}
        >
          <Icon name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={stylesCrearf.buttonContainer}>
      <TouchableOpacity
          style={[stylesCrearf.saveButton, isButtonPressed && stylesCrearf.disabledButton]}
          onPress={handleGuardar}
          disabled={isButtonPressed} // Deshabilitar el botón si ya ha sido presionado
        >
          <Icon name="save" size={20} color="#FFFFFF" />
          <Text style={stylesCrearf.buttonText}>Guardar</Text>
          {loading && (
      <View style={stylesCrearf.loadingOverlay}>
        <ActivityIndicator size="large" color="#46741e" />
      </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
          style={stylesCrearf.clearButton}
          onPress={handleCancelar}
          disabled={loading}
        >
          <Icon name="trash" size={20} color="#FFFFFF" />
          <Text style={stylesCrearf.buttonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default FacuCreate;
