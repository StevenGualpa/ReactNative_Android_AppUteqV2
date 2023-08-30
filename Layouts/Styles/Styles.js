import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.9;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const cardWidthM = (width - 150) / 2;

//Estilos para el Login
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  logoContainer: {
    width: width * 0.7,
    height: height * 0.13,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: width * 0.1,
    color: 'white',
    fontWeight: 'bold',
    marginTop: height * -0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    width: width * 0.9,
    marginTop: height * 0.03,
  },
  inputIcon: {
    marginLeft: width * 0.04,
    marginRight: width * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.05,
    color: 'white',
    paddingVertical: height * 0.02,
  },
  passwordInput: {
    flex: 1,
    fontSize: width * 0.05,
    color: 'white',
    paddingVertical: height * 0.02,
  },
  showPasswordButton: {
    padding: width * 0.02,
    marginRight: width * 0.04,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.1,
    marginTop: height * 0.03,
  },
  buttonWithElevation: {
    elevation: 5,
  },
  loginButtonText: {
    fontSize: width * 0.05,
    color: '#46b41e',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    fontSize: width * 0.045,
    color: 'white',
    marginTop: height * 0.03,
    textDecorationLine: 'underline',
  },
  passwordText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: height * 0.03,
    top: 0,
   left: width*0.2, // Ajusta la posición derecha según tus necesidades
  },

});

export const styleshome = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f6fa',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    textAlign: 'left',
    marginLeft: 10,
  },
  cardRevis: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
    height: 350,
  },
  cardNoti: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
    height: 275,
  },
  cardConte: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
    height: 300,
  },
  contentCard: {
    marginTop: 12,
    width: 210,
    height: 210,
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 135,
    borderRadius: 15,
    resizeMode: 'stretch',
  },
  logoRevis: {
    width: 195,
    height: 180,
    resizeMode: 'contain',
  },
  contentImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignContent: 'center',
  },
  titleconte: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleContainer: {
    height: 48,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor:"#46741e" ,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#ffffff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
});

export const stylesVisNotices =StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: cardWidth,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}
);

export const stylesVisContenidos = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 106,
    height: 104,
    borderRadius: 10,
    resizeMode: 'stretch',
    marginTop: 7,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  description: {
    flex: 1,
    marginVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  fecha: {
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 4,
  },
});

