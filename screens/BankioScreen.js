import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db, signWithEmail } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/user';
import { collection, onSnapshot } from 'firebase/firestore';

const PaymentScreen = () => {
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
    <View className='w-full h-full'>
      <View className='m-auto'>
        <View className='space-y-3 mb-4 transition-all'>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            name='email'
            className='border border-gray-400 p-4 mx-3 rounded-sm'
            placeholder='Correo'
            keyboardType='email-address'
          />

          <TextInput
            onChangeText={(text) => setPassword(text)}
            name='password'
            className='border border-gray-400 p-4 mx-3 rounded-sm'
            placeholder='Contraseña'
            secureTextEntry
          />
          <TouchableOpacity onPress={handleLogin} className='bg-[#006DE9] p-3 mx-16 items-center rounded-md'>
            <Text className='text-white font-bold'>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PaymentScreen