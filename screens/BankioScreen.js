import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db, signWithEmail } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/user';
import { collection, onSnapshot } from 'firebase/firestore';

import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Bank from '../assets/bank.jpeg'

const BankIoScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email === '' && password === '') return Alert.alert('Porfavor llena los campos');

    signWithEmail(email, password)
      .then(res => setUserId(res.user.uid))
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Este usuario no existe')
            break;
          case 'auth/wrong-password':
            Alert.alert('Contraseña invalida')
            break;
          default:
            console.log(error);
            break;
        }
      });
  }

  useEffect(() => {
    if (userId != null) {
      const newDocs = []
      onSnapshot(collection(db, 'users'), (querySnapshot) => {
        const docs = []
        querySnapshot.docs.map((doc) => {
          return docs.push({ ...doc.data() });
        })
        newDocs.push(docs.filter(item => item.uid === userId)[0]);
        dispatch(setCurrentUser(({
          email: newDocs[0].email,
          balance: newDocs[0].balance,
          cardNumber: newDocs[0].cardNumber,
          uid: newDocs[0].uid
        })));
        navigation.navigate('Home');
      });
    }
  });

  return (
    <View className='w-full h-full bg-[#006DE9]'>
      <ImageBackground source={Bank} className='w-full h-[52%] absolute opacity-[0.3]' />

      <Animatable.View
        animation='slideInUp'
        iterationCount={1}
        className='mt-10 ml-4'>
        <Animatable.Text
          animation='slideInUp'
          iterationCount={1}
          className='text-3xl font-bold text-white'>Hola!</Animatable.Text>
        <Animatable.Text
          animation='slideInUp'
          iterationCount={1}
          className='text-3xl text-white font-bold mt-2'>Bienvenido a BankIo</Animatable.Text>

        <Animatable.Text
          animation='slideInUp'
          iterationCount={1}
          className='text-white text-sm font-medium'>
          ¡Difiere tus compras a meses sin intereses!
        </Animatable.Text>
      </Animatable.View>

      <Animatable.View
        animation='slideInUp'
        iterationCount={1}
        className='bg-white absolute w-full h-[75%] bottom-0 rounded-t-[25px] pt-20'>
        <Text className='font-normal text-xl text-center mb-5'>Inicia sesion</Text>

        <View className='space-y-3 mb-4'>
          <View className='px-4'>
            <Text className='font-medium text-lg mb-2'>Correo</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              name='email'
              className='p-4 rounded-md shadow-sm bg-white'
              placeholder='Correo'
              keyboardType='email-address'
            />
          </View>

          <View className='px-4 mb-2'>
            <Text className='font-medium text-lg mb-2'>Contraseña</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              name='password'
              className='p-4 rounded-md shadow-sm bg-white'
              placeholder='Contraseña'
              secureTextEntry
            />
          </View>

          <Text className='text-right px-4 text-[#006DE9]'>¿Olvidaste tu Contraseña?</Text>

          <View className='pt-5'>
            <TouchableOpacity onPress={handleLogin}
              className='bg-[#006DE9] p-3 mx-16 items-center rounded-md'>
              <Text className='text-white font-bold'>Iniciar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  )
}

export default BankIoScreen