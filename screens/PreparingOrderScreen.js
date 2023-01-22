import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'

import * as Animatable from 'react-native-animatable'

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 5000);
  }, [])

  return (
    <SafeAreaView className='bg-[#9B59B6] flex-1 justify-center items-center'>
      <Animatable.Image
        source={require('../assets/order_prepare.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-xl my-10 text-white font-extrabold text-center'
      >
        Estamos preparando tu pedido
      </Animatable.Text>

      <Animatable.Image
        source={require('../assets/loader.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-44 w-44 absolute bottom-4'
      />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen