import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const AppUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rcontrasena, setrContrasena] = useState('');
    const [userId, setUserId] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordText, setShowPasswordText] = useState(true);
    const [showrPasswordText, setShowrPasswordText] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    // Función para ocultar el modal

    const alertMessageStyles = { textAlign: 'center' };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        setShowPasswordText(!showPasswordText);
    };
    const toggleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
        setShowrPasswordText(!showrPasswordText);
    };


    //VALIDACION DE LOS NOMBRE Y APELLIDOS SIN NUMEROS
    const isValidName = (value) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        return regex.test(value);
    };

    const isValidApellido = (value) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        return regex.test(value);
    };
    //VALIDACION PARA LA CQUE LA CLAVE DEBA CONTENER MAYUSCULAS, MINUSCULAS, NUMERO Y CARACTERES ESPECIALES DE 8 A 15
    const isValidPassword = (value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]).{8,15}$/;
        return regex.test(value);
    };

    const handleGuardarUsuario = () => {

        // Validar campos vacíos
        if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !contrasena.trim() || !rcontrasena.trim()) {
            Alert.alert('Campos vacíos', 'Por favor, complete todos los campos antes de guardar el usuario.');
            return;
        }

        // Validar que no se ingresen números en nombre y apellidos
        const regex = /\d/;
        if (regex.test(nombre) || regex.test(apellidos)) {
            Alert.alert('Nombre o apellidos inválidos', 'Por favor, no ingrese números en el nombre o apellidos.', [{ text: 'OK' }],
                { multiline: true, style: alertMessageStyles });
            return;
        }
        const isValidInstitucionalPassword = isValidPassword(contrasena);
        if (!isValidInstitucionalPassword) {
            Alert.alert('Contraseña', 'La clave debe tener entre 8 y 15 caracteres y contener letras mayúsculas, minúsculas, números y caracteres especiales.', [{ text: 'OK' }],
                { multiline: true, style: alertMessageStyles }
            );
            return;
        }

        // Validar el formato del correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            Alert.alert('Correo inválido', 'Por favor, ingrese un correo válido.', [{ text: 'OK' }],
                { multiline: true, style: alertMessageStyles });
            return;
        }

        // Validar que el correo sea de dominio @uteq.edu.ec
        if (!correo.endsWith('@uteq.edu.ec')) {
            Alert.alert('Correo inválido', 'Por favor, ingrese un correo con dominio @uteq.edu.ec.', [{ text: 'OK' }],
                { multiline: true, style: alertMessageStyles });
            return;
        }
        if (contrasena !== rcontrasena) {
            Alert.alert('Repetir contraseña', 'Las contraseñas no coinciden.', [{ text: 'OK' }],
                { multiline: true, style: alertMessageStyles });
            return;
        }
        const data = {
            email: correo,
            password: contrasena,
            rol: 'Administrador',
            nombre: nombre,
            apellido: apellidos,
        };

        axios
            .post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/registercorreocode', data)
            .then((response) => {
                console.log('Registro exitoso:', response.data);
                const userId = response.data.data.ID;
                setUserId(userId);
                setModalVisible(true);
            })
            .catch((error) => {
                console.error('Error al registrar:', error);
                setMessage('Error al registrar. Por favor, inténtalo de nuevo.');
            });

        // Aquí puedes realizar el guardado del usuario en tu base de datos o realizar la acción necesaria
        console.log('Guardar Usuario');
        // Limpia los campos después de guardar
        setNombre('');
        setApellidos('');
        setCorreo('');
        setContrasena('');
        setrContrasena('');
    };
    const handleVerification = () => {
        if (!verificationCode.trim()) {
            Alert.alert('Verifiación','Por favor, ingresa el código de verificación.');
            return;
          }
      
          axios
            .put(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/verifyUser/${userId}/${verificationCode}`)
            .then((response) => {
              console.log('Usuario verificado exitosamente:', response.data);
              // Aquí puedes realizar acciones adicionales en caso de que el usuario haya sido verificado exitosamente.
              // Por ejemplo, redireccionar a otra pantalla, mostrar un mensaje de éxito, etc.
              Alert.alert('Éxito', 'Usuario verificado exitosamente.', [{ text: 'Aceptar', onPress: setModalVisible(false) }]);
            })
            .catch((error) => {
              console.error('Error al verificar usuario:', error);
              Alert.alert('Verificación','Código de verificación incorrecto. Por favor, inténtalo de nuevo.');
            });
        
        };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Agregar Usuario</Text>
            <View style={{ width: 340, marginBottom: 35 }}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.form}>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldTitle}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese Nombre"
                                value={nombre}
                                onChangeText={(value) => {
                                    if (isValidName(value)) {
                                        setNombre(value);
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.textSeparator} />
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldTitle}>Apellidos</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese Apellidos"
                                value={apellidos}
                                onChangeText={(value) => {
                                    if (isValidApellido(value)) {
                                        setApellidos(value);
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.textSeparator} />
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldTitle}>Correo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese Correo electrinico"
                                multiline
                                value={correo}
                                onChangeText={setCorreo}
                            />
                        </View>
                        <Text style={styles.textSeparator} />
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldTitle}>Contraseña</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingrese Contraseña"
                                    value={contrasena}
                                    secureTextEntry={showPasswordText}
                                    onChangeText={setContrasena}
                                />
                                <TouchableOpacity
                                    style={styles.showPasswordButton}
                                    onPress={toggleShowPassword}
                                >
                                    <Icon
                                        name={showPassword ? 'eye-slash' : 'eye'}
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.textSeparator} />
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldTitle}> Repetir Contraseña</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repetir Contraseña"
                                    value={rcontrasena}
                                    secureTextEntry={showrPasswordText}
                                    onChangeText={setrContrasena}
                                />
                                <TouchableOpacity
                                    style={styles.showPasswordButton}
                                    onPress={toggleShowRepeatPassword}
                                >
                                    <Icon
                                        name={showRepeatPassword ? 'eye-slash' : 'eye'}
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.textSeparator} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleGuardarUsuario}>
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Modal */}
                        <Modal visible={modalVisible} animationType="slide" transparent>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Verificación de Usuario</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="key" size={20} color="gray" style={styles.inputIcon} />
                                        <TextInput
                                            placeholder="Código de verificación"
                                            placeholderTextColor="gray"
                                            style={styles.textInput}
                                            onChangeText={setVerificationCode}
                                            value={verificationCode}
                                        />
                                    </View>

                                    <TouchableOpacity style={styles.buttonVf} onPress={handleVerification}>
                                        <Text style={styles.buttonText}>Validar Usuario</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#46741e',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    form: {
        width: '100%',
    },
    fieldContainer: {
        marginBottom: 10,
    },
    fieldTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 2,
        marginTop: 4,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 14,
        padding: 10,
    },
    passwordContainer: {
        position: 'relative',
    },
    showPasswordButton: {
        position: 'absolute',
        top: 5,
        right: 10,
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#46741e',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        width: windowWidth * 0.5,
    },
    buttonVf: {
        backgroundColor: '#46741e',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        width: '100%', // Ocupa el ancho completo del modal
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textSeparator: {
        height: 20, // Ajusta el valor para el espacio deseado entre los Text
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: windowWidth * 0.9,
        maxHeight: windowheight * 1,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },

    textInput: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        paddingVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
    },
});

export default AppUsuario;