export const stylesVisRevistas = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: cardWidth,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const stylesPerfil = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderColor: '#46741e', // Color del borde
    borderWidth: 3, // Ancho del borde
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileContainer: {
    flex: 1, // Expande el profileContainer por toda la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.1,
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#f5f6fa',
  },
  profilePicture: {
    resizeMode: 'stretch',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginBottom: windowHeight * 0.01,
  },
  label: {
    fontSize: windowWidth * 0.04,
    color: '#f5f6fa',
    marginBottom: windowHeight * 0.01,
    borderRadius: 25,
    backgroundColor: '#46741e',
    padding: 5,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  textCorre: {
    fontSize: windowWidth * 0.04,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
    color: '#2a2d3f',
  },
  buttonText: {
    color: '#6A6C88',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 19,
  },
  buttonTextModal: {
    color: '#f5f6fa',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 19,
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
    marginTop: -windowWidth * 0.2, // Ajusta el margen superior para que la tarjeta esté un poco más arriba
    marginBottom: windowWidth * 0.0,
    elevation: 10, // Agrega la elevación (sombra) aquí
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  changePasswordButton: {
    borderColor: '#46741e', // Color del borde
    borderWidth: 3, // Ancho del borde
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',

  },
  // Estilos para el modal
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalInput: {
    flex: 1,
  },
  modalSaveButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalCancelButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#46741e', // Color de la línea
    marginBottom: 5,
  },
});
export const stylesRetablecer = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      width: '90%',
      maxHeight: '90%', // Ajusta esta propiedad para controlar la altura del modal
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
  },
  modalTitle: {
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',

  },
  modalTitleN: {
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      marginLeft: 30,
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Para separar el ícono y el campo de entrada
      borderBottomWidth: 1,
      borderColor: 'gray',
      marginTop: 20,
      marginBottom: 20,
      paddingBottom: 5, // Espacio para las líneas
      fontSize: 16,
  },
  inputIcon: {
      marginRight: 10,
  },
  inputLine: {
      borderBottomWidth: 1,
      borderColor: '#ddd', // Color de las líneas debajo de los campos
      flex: 1, // Para que ocupe el espacio restante
  },
  input: {
      flex: 1,
      fontSize: 16,
  },

  button: {
      backgroundColor: '#46741e',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
  },
  closeButton: {
      marginTop: 20,
      alignItems: 'center',
  },
  closeButtonText: {
      color: 'red',
      fontSize: 16,
  },
  backButton: {
      width: 40,
      height: 40,
      borderRadius: 20, // La mitad del ancho o alto para hacer un círculo
      backgroundColor: '#46741e',
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },

});
export const stylesChat = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieLogo: {
    width: 200,
    height: 200,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 7,
  },
  sendButton: {
    backgroundColor: '#46741e',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  messageItem: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd', // Color del borde de la burbuja de chat
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#46b41e',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 20,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: 'white', // Color del texto de mensaje enviado
  },
  receivedMessageText: {
    color: 'black', // Color del texto de mensaje recibido
    fontWeight: 'bold', // Puedes ajustar otros estilos según tus preferencias
  },
});
export const stylesCrearC = StyleSheet.create({
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
 export const stylesCrearCrr = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#46741e',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#46741e',
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    color: '#333333',
  },
  textArea: {
    height: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botonGuardar: {
    backgroundColor: '#46741e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonLimpiar: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
  imagePreview: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
  },
});
export const stylesCrearf = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46b41e',
    textAlign:'center',
    marginBottom: 20,
  },
  inputCoord:{
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
    width: '70%'
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
  coordinateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  coordinateInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
  mapButton: {
    backgroundColor: '#46b41e',
    borderRadius: 8,
    padding: 10,
    marginLeft:5,
    marginBottom:15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46b41e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5350',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color de fondo semitransparente
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getCoordinatesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  getCoordinatesButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
export const stylesCrearU = StyleSheet.create({
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
      maxHeight: windowHeight * 1,
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

export const stylesEditCrr = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#46741e',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#46741e',
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 15,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
  facultadSelector: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  facultadText: {
    fontSize: 16,
  },
  ContenedorFacultades: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    width: '95%',
    borderRadius: 15,
    
  },
  scrollView: {
    width: '100%',
  },
  facultadHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 15,
    color: '#46741e',
  },
});
export const stylesEDitF = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: windowWidth * 1,
    maxHeight: windowHeight * 0.9,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#46741e',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#46741e',
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 150,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carreraItem: {
    marginBottom: 10,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  googleMapsButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    padding: 10,
  },
  coordinateInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: '#333333',
  },
});
export const stylesGestionCrr = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});
export const stylesGestionCn = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {

    width: 106, // Ajusta el ancho de la imagen según tu preferencia
    height: 104, // Ajusta el alto de la imagen según tu preferencia
    borderRadius: 10,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  fecha: {
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 4
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 23,
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  uploadIcon: {
    marginRight: 8,
  },
});
export const stylesGestionUser = StyleSheet.create({
  container: {
    paddingTop: 10, // Ajustar el espacio superior para separar las tarjetas del título
    paddingBottom: 20, // Ajustar el espacio inferior para separar las tarjetas del borde inferior
  },
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContainer: {
    alignItems: 'center', // Centrar horizontalmente las tarjetas en el contenedor
    marginBottom: 20, // Agregar espacio entre las tarjetas
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#46741e'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns "Nombre Completo" to the left and Name and Surname to the right
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  valueComple: {
    flex: 2,
    fontSize: 16,
    color: 'black',
    marginTop: 18,
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalValue: {
    fontSize: 16,
    color: '#46741e',
    marginBottom: 11,
    marginTop: 9,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection:'row',
  },
  buttonIcon: {
    marginRight: 5, // Agregar margen a la derecha del icono
  },
  cancelButton: {
    backgroundColor: 'red', // Agrega el color de fondo deseado, por ejemplo, rojo
  },
});
export const stylesGestionF = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#46741e',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  carreraItem: {
    marginBottom: 10,
  },
  carreraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carreraDescription: {
    fontSize: 16,
    color: '#555555',
  },
});
export const stylesMenu = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#46741e',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardContainer: {
    marginBottom: 20,
    width:150,
    backgroundColor: '#f5f6fa',
  },
});
export const stylesMenuR = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#46741e',
  },
 column: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', // Esta propiedad permite que los elementos se reorganicen automáticamente
  },
  cardContainer: {
    marginBottom: 20,
    width: (width - 70) / 2, // Para que los botones llenen la mitad del ancho de la pantalla
    backgroundColor: '#f5f6fa',
    marginLeft:25,
  },
});
export const stylesModalCrr = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: cardWidthM,
    height: cardWidthM,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#f5f6fa',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export const stylesModalC = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: cardWidthM,
    height: cardWidthM,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#f5f6fa',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export const stylesModalF = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46b41e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: cardWidthM,
    height: cardWidthM,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#f5f6fa',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export const stylesRegister = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: width * 0.9,
    maxHeight: height * 1,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
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
  showPasswordButton: {
    padding: 10,
    marginRight: 5,
  },
  registerButton: {
    backgroundColor: '#46b41e',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButtonIcon: {
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonIcon: {
    marginRight: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const stylesModalU = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46b41e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: cardWidthM,
    height: cardWidthM,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#f5f6fa',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export const stylesMostrarF = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cardView: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  googleMapsButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10
  },
  googleMapsButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  googleMapsButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50', // Green color
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#46741e', // Title color in green
  },
  video: {
    width: windowWidth,
    height: 200,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    elevation: 15,
    padding: 10,
    margin: 5,
  },
  tabText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  scrollContainer: {
    marginTop: 5,
    flex: 1,
  },
  tabContent: {
    padding: 15,
    fontSize: 16,
  },
  carreraCard: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  carreraImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  carreraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  carreraDescription: {
    fontSize: 15,
    color: '#555',
  },
  websiteButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  socialButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '95%',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: windowWidth - 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },
  modalDescriptionContainer: {
    maxHeight: 350,
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
});
export const stylesNabvarUp = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: '#f5f6fa',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: width * 0.8,
    height: height,
    borderRadius: 10,
  },
  menuImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',

  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  menuOptionsContainer: {
    flex: 1,
  },
  menuOptions: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  menuItemContainer: {
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 18,
    color: 'white',
  },
  searchModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10
  },
  closeSearchModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  searchResultsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 25,
    width: width * 0.95,
    maxHeight: height * 0.8,
  },
  searchResultItem: {
    fontSize: 18,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 20,
    width: width * 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#46b41e',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: width * 0.75,
    backgroundColor: '#00A200',
    borderRadius: 8,
    overflow: 'hidden',

  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dropdownTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdownContent: {
    maxHeight: 200,
    paddingHorizontal: 10,
  },
  dropdownOption: {
    paddingVertical: 12,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  searchResultsScrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  searchResultItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  searchResultButton: {
    marginTop: 10,
    backgroundColor: '#46b41e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchResultButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    margin: 1,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.8

  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 165,
    height: 135,
    borderRadius: 15,
    resizeMode: 'stretch'
  },
  line: {
    width: '80%',
    height: 3,
    backgroundColor: 'white', // Color de la línea
    marginBottom: '2%',
  },
  infoModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    maxHeight: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    resizeMode: 'center',
  },
  infoMemberList: {
    maxHeight: 150,
  },
  infoMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoMemberText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeInfoModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  cerrar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: 'white', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttonface: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: 'blue', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  ButtonTik: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: '#000', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttontwt: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  infoButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,

  },
  extraButton: {
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 8,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  notificationCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

});

export const stylesNofi = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      width: windowWidth * 0.9,
      height: windowHeight * 0.9,
      backgroundColor: '#f5f6fa',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 10,
  },
  modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  notificationDescription: {
      fontSize: 14,
      color: '#777',
      marginBottom: 20,
  },
  notificationList: {
      flexGrow: 1,
      marginBottom: 10,
  },
  notificationItem: {
      marginBottom: 15,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
  },
  notificationTitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  notificationDescripcion: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
  },
  newIndicator: {
      color: 'red',
  },
  modalCloseButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: 'red',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
  },
  closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
  },
});

