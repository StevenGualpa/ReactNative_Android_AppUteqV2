import React, { useState, useRef, useEffect } from 'react';
import { View, stylesChatheet, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import{stylesChat} from'./Styles/Styles';
const ChatScreen = () => {
  // Estados del componente
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();

  // Configurar el interceptor para manejar errores de respuesta
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Error al enviar el mensaje al web service:', error);
        return Promise.reject('Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
      }
    );

    return () => {
      // Limpiar el interceptor al desmontar el componente
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const sendMessageAndGetResponse = async (message) => {
    try {
      const response = await axios.get(`https://cristianzambranovega.pythonanywhere.com/query`, {
        params: {
          text: message,
        },
      });

      return response.data.respuesta || '';
    } catch (error) {
      console.error('Error al enviar el mensaje al web service:', error);
      return 'Error al enviar el mensaje. Por favor, inténtalo nuevamente.';
    }
  };

  const sendMessage = async () => {
    // Enviar un nuevo mensaje
    if (message.trim().length > 0) {
      const newMessage = { text: message, isSent: true };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage('');

      // Mostrar la pregunta en el log
      console.log('Pregunta:', message);

      // Enviar el mensaje al web service utilizando el método GET
      const responseText = await sendMessageAndGetResponse(message);

      // Agregar la respuesta al chat
      const respuestaMessage = { text: responseText, isSent: false };
      setMessages((prevMessages) => [respuestaMessage, ...prevMessages]);
      flatListRef.current.scrollToEnd({ animated: true });

      // Ocultar el teclado después de enviar el mensaje
      Keyboard.dismiss();
    }
  };

  const handleSendButtonPress = () => {
    // Manejar el evento de presionar el botón de envío de mensaje
    sendMessage();
  };

  const renderMessageItem = ({ item }) => (
    // Renderizar cada elemento de mensaje en la lista (mensaje enviado o recibido)
    <View style={[stylesChat.messageItem, item.isSent ? stylesChat.sentMessage : stylesChat.receivedMessage]}>
      <Text style={[stylesChat.messageText, item.isSent ? stylesChat.sentMessageText : stylesChat.receivedMessageText]}>{item.text}</Text>
    </View>
  );

  return (
    <View style={stylesChat.container}>
      {/* Animación de Lottie */}
      <LottieView
        style={stylesChat.lottieLogo}
        source={require('./src/animation_lkj5w7te.json')}
        autoPlay
        loop
      />
      {/* Lista de mensajes */}
      <FlatList
        style={stylesChat.chatContainer}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        ListEmptyComponent={() => <Text></Text>}
        inverted // Mostrar los nuevos mensajes en la parte inferior
      />
      {/* Cuadro de entrada de mensaje */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={stylesChat.inputContainer}
      >
        <TextInput
          style={stylesChat.input}
          placeholder="Escribe tu mensaje..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSendButtonPress} // Ocultar el teclado al presionar enviar
        />
        {/* Botón de envío */}
        <TouchableOpacity style={stylesChat.sendButton} onPress={handleSendButtonPress}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};



export default ChatScreen;
