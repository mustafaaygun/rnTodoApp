import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseManager } from '../database';
const DB = new BaseManager();

const Splash = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      DB.createUser();
      DB.createTodo();
      AsyncStorage.getItem('user').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'Pages'
        ),
      );
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7b4fff' }}>
      <ActivityIndicator
        animating={animating}
        color="white"
        size="large"
        style={{ alignItems: 'center', height: 80 }}
      />
    </View>
  );
};

export default Splash;

