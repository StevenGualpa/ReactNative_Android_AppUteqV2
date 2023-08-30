import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, stylesRetablecerheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesRetablecer } from './Styles/Styles';

const ChangePasswordModal = ({ isVisible, onClose }) => {
    const [step, setStep] = useState(1); // Controla el paso del proceso
    const [email, setEmail] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [savedEmail, setSavedEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailExists, setEmailExists] = useState(false);




    const handleNext = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const allowedDomains = ['uteq.edu.ec', 'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'outlook.es'];
        const endsWithAllowedDomain = allowedDomains.some(domain => email.toLowerCase().endsWith('@' + domain));

        if (!email) {
            Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
            return;
        }

        if (!emailRegex.test(email) || !endsWithAllowedDomain) {
            Alert.alert(
                'Correo inválido',
                'Por favor, ingresa un correo válido con uno de los siguientes dominios: @uteq.edu.ec, @gmail.com, @hotmail.com, @yahoo.com, @outlook.com'
            );
            return;
        }
        try {
            const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/ResetPassword/${email}`, {
                method: 'PUT',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Email exists:', data);
                setStep(2);
            } else {
                const responseData = await response.json(); // Obtener los detalles del error desde la respuesta JSON
                const errorMessage = responseData.error || 'Ocurrió un error al verificar el correo electrónico.';
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Ocurrió un error al conectarse al servidor.');
        }

    };



    const resetModal = () => {
        onClose();
        setStep(1);
        setEmail('');
        setSecurityCode('');
        setNewPassword('');
        setConfirmPassword('');

    };


    useEffect(() => {
        if (step === 1) {
            setEmail(savedEmail);
        }
    }, [step, savedEmail]);

    const handleChangePassword = async () => {
        // Validaciones para el cambio de contraseña
        if (!securityCode || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (!isValidPassword(newPassword)) {
            Alert.alert('Contraseña', 'La clave debe tener entre 8 y 15 caracteres y contener letras mayúsculas, minúsculas, números y caracteres especiales.');
            return;
        }

        const url = "https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/ChangePassword";
        const data = {
            email: email,
            newPassword: newPassword
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                Alert.alert(
                    'Éxito',
                    'Tu contraseña ha sido cambiada exitosamente.',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                            onClose();
                            setStep(1);
                            setEmail('');
                            setSecurityCode('');
                            setNewPassword('');
                            setConfirmPassword('');
                        },
                      },
                    ],
                  );
                console.log('Password changed:', responseData);
            } else {
                console.error('Error changing password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isValidPassword = (value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]).{8,15}$/;
        return regex.test(value);
    };


    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={stylesRetablecer.modalContainer}>
                <View style={stylesRetablecer.modalContent}>
                    {step === 1 && (
                        <>
                            <Text style={stylesRetablecer.modalTitle}>Cambiar Contraseña</Text>
                            <View style={stylesRetablecer.inputContainer}>
                                <Icon name="envelope" size={20} color="#999" style={stylesRetablecer.inputIcon} />
                                <TextInput
                                    style={stylesRetablecer.input}
                                    placeholder="Correo Electronico"
                                    placeholderTextColor="gray"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <TouchableOpacity style={stylesRetablecer.button} onPress={handleNext}>
                                <Text style={stylesRetablecer.buttonText}>Siguiente</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 2 && (
                        <>

                            <View style={stylesRetablecer.header}>

                                <Text style={stylesRetablecer.modalTitleN}>Nueva Contraseña</Text>
                            </View>
                            <View style={stylesRetablecer.inputContainer}>
                                <Icon name="key" size={20} color="#999" style={stylesRetablecer.inputIcon} />
                                <TextInput
                                    style={stylesRetablecer.input}
                                    placeholder="Código de Seguridad"
                                    placeholderTextColor="gray"
                                    value={securityCode}
                                    onChangeText={setSecurityCode}
                                />
                            </View>
                            <View style={stylesRetablecer.inputContainer}>
                                <Icon name="lock" size={20} color="#999" style={stylesRetablecer.inputIcon} />
                                <TextInput
                                    style={stylesRetablecer.input}
                                    placeholder="Contraseña Nueva"
                                    secureTextEntry
                                    placeholderTextColor="gray"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                            </View>
                            <View style={stylesRetablecer.inputContainer}>
                                <Icon name="lock" size={20} color="#999" style={stylesRetablecer.inputIcon} />
                                <TextInput
                                    style={stylesRetablecer.input}
                                    placeholderTextColor="gray"
                                    placeholder="Repetir Contraseña Nueva"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                            <TouchableOpacity style={stylesRetablecer.button} onPress={handleChangePassword}>
                                <Text style={stylesRetablecer.buttonText}>Cambiar Contraseña</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <TouchableOpacity style={stylesRetablecer.closeButton} onPress={resetModal}>
                        <Text style={stylesRetablecer.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};



export default ChangePasswordModal;
