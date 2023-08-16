
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert,ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window');

export function Contenido() {
  const tituloRef = useRef(null);
  const descripcionRef = useRef(null);
  const urlRef = useRef(null);
  const url_imagebRef = useRef(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [url_video, seturl_video] = useState('');
  const [url_imageb, seturl_imageb] = useState('');
  const [selectedType, setSelectedType] = useState('Tiktok');
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);


  const handleToggleSwitch = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  if (!isOn) {
    if (selectedType === 'Youtube') {
      // Si el switch se activa en el radio botón de Youtube, establecer una URL de video de Youtube
      seturl_imageb('https://cdn-icons-png.flaticon.com/512/174/174883.png'); 
    } else if (selectedType === 'Tiktok') {
      // Si el switch se activa en el radio botón de Tiktok, establecer una URL de imagen de Tiktok
      seturl_imageb('https://www.pnguniverse.com/wp-content/uploads/2020/10/Tik-Tok-con-fondo.png');
    }
  } else {
    // Si el switch se desactiva, limpiar el valor de url_imageb
    seturl_imageb('');
  }
  };
  const handleRadioButtonPress = (type) => {
    setSelectedType(type);
    // Limpiar los campos del otro radio botón
    if (type === 'Tiktok') {
      setTitulo('');
      setDescripcion('');
      seturl_video('');
      seturl_imageb('');
      setIsOn(false);
    } else if (type === 'Youtube') {
      setTitulo('');
      setDescripcion('');
      seturl_video('');
      seturl_imageb('');
      setIsOn(false);
    }
  };

  const handlePublicar = async () => {
    if (isButtonPressed) {
      return; // Evitar múltiples pulsaciones
    }
    setIsButtonPressed(true);
    if (!titulo || !descripcion || !url_video || !url_imageb) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos antes de publicar.', [
        {
          text: 'OK',
          onPress: () => {
            if (!titulo) tituloRef.current?.focus();
            else if (!descripcion) descripcionRef.current?.focus();
            else if (!url_video) urlRef.current?.focus();
            else url_imagebRef.current?.focus();

          },
        
        },
      ]);
      setIsButtonPressed(false); // Desbloquear el botón en caso de error
      return;
    }
    if (selectedType === 'Tiktok') {
      const tiktokRegex = /^(?:https?:\/\/)?(?:www\.)?vm\.tiktok\.com\/[a-zA-Z0-9_-]+\/$/i;
      if (!tiktokRegex.test(url_video)) {
        Alert.alert('URL inválida', 'Por favor, ingresa una URL válida de TikTok.');
        urlRef.current?.focus();
        return;
      }
    } else if (selectedType === 'Youtube') {
      const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?.*v=.+|youtu\.be\/.+)$/i;
      if (!youtubeRegex.test(url_video)) {
        Alert.alert('URL inválida', 'Por favor, ingresa una URL válida de YouTube.');
        urlRef.current?.focus();
        return;
      }
    }
    

    if (!validateURL(url_video)) {
      Alert.alert('URL inválida', 'Por favor, ingresa una URL válida.');
      urlRef.current?.focus();
      return;
    }


    const videoUrlExists = await validateURLExistence(url_video);
    if (!videoUrlExists) {
      Alert.alert('URL no encontrada', 'La URL  no existe o no está disponible.');
      urlRef.current?.focus();
      return;
    }
    const imagenUrlExists = await validateURLExistence(url_imageb);
    if (!imagenUrlExists) {
      Alert.alert('URL no encontrada', 'La URL  no existe o no está disponible.');
      urlRef.current?.focus();
      return;
    }


    try {
      setIsLoading(true);
      const nuevoContenido = {
        titulo,
        descripcion,
        url_video,
        url_imageb,
        tipo_contenido: selectedType,
        usuario_id: 1, // Asegúrate de actualizar esto con el id del usuario correspondiente
      };

      await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/multimedia/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoContenido),
      });
      setIsLoading(false);
      // Mostrar el mensaje de éxito y limpiar los campos
      Alert.alert(
        'Éxito',
        'Contenido agregado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => {
              setTitulo('');
              setDescripcion('');
              seturl_video('');
              seturl_imageb('');
              setIsOn(false);

            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setIsLoading(false);
    }
    setIsButtonPressed(false);
  };
  const validateURL = (url_video) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url_video);
  };

  const validateURLExistence = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error al validar URL:', error);
      return false;
    }
  };

  const tikYou = () => {
    if (selectedType == 'Tiktok') {
      return (
        <>
          <View style={styles.contentContainer}>
            <Text style={styles.label}>Titulo</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el titulo"
                ref={tituloRef}
                style={styles.textBox}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
            <Text style={styles.label}>Descripción</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese descripcion"
                ref={descripcionRef}
                multiline
                style={styles.textBoxDescri}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>
            <Text style={styles.label}>Url</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el Url"
                ref={urlRef}
                style={styles.textBoxUrl}
                value={url_video}
                onChangeText={seturl_video}

              />
            </View>
            <Text style={styles.label}>Imagen</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder='Ingrese el URL de la imagen'
                style={styles.textBoxurl_imageb}
                ref={url_imagebRef}
                value={url_imageb}
                onChangeText={seturl_imageb}
              />
            </View>
            <View style={styles.containerStch}>
      <TouchableOpacity
        style={[styles.switchContainer, isOn ? styles.switchOn : styles.switchOff]}
        onPress={handleToggleSwitch}
      >
        <View style={isOn ? styles.toggleOn : styles.toggleOff} />
      </TouchableOpacity>
      <Text style={styles.text}>Icono de Tiktok</Text>
    </View>
          </View >
        </>
      );
    }
    else if (selectedType == 'Youtube') {
      return (
        <>
          <View style={styles.contentContainer}>
            <Text style={styles.label}>Titulo</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el titulo"
                ref={tituloRef}
                style={styles.textBox}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
            <Text style={styles.label}>Descripción</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese descripcion"
                ref={descripcionRef}
                multiline
                style={styles.textBoxDescri}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>
            <Text style={styles.label}>Url</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el Url"
                ref={urlRef}
                style={styles.textBoxUrl}
                value={url_video}
                onChangeText={seturl_video}
              />
            </View>
            <Text style={styles.label}>Imagen</Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder='Ingrese el URL de la imagen'
                style={styles.textBoxurl_imageb}
                ref={url_imagebRef}
                value={url_imageb}
                onChangeText={seturl_imageb}
              />
            </View>
            <View style={styles.containerStch}>
      <TouchableOpacity
        style={[styles.switchContainer, isOn ? styles.switchOn : styles.switchOff]}
        onPress={handleToggleSwitch}
      >
        <View style={isOn ? styles.toggleOn : styles.toggleOff} />
      </TouchableOpacity>
      <Text style={styles.text}>Icono de Youtube</Text>
    </View>
          </View>
        </>

      );
    }
  }

  return (
    <View style={styles.container}>
      <View id="Encabezado" style={styles.container2}>
        <Text style={styles.tituloTexto}>Contenido</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radio, selectedType === 'Tiktok' && styles.radioSelected]}
          onPress={() => handleRadioButtonPress('Tiktok')}
        >
          {selectedType === 'Tiktok' && <View style={styles.radioInner} />}
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Tiktok</Text>
        <TouchableOpacity
          style={[styles.radio, selectedType === 'Youtube' && styles.radioSelected]}
          onPress={() => handleRadioButtonPress('Youtube')}
        >
          {selectedType === 'Youtube' && <View style={styles.radioInner} />}
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Youtube</Text>
      </View>
      {tikYou()}
      <TouchableOpacity
    style={[styles.publicarButton, isButtonPressed && styles.disabledButton]}
    onPress={handlePublicar}
    disabled={isButtonPressed} // Deshabilitar el botón si ya ha sido presionado
  >
    <Text style={styles.publicarButtonText}>Publicar</Text>
