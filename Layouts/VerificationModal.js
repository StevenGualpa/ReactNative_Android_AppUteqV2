import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VerificationModal = ({ visible = false, onVerify, onClose, errorMessage }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerification = () => {
    onVerify(verificationCode); // Llama a la función onVerify con el código de verificación
    setVerificationCode(''); // Opcionalmente, puedes restablecer el código de verificación después de manejarlo
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Verificación de Usuario</Text>
          <View style={styles.inputContainer}>
            <Icon name="key" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              placeholder="Código de verificación"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={(text) => setVerificationCode(text)}
              value={verificationCode}
            />
          </View>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
            <Text style={styles.verifyButtonText}>Validar Usuario</Text>
          </TouchableOpacity>

          {/*
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#46b41e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  verifyButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default VerificationModal;
