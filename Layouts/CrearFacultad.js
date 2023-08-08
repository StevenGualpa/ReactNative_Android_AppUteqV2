import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
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
const FacuCreate = () => {
  const [facultadTitulo, setFacultadTitulo] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  const [UrlFace, SetUrlFACE] = useState('');
  const [UrlWebSite, setUrlWebSITE] = useState('');
  const [loading, setLoading] = useState(false);
//VALIDACIONES
  const isURLValid = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  const isFacebookURLValid = (url) => {
    // Expresión regular para verificar si la URL tiene el formato correcto de Facebook
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
  
    return facebookRegex.test(url);
  };
  const isUteqURLValid = (url) => {
    // Expresión regular para verificar si la URL comienza con "https://www.uteq.edu.ec"
    const uteqRegex = /^https:\/\/www\.uteq\.edu\.ec(\/.*)?$/;
  
    return uteqRegex.test(url);
  };

  const handleGuardar = async () => {
    if (facultadTitulo.trim() === '' || videoURL.trim() === '' || mision.trim() === '' || vision.trim() === '' || UrlFace.trim()==='' || UrlWebSite.trim()==='') {
      Alert.alert('Error', 'No puedes dejar campos en blanco');
      return;
    }
  
    if (!(await isURLValid(videoURL))) {
      Alert.alert('Error', 'La URL del video promocional no existe o no es válida');
      return;
    }
    //valida la url de facebook
    if (!isFacebookURLValid(UrlFace)) {
      Alert.alert('Error', 'La URL de Facebook no es válida');
      return;
    }
    //valdia la url del sitio web
    if (!isUteqURLValid(UrlWebSite)) {
      Alert.alert('Error', 'La URL del sitio web no es válida. Debe iniciar con "https://www.uteq.edu.ec"');
      return;
    }
    // Formatear la URL del video promocional antes de guardarla
    const formattedVideoURL = formatVideoURL(videoURL);
  
    const facultadData = {
      nombre: facultadTitulo,
      urlVideo: formattedVideoURL,
      mision: mision,
      vision: vision,
      urlFacebook: UrlFace,
      UrlSitio: UrlWebSite
    };

    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in facultadData) {
        formData.append(key, facultadData[key]);
      }

      // Realizar la solicitud POST a la API para registrar la facultad
      const responseFacultad = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const dataFacultad = await responseFacultad.json();

      if (!responseFacultad.ok) {
        throw new Error(dataFacultad.msg || 'Error al registrar la facultad');
      }

           // Mostrar una alerta de éxito
      Alert.alert('Éxito', 'Facultad registrada correctamente.');
      setFacultadTitulo('');
      setVideoURL('');
      setMision('');
      setVision('');
      setUrlWebSITE('');
      SetUrlFACE('');
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error', error.message || 'Ha ocurrido un error al registrar la facultad. Por favor, inténtalo de nuevo más tarde.');
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

  };
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor:"white" }}>
      <ScrollView>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#46741e', marginBottom: 10 }}>Nombre de la facultad</Text>
        <TextInput
          style={{ backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1 }}
          placeholder="Ingrese el nombre de la facultad"
          value={facultadTitulo}
          onChangeText={setFacultadTitulo}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#46741e', marginBottom: 10, marginTop: 20 }}>Video promocional (URL)</Text>
        <TextInput
          style={{  backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1  }}
          placeholder="Ingrese la URL del video promocional"
          value={videoURL}
          onChangeText={setVideoURL}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#46741e', marginBottom: 10, marginTop: 20 }}>Misión</Text>
        <TextInput
          style={{  backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1  }}
          placeholder="Ingrese la mision"
          multiline
          value={mision}
          onChangeText={setMision}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#46741e', marginBottom: 10, marginTop: 20 }}>Visión</Text>
        <TextInput
          style={{  backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1  }}
          placeholder="Ingrese la vision"
          multiline
          value={vision}
          onChangeText={setVision}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#46741e', marginBottom: 10, marginTop: 20 }}>Enlaces</Text>
        <TextInput
          style={{  backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1 }}
          placeholder="Ingrese la url de facebook"
          multiline
          value={UrlFace}
          onChangeText={SetUrlFACE}
        />
        <TextInput
          style={{ backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth:1 }}
          placeholder="Ingrese la url del sitio web"
          multiline
          value={UrlWebSite}
          onChangeText={setUrlWebSITE}
        />    
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#46741e',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 20,
            width: windowWidth * 0.4,
          }}
          onPress={handleGuardar}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" style={{ marginRight: 8 }} />
          ) : (
            <Icon name="save" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          )}
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
            Guardar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d32f2f',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 20,
            width: windowWidth * 0.4,
          }}
          onPress={handleCancelar}
        >
          <Icon name="trash" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
            Limpiar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FacuCreate;
