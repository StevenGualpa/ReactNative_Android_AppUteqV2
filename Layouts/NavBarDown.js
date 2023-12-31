import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Prefer } from "./Preferencias";
import LoginScreen from "./InicioSesion";
import ContentCard from "./VisualizadorContenidos";
import ViewNoticias from "./VisualizarNoticias";
import Home from "./Home";
import NavigationBar from "./NavBarUp";
import MenuComple from "./Menu";
import MenuRespaldo from "./MenuRespaldo";
import ViewRevista from './VisualizadorRevista'
import ChatScreen from "./ChatBox";
import Contenido from "./Contenido";
import App from "./CrearFacultad";
import AppUsuario from "./CrearUsuario";
import AppGestion from "./GestionContenido";
import FacultadCard from "./GestionFacu";
import AppUser from "./GestionesUsusario";
import ProfileScreen from "./Perfil";
import FacuDetails from "./Mostrarfacultad";
import CrearCarreras from "./CrearCarreras";
import GestionCarreras from "./GestionCarreras";
import ViewsApp from "./Estadisticas";
import axios from 'axios';
import RadiacionScreen from "./Radiacion";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const stack2 = createStackNavigator();
const stack3 = createStackNavigator();

function Perfiles() {
  return (
    <stack3.Navigator>
      <stack3.Screen name="perfil" component={ProfileScreen} options={{ headerShown: false }} />
      <stack2.Screen name="out" component={LoginScreen} options={{ headerShown: false }} />
    </stack3.Navigator>
  );
}

function Chatboxito() {
  return (
    <stack2.Navigator>
        
      <stack2.Screen name="MenuComple" component={MenuRespaldo} options={{ headerShown: false }} />
      <stack2.Screen name="Conten" component={Contenido} options={{ headerShown: false }} />
      <stack2.Screen name="ContenG" component={AppGestion} options={{ headerShown: false }} />
      <stack2.Screen name="Facul" component={App} options={{ headerShown: false }} />
      <stack2.Screen name="FaculG" component={FacultadCard} options={{ headerShown: false }} />
      <stack2.Screen name="User" component={AppUsuario} options={{ headerShown: false }} />
      <stack2.Screen name="UserG" component={AppUser} options={{ headerShown: false }} />
      <stack2.Screen name="Carreras" component={CrearCarreras} options={{ headerShown: false }} />
      <stack2.Screen name="CarrerasG" component={GestionCarreras} options={{ headerShown: false }} />
      <stack2.Screen name="Estadisticas" component={ViewsApp} options={{headerShown:false}}/>
      
    </stack2.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Noticias" component={ViewNoticias} options={{ headerShown: false }} />
      <Stack.Screen name="Revistas" component={ViewRevista} options={{ headerShown: false }} />
      <Stack.Screen name="Contenido" component={ContentCard} options={{ headerShown: false }} />
      <stack2.Screen name="ChatBoxito" component={ChatScreen} options={{ headerShown: false }} />
      <stack2.Screen name="facultades" component={FacuDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <>
      <NavigationBar />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#46741e",
          tabBarInactiveTintColor: "#d5d3e0",
          tabBarStyle: [{ display: "flex" }, null],
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              // Registro de estadísticas al presionar "Inicio"
              const data = {
                seccion: 'Inicio',
                nombre: 'Inicio',
              };
              
              axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', data)
                .then(response => {
                  console.log('Estadísticas registradas:', response.data);
                })
                .catch(error => {
                  console.error('Error al registrar estadísticas:', error);
                });
            },
          })}
        />
        <Tab.Screen
          name="Preferencias"
          component={Prefer}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="gear" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Chatboxito}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="bars" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfiles}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
       {/*
        {/*El color del circulo no se como le va a hacer cambiar, puede hacer un metodo q jale del webservice un rango y segun ese rango
          establecer el color 
        <Tab.Screen
          name="Radiación"
          component={RadiacionScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="circle" color={color} size={26} />
            ),
          }}
        />*/}
      </Tab.Navigator>
    </>
  );
}


export default function Navigation() {
  const userIsAuthenticated = true;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NavigationBar" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
