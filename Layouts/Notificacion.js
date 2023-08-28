import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {stylesNofi} from './Styles/Styles'

const ModalNotificaciones = ({ isVisible, onClose, unseenNotificationsCount }) => {
    const ejemplosNotificaciones = [
        { id: 1, titulo: 'Nueva notificación', descripcion: '¡Tienes un nuevo mensaje!', nueva: true },
        { id: 2, titulo: 'Actualización', descripcion: 'Se ha publicado una nueva actualización.', nueva: false },
        { id: 3, titulo: 'Recordatorio', descripcion: 'No olvides tu cita médica mañana.', nueva: true },
        { id: 4, titulo: 'Recordatorio', descripcion: 'No olvides tu cita médica mañana.', nueva: true },
        { id: 5, titulo: 'Recordatorio', descripcion: 'No olvides tu cita médica mañana.', nueva: true },
    ];
    

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={stylesNofi.modalContainer}>
                <View style={stylesNofi.modalContent}>
                    <Text style={stylesNofi.modalTitle}>Notificaciones</Text>
                    <Text style={stylesNofi.notificationDescription}>¡Revisa tus notificaciones para mantenerte actualizado!</Text>
                    <ScrollView style={stylesNofi.notificationList}>
                        {ejemplosNotificaciones.map(notificacion => (
                            <View key={notificacion.id} style={stylesNofi.notificationItem}>
                                <Text style={stylesNofi.notificationTitulo}>{notificacion.titulo}</Text>
                                <Text style={stylesNofi.notificationDescripcion}>{notificacion.descripcion}</Text>
                                {notificacion.nueva && <Text style={stylesNofi.newIndicator}>NUEVO</Text>}
                            </View>
                        ))}
                    </ScrollView>
                    <Text style={stylesNofi.notificationText}>
                        Tienes {unseenNotificationsCount} nueva{unseenNotificationsCount !== 1 ? 's' : ''} notificación
                        {unseenNotificationsCount !== 1 ? 'es' : ''}.
                    </Text>
                    <TouchableOpacity style={stylesNofi.modalCloseButton} onPress={onClose}>
                        <Ionicons name="md-close" size={20} color="#ffffff" />
                        <Text style={stylesNofi.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNotificaciones;
