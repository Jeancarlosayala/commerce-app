import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'

import * as Animatable from 'react-native-animatable'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../features/user'
import { selectBasketTotal } from '../features/basket'
import { executeTransfer } from '../utils/firebase'

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  const userInformation = useSelector(getCurrentUser)
  const subTotal = useSelector(selectBasketTotal);
  const IVA = subTotal * 0.05;
  const delivery = subTotal * 0.02;
  const total = subTotal + IVA + delivery;
  const userId = userInformation.uid;
  const newQuantityBalanceUser = +userInformation.balance - total;

  const uuid = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  useEffect(() => {
    if (userInformation) {
      userInformation.balance < total ? null : executeTransfer(userId, newQuantityBalanceUser, uuid(), total);

      userInformation.balance < total ? (
        setTimeout(() => {
          navigation.navigate('PaymentError')
        }, 5000)
      ) : setTimeout(() => {
        navigation.navigate('PaymentSuccess')
      }, 5000);
    }

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