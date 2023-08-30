import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CardView = ({ title, count, icon, extraTitle }) => (
  <View style={styles.card}>
    <Ionicons name={icon} size={60} color="#46741e" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardCount}>{count}</Text>
    {extraTitle && <Text style={styles.extraTitle}>{extraTitle}</Text>}
  </View>
);
const FacultadesCardView = ({ nombre, count }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{nombre}</Text>
    <Text style={styles.cardCount}>{count}</Text>
  </View>
);
const SectionHeader = ({ title, icon, showContent, onPress }) => (
  <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#46741e" />
    <Text style={styles.sectionHeaderText}>{title}</Text>
    <Ionicons
      name={`ios-arrow-${showContent ? 'down' : 'forward'}`}
      size={24}
      color="#46741e"
    />
  </TouchableOpacity>
);

const App = () => {
    const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
    const [visualizacionesInicio, setVisualizacionesInicio] = useState(0);
    const [visualizacionesNoticias, setVisualizacionesNoticias] = useState(0);
    const [visualizacionesRevistas, setVisualizacionesRevistas] = useState(0);
    const [visualizacionesContenido, setVisualizacionesContenido] = useState(0);
    const [noticiaMasVista, setNoticiaMasVista] = useState({ nombre: '', count: 0 });
    const [showGeneral, setShowGeneral] = useState(false);
    const [showNoticias, setShowNoticias] = useState(false);
    const [showRevistas, setShowRevistas] = useState(false);
    const [showContenido, setShowContenido] = useState(false);
    const [noticiaMenosVista, setNoticiaMenosVista] = useState({ nombre: '', count: 0 });
    const [revistaMasVista, setRevistaMasVista] = useState({ nombre: '', count: 0 });
    const [revistaMenosVista, setRevistaMenosVista] = useState({ nombre: '', count: 0 });
    const [contenidoMasVisualizado, setContenidoMasVisualizado] = useState({nombre: '',count: 0,});
    const [contenidoMenosVisualizado, setContenidoMenosVisualizado] = useState({nombre: '', count: 0,});
    const [facultades, setFacultades] = useState([]);
    const [showFacultades, setshowfacultades]=useState(false);
  
    const fetchFacultadesData = async () => {
      try {
        const facultadesResponse = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/GetAllSeccionNombreCount/facultades');
        const facultadesData = facultadesResponse.data.results;
    
        // Ordenar las facultades de mayor a menor
        facultadesData.sort((a, b) => b.count - a.count);
    
        setFacultades(facultadesData);
      } catch (error) {
        console.error('Error fetching facultades data:', error);
      }
    };
    
    const fetchData = async () => {
      try {
        // Fetch Usuarios
        const usuariosResponse = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/usuarios/getAllUsers');
        const usuariosData = await usuariosResponse.json();
        if (usuariosData && usuariosData.usuarios && Array.isArray(usuariosData.usuarios)) {
          setUsuariosRegistrados(usuariosData.usuarios.length);
        }
  
        // Fetch Visualizaciones de Inicio
        const inicioResponse = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/GetAllSeccion/Inicio');
        const inicioData = await inicioResponse.json();
        if (inicioData && inicioData.length !== undefined) {
          setVisualizacionesInicio(inicioData.length);
        }
  
        // Fetch Visualizaciones de Noticias, Revistas y Contenido
        const noticiasResponse = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/GetAllSeccion/Noticias');
        setVisualizacionesNoticias(noticiasResponse.data.length);
  
        const revistasResponse = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/GetAllSeccion/Revistas');
        setVisualizacionesRevistas(revistasResponse.data.length);
  
        const contenidoResponse = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/GetAllSeccion/Contenido');
        setVisualizacionesContenido(contenidoResponse.data.length);
  
        

        // Conteo de noticias más vistas
        const noticiasData = noticiasResponse.data.analitics;
        const noticiasCountByNombre = noticiasData.reduce((acc, item) => {
            const nombre = item.nombre;
            acc[nombre] = (acc[nombre] || 0) + 1;
            return acc;
        }, {});
        
        let maxNoticias = { nombre: '', count: 0 };
        let minNoticias = { nombre: '', count: Number.MAX_VALUE };  // Usando MAX_VALUE como valor inicial para el conteo mínimo.
        
        for (const nombre in noticiasCountByNombre) {
            if (nombre !== 'Noticias') {
                if (noticiasCountByNombre[nombre] > maxNoticias.count) {
                    maxNoticias = { nombre, count: noticiasCountByNombre[nombre] };
                }
                if (noticiasCountByNombre[nombre] < minNoticias.count) {
                    minNoticias = { nombre, count: noticiasCountByNombre[nombre] };
                }
            }
        }
        
        // Asumo que tienes funciones de estado como setNoticiaMasVista y setNoticiaMenosVista
        
        if (maxNoticias.nombre && maxNoticias.nombre !== 'Noticias') {
            setNoticiaMasVista(maxNoticias);
        } else {
            setNoticiaMasVista({ nombre: 'Noticia más vista no disponible', count: 0 });
        }
        
        if (minNoticias.nombre && minNoticias.nombre !== 'Noticias') {
            setNoticiaMenosVista(minNoticias);
        } else {
            setNoticiaMenosVista({ nombre: 'Noticia menos vista no disponible', count: 0 });
        }

        // Conteo de revistas más y menos vistas
            const revistasData = revistasResponse.data.analitics;
            const revistasCountByNombre = revistasData.reduce((acc, item) => {
            const nombre = item.nombre;
            acc[nombre] = (acc[nombre] || 0) + 1;
            return acc;
            }, {});

            let maxRevistas = { nombre: '', count: 0 };
            let minRevistas = { nombre: '', count: Number.MAX_VALUE };

            for (const nombre in revistasCountByNombre) {
            if (nombre !== 'Revistas') {
                if (revistasCountByNombre[nombre] > maxRevistas.count) {
                maxRevistas = { nombre, count: revistasCountByNombre[nombre] };
                }
                if (revistasCountByNombre[nombre] < minRevistas.count) {
                minRevistas = { nombre, count: revistasCountByNombre[nombre] };
                }
            }
            }

            // Validar que el nombre de la revista más vista no sea igual al nombre de la sección
            if (maxRevistas.nombre !== '') {
            setRevistaMasVista(maxRevistas);
            } else {
            setRevistaMasVista({ nombre: 'Revista más vista no disponible', count: 0 });
            }

            // Validar que el nombre de la revista menos vista no sea igual al nombre de la sección
            if (minRevistas.nombre !== '') {
            setRevistaMenosVista(minRevistas);
            } else {
            setRevistaMenosVista({ nombre: 'Revista menos vista no disponible', count: 0 });
            }
  
            // Conteo de contenido más y menos visualizado
            const contenidoData = contenidoResponse.data.analitics;
            const contenidoCountByNombre = contenidoData.reduce((acc, item) => {
            const nombre = item.nombre;
            acc[nombre] = (acc[nombre] || 0) + 1;
            return acc;
            }, {});

            let maxContenido = { nombre: '', count: 0 };
            let minContenido = { nombre: '', count: Number.MAX_VALUE };

            for (const nombre in contenidoCountByNombre) {
            if (nombre !== 'Contenido') {
                if (contenidoCountByNombre[nombre] > maxContenido.count) {
                maxContenido = { nombre, count: contenidoCountByNombre[nombre] };
                }
                if (contenidoCountByNombre[nombre] < minContenido.count) {
                minContenido = { nombre, count: contenidoCountByNombre[nombre] };
                }
            }
            }

            // Validar que el nombre del contenido más visualizado no sea igual al nombre de la sección
            if (maxContenido.nombre !== '') {
            setContenidoMasVisualizado(maxContenido);
            } else {
            setContenidoMasVisualizado({ nombre: 'Contenido más visualizado no disponible', count: 0 });
            }

            // Validar que el nombre del contenido menos visualizado no sea igual al nombre de la sección
            if (minContenido.nombre !== '') {
            setContenidoMenosVisualizado(minContenido);
            } else {
            setContenidoMenosVisualizado({ nombre: 'Contenido menos visualizado no disponible', count: 0 });
            }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    useEffect(() => {
      fetchData();
      fetchFacultadesData();
      const intervalId = setInterval(() => {
        fetchData();
        fetchFacultadesData();
      }, 6000);
  
      return () => clearInterval(intervalId);
    }, []);    
  
  const toggleSection = section => {
    switch (section) {
      case 'general':
        setShowGeneral(!showGeneral);
        break;
      case 'noticias':
        setShowNoticias(!showNoticias);
        break;
      case 'revistas':
        setShowRevistas(!showRevistas);
        break;
      case 'contenido':
        setShowContenido(!showContenido);
        break;
        case 'facultades':
          setshowfacultades(!showFacultades);
          break;
      default:
        break;
    }
  };

  const data = [
    { id: 'usuarios', title: 'Usuarios Registrados', count: usuariosRegistrados, icon: 'ios-people' },
    { id: 'inicio', title: 'Visualización de Inicio', count: visualizacionesInicio, icon: 'ios-home' },
    { id: 'noticias', title: 'Visualización de Noticias', count: visualizacionesNoticias, icon: 'ios-newspaper' },
    { id: 'revistas', title: 'Visualización de Revistas', count: visualizacionesRevistas, icon: 'ios-albums' },
    { id: 'contenido', title: 'Visualización de Contenido', count: visualizacionesContenido, icon: 'ios-book' },
  ];

  const noticiasData = data.find(item => item.id === 'noticias');
  const revistasData = data.find(item => item.id === 'revistas');
  const contenidoData = data.find(item => item.id === 'contenido');
  const facultadesData = data.find(item => item.id === 'facultades');

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Estadísticas</Text>
      <FlatList
        data={[
          { id: 'general', title: 'General', icon: 'ios-list', showContent: showGeneral },
          { id: 'noticias', title: 'Noticias', icon: 'ios-newspaper', showContent: showNoticias },
          { id: 'revistas', title: 'Revistas', icon: 'ios-albums', showContent: showRevistas },
          { id: 'contenido', title: 'Contenido', icon: 'ios-book', showContent: showContenido },
          { id: 'facultades', title: 'Facultades', icon: 'ios-book', showContent: showFacultades },
        ]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <SectionHeader
              title={item.title}
              icon={item.icon}
              showContent={item.showContent}
              onPress={() => toggleSection(item.id)}
            />
            {item.showContent && item.id === 'general' && (
              <FlatList
                data={data.filter(item => item.id !== 'noticias' && item.id !== 'revistas' && item.id !== 'contenido')}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => <CardView title={item.title} count={item.count} icon={item.icon} />}
              />
            )}
            {item.showContent && item.id === 'noticias' && (
              <View>
                <CardView
                  title={noticiasData.title}
                  count={noticiasData.count}
                  icon={noticiasData.icon}
                />
                <CardView
                  title="Noticia más vista"
                  count={noticiaMasVista.count}
                  icon="ios-eye"
                  extraTitle={noticiaMasVista.nombre}
                />
                <CardView
                  title="Noticia menos vista"
                  count={noticiaMenosVista.count}
                  icon="ios-eye-off"
                  extraTitle={noticiaMenosVista.nombre}
                />
              </View>
            )}
            {item.showContent && item.id === 'revistas' && (
              <View>
                <CardView
                  title={revistasData.title}
                  count={revistasData.count}
                  icon={revistasData.icon}
                />
                <CardView
                  title="Revista más vista"
                  count={revistaMasVista.count}
                  icon="ios-eye"
                  extraTitle={revistaMasVista.nombre}
                />
                <CardView
                  title="Revista menos vista"
                  count={revistaMenosVista.count}
                  icon="ios-eye-off"
                  extraTitle={revistaMenosVista.nombre}
                />
              </View>
            )}
            {item.showContent && item.id === 'contenido' && (
              <View>
                <CardView
                  title={contenidoData.title}
                  count={contenidoData.count}
                  icon={contenidoData.icon}
                />
                <CardView
                  title="Contenido más visualizado"
                  count={contenidoMasVisualizado.count}
                  icon="ios-eye"
                  extraTitle={contenidoMasVisualizado.nombre}
                />
                <CardView
                  title="Contenido menos visualizado"
                  count={contenidoMenosVisualizado.count}
                  icon="ios-eye-off"
                  extraTitle={contenidoMenosVisualizado.nombre}
                />
              </View>
            )}
            {item.showContent && item.id === 'facultades' && (
              <View>
                <FlatList
                  data={facultades}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <FacultadesCardView nombre={item.nombre} count={item.count} />}
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardCount: {
    marginTop: 5,
    fontSize: 16,
  },
  extraTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#46741e',
  },
});

export default App;
