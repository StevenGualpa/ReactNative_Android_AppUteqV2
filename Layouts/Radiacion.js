import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const RadiacionScreen = () => {
  return(
    <View>
        <Text style={styles.title}>Radiación</Text>
    </View>
  )}
  const styles = StyleSheet.create({
    title: {
        fontSize: 25,
    }
  })
export default RadiacionScreen;

