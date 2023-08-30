import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Modal, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/es';
import { stylesGestionCn } from './Styles/Styles'
moment.locale('es');
const ContentCard = ({ id, title, description, fecha, contenido, url, url_imagen, onPressEdit, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedUrl, setEditedUrl] = useState(url);
  const [editeUrlima, setEditeUrlima] = useState(url_imagen);
  const [originalTitle, setOriginalTitle] = useState(title);
  const [originalDescription, setOriginalDescription] = useState(description);
  const [originalUrl, setOriginalUrl] = useState(url);
  const [originakima, setOriginalima] = useState(url_imagen);
  const [isSaving, setIsSaving] = useState(false);


  // Función para manejar la acción de editar contenido
  const handleEdit = () => {
    setModalVisible(true);
  };

  // Función para manejar la acción de guardar los cambios al editar contenido
  const handleSave = async () => {
    setIsSaving(true);

    // Validar campos vacíos y URL válida
    if (!editedTitle.trim() || !editedDescription.trim() || !isValidUrl(editedUrl) || !isValidUrl(editeUrlima)) {
      Alert.alert('Error', 'Por favor, complete todos los campos y asegúrese de ingresar una URL válida.');
      return;
    }
    const currentContentType = contenido;

    // Validar las URLs según el tipo de contenido
    if (currentContentType === 'Tiktok') {
      const tiktokRegex = /^(?:https?:\/\/)?(?:www\.)?vm\.tiktok\.com\/[a-zA-Z0-9_-]+\/$/i;
      if (!tiktokRegex.test(editedUrl)) {
        Alert.alert('URL inválida', 'Por favor, ingresa una URL válida de TikTok.');
        return;
      }
    } else if (currentContentType === 'Youtube') {
      const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?.*v=.+|youtu\.be\/.+)$/i;
      if (!youtubeRegex.test(editedUrl)) {
        Alert.alert('URL inválida', 'Por favor, ingresa una URL válida de YouTube.');
        return;
      }
    }
    // Validar la existencia de las URLs
    const videoUrlExists = await validateURLExistence(editedUrl);
    if (!videoUrlExists) {
      Alert.alert('URL no encontrada', 'La URL de video no existe o no está disponible.');
      return;
    }
    const imageUrlExists = await validateURLExistence(editeUrlima);
    if (!imageUrlExists) {
      Alert.alert('URL no encontrada', 'La URL de imagen no existe o no está disponible.');
      return;
    }

    // Mostrar confirmación antes de guardar los cambios
    Alert.alert(
      'Guardar cambios',
      '¿Desea guardar los cambios?',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            setEditedTitle(originalTitle);
            setEditedDescription(originalDescription);
            setEditedUrl(originalUrl);
            setEditeUrlima(originakima)
            setModalVisible(false);
          },
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              const editedData = {
                titulo: editedTitle,
                descripcion: editedDescription,
                url_video: editedUrl,
                url_imageb: editeUrlima,
                usuario_id: 1,
                tipo_contenido: contenido,
              };
              // Actualizar el documento con los datos editados
              await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/multimedia/update/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
              })

              // Mostrar mensaje de éxito y actualizar la información en la lista
              Alert.alert('Los datos se modificaron correctamente');
              setModalVisible(false);
              onPressEdit(id, editedData);
            } catch (error) {
              console.error('Error al guardar los cambios:', error);
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

  // Función para manejar la acción de eliminar contenido
  const handleDelete = () => {
    // Mostrar confirmación antes de eliminar el contenido
    Alert.alert(
      `¿Desea eliminar "${title}"?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  // Función para manejar la acción de cancelar la edición
  const handleCancel = () => {
    // Restaurar los valores originales y ocultar el modal de edición
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedUrl(url);
    setModalVisible(false);
    setEditeUrlima(url_imagen);
  };

  // Función para validar si una URL es válida
  const isValidUrl = (value) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
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


  // Restringir la descripción a un máximo de 50 caracteres para mostrar en la tarjeta
  const truncatedDescription = description.length > 50 ? `${description.substring(0, 50)}...` : description;

  return (

    <View style={stylesGestionCn.card}>
      <View style={stylesGestionCn.imageContainer}>
        <Text style={stylesGestionCn.title}>{title}</Text>
        <Image source={{ uri: editeUrlima }} style={stylesGestionCn.logo} />
      </View>
      <Text style={stylesGestionCn.fecha}>{moment(fecha).format('LL')}</Text>
      <Text style={stylesGestionCn.description}>{truncatedDescription}</Text>
      <View style={stylesGestionCn.buttonContainer}>
        <TouchableOpacity style={stylesGestionCn.button} onPress={handleEdit}>
          <AntDesign name="edit" size={24} color="#46741e" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesGestionCn.button} onPress={handleDelete}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Modal de edición */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={stylesGestionCn.modalContainer}>
          <View style={stylesGestionCn.modalContent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Título</Text>
            <TextInput
              style={stylesGestionCn.input}
              placeholder="Título"
              value={editedTitle}
              onChangeText={(text) => setEditedTitle(text)}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Descripción</Text>
            <TextInput
              style={stylesGestionCn.input}
              multiline
              placeholder="Descripción"
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>URL</Text>
            <TextInput
              style={stylesGestionCn.input}
              placeholder="URL"
              value={editedUrl}
              onChangeText={(text) => setEditedUrl(text)}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imagen</Text>
            <TextInput
              style={stylesGestionCn.input}
              placeholder="Imagen"
              value={editeUrlima}
              onChangeText={(text) => setEditeUrlima(text)}
            />
            <View style={stylesGestionCn.modalButtonContainer}>
              <TouchableOpacity
                style={stylesGestionCn.modalButton}
                onPress={handleSave}
                disabled={isSaving}  // Desactivar el botón mientras se está guardando
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={stylesGestionCn.modalButtonText}>Guardar</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={stylesGestionCn.modalButtonCancel} onPress={handleCancel}>
                <Text style={stylesGestionCn.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AppGestion = () => {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función para manejar el evento de "pull to refresh" en la lista de contenidos
  const onRefresh = async () => {
    setRefreshing(true);
    // Limpiar los datos existentes al hacer refresh
    setContentData([]);
    try {
      // Obtener los nuevos datos actualizados
      await fetchContentData();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchContentData = () => {
    setLoading(true);
    fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/multimedia/getAll')
      .then((response) => response.json())
      .then((data) =>
        setContentData(
          data.multimedias.map((item) => ({
            id: item.ID,
            titulo: item.titulo,
            descripcion: item.descripcion,
            url: item.url_video,
            url_imagen: item.url_imageb,
            contenido: item.tipo_contenido,
          }))
        )
      )
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchContentData();
  }, []);

  // Función para manejar la acción de editar contenido en la lista
  const handleEditContent = (id, editedData) => {
    // Actualizar la información en la lista de contenido
    const updatedData = contentData.map((content) => {
      if (content.id === id) {
        return {
          ...content,
          ...editedData, // Desestructuramos el objeto editedData para actualizar los campos modificados
        };
      }
      return content;
    });

    // Establecer la nueva información en el estado
    setContentData(updatedData);
  };

  // Función para manejar la acción de eliminar contenido en la lista
  const handleDeleteContent = async (id) => {
    try {
      // Eliminar el documento correspondiente al contenido
      await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/multimedia/Delete/${id}`, {
        method: 'DELETE',
      });

      // Actualizar la lista de contenido en el estado
      setContentData((prevData) => prevData.filter((content) => content.id !== id));
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
    }
  };

  return (
    <View style={stylesGestionCn.container}>
      <Text style={stylesGestionCn.header}>Gestión de contenido</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={stylesGestionCn.loadingIndicator} />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {contentData.map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.titulo}
              fecha={content.UpdatedAt}
              description={content.descripcion}
              url={content.url}
              url_imagen={content.url_imagen}
              contenido={content.contenido}
              onPressEdit={handleEditContent}
              onDelete={handleDeleteContent}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};



export default AppGestion;
