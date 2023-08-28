
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert,ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window');
import {stylesCrearC} from './Styles/Styles'

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
          <View style={stylesCrearC.contentContainer}>
            <Text style={stylesCrearC.label}>Titulo</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el titulo"
                ref={tituloRef}
                style={stylesCrearC.textBox}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
            <Text style={stylesCrearC.label}>Descripción</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese descripcion"
                ref={descripcionRef}
                multiline
                style={stylesCrearC.textBoxDescri}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>
            <Text style={stylesCrearC.label}>Url</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el Url"
                ref={urlRef}
                style={stylesCrearC.textBoxUrl}
                value={url_video}
                onChangeText={seturl_video}

              />
            </View>
            <Text style={stylesCrearC.label}>Imagen</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder='Ingrese el URL de la imagen'
                style={stylesCrearC.textBoxurl_imageb}
                ref={url_imagebRef}
                value={url_imageb}
                onChangeText={seturl_imageb}
              />
            </View>
            <View style={stylesCrearC.containerStch}>
      <TouchableOpacity
        style={[stylesCrearC.switchContainer, isOn ? stylesCrearC.switchOn : stylesCrearC.switchOff]}
        onPress={handleToggleSwitch}
      >
        <View style={isOn ? stylesCrearC.toggleOn : stylesCrearC.toggleOff} />
      </TouchableOpacity>
      <Text style={stylesCrearC.text}>Icono de Tiktok</Text>
    </View>
          </View >
        </>
      );
    }
    else if (selectedType == 'Youtube') {
      return (
        <>
          <View style={stylesCrearC.contentContainer}>
            <Text style={stylesCrearC.label}>Titulo</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el titulo"
                ref={tituloRef}
                style={stylesCrearC.textBox}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
            <Text style={stylesCrearC.label}>Descripción</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese descripcion"
                ref={descripcionRef}
                multiline
                style={stylesCrearC.textBoxDescri}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>
            <Text style={stylesCrearC.label}>Url</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder="Ingrese el Url"
                ref={urlRef}
                style={stylesCrearC.textBoxUrl}
                value={url_video}
                onChangeText={seturl_video}
              />
            </View>
            <Text style={stylesCrearC.label}>Imagen</Text>
            <View style={stylesCrearC.textBoxContainer}>
              <TextInput
                placeholder='Ingrese el URL de la imagen'
                style={stylesCrearC.textBoxurl_imageb}
                ref={url_imagebRef}
                value={url_imageb}
                onChangeText={seturl_imageb}
              />
            </View>
            <View style={stylesCrearC.containerStch}>
      <TouchableOpacity
        style={[stylesCrearC.switchContainer, isOn ? stylesCrearC.switchOn : stylesCrearC.switchOff]}
        onPress={handleToggleSwitch}
      >
        <View style={isOn ? stylesCrearC.toggleOn : stylesCrearC.toggleOff} />
      </TouchableOpacity>
      <Text style={stylesCrearC.text}>Icono de Youtube</Text>
    </View>
          </View>
        </>

      );
    }
  }

  return (
    <View style={stylesCrearC.container}>
      <View id="Encabezado" style={stylesCrearC.container2}>
        <Text style={stylesCrearC.tituloTexto}>Contenido</Text>
      </View>
      <ScrollView contentContainerStyle={stylesCrearC.scrollContainer}>
      <View style={stylesCrearC.radioContainer}>
        <TouchableOpacity
          style={[stylesCrearC.radio, selectedType === 'Tiktok' && stylesCrearC.radioSelected]}
          onPress={() => handleRadioButtonPress('Tiktok')}
        >
          {selectedType === 'Tiktok' && <View style={stylesCrearC.radioInner} />}
        </TouchableOpacity>
        <Text style={stylesCrearC.radioLabel}>Tiktok</Text>
        <TouchableOpacity
          style={[stylesCrearC.radio, selectedType === 'Youtube' && stylesCrearC.radioSelected]}
          onPress={() => handleRadioButtonPress('Youtube')}
        >
          {selectedType === 'Youtube' && <View style={stylesCrearC.radioInner} />}
        </TouchableOpacity>
        <Text style={stylesCrearC.radioLabel}>Youtube</Text>
      </View>
      {tikYou()}
      <TouchableOpacity
    style={[stylesCrearC.publicarButton, isButtonPressed && stylesCrearC.disabledButton]}
    onPress={handlePublicar}
    disabled={isButtonPressed} // Deshabilitar el botón si ya ha sido presionado
  >
    <Text style={stylesCrearC.publicarButtonText}>Publicar</Text>
</TouchableOpacity>
{isLoading && (
      <View style={stylesCrearC.loadingOverlay}>
        <ActivityIndicator size="large" color="#46741e" />
      </View>
    )}
    </ScrollView>
    </View>
  );
}
export default Contenido;