</TouchableOpacity>
{isLoading && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#46741e" />
      </View>
    )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    
    paddingBottom: height * 0.1, // Ajustar el espacio inferior
  },
  container2: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  encabezadoTexto: {
    fontSize: width * 0.04,
    color: '#d5d3e0',
  },
  tituloTexto: {
    fontSize: width * 0.09,
    color: '#46741e',
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
  contentContainer: {
    width: width * 0.9,
    marginTop: height * 0.002,
  },
  label: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    marginTop: height * 0.03,
  },
  textBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: height * 0.001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBox: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  textBoxDescri: {
    fontSize: width * 0.04,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
    height: height * 0.2,
    textAlignVertical: 'top',
  },
  textBoxUrl: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  textBoxurl_imageb: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  publicarButton: {
    backgroundColor: '#46741e',
    borderRadius: width * 0.1,
    width: width * 0.5,
    alignSelf: 'center',
    marginTop: height * 0.05,
    paddingVertical: height * 0.02,
  },
  publicarButtonText: {
    fontSize: width * 0.05,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#46b41e',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#46b41e',
  },
  radioLabel: {
    fontSize: 16,
    color: 'gray',
    marginRight: 25,
  },
  selectImageButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectImageButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerStch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 19,
  },
  text: {
    fontSize: 16,
    marginLeft: 6,
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    paddingHorizontal: 2,
  },
  switchOn: {
    backgroundColor: '#46b41e',
  },
  switchOff: {
    backgroundColor: '#ddd',
  },
  toggleOn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    margin: 2,
  },
  toggleOff: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color de fondo semitransparente
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Contenido;
