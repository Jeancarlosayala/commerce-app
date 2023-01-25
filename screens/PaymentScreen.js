import React, { useEffect, useState } from 'react'

import { View, SafeAreaView, Image, TextInput, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { agregarCaracter } from '../utils/creditCard'

import valid from 'card-validator'

import Chip from '../assets/chip.png'
import MasterCard from '../assets/mastercard.png'
import Food from '../assets/comida.png'
import FoodCard from '../assets/comida_2.jpg'
import { useNavigation } from '@react-navigation/core'

const PaymentScreen = () => {
  const navigation = useNavigation()

  const [numberCard, setNumberCard] = useState('');
  const [holderName, setHolderName] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [isValidCard, setIsValidCard] = useState(false)

  useEffect(() => {
    setIsValidCard(valid.number(numberCard).isValid);
  }, [numberCard])

  const prepareOrder = () => {
    if (numberCard === '' && cvv === '' && expDate === '' && holderName === '') return Alert.alert('Porfavor recuerda llenar todos los campos')
    if (isValidCard === false) return Alert.alert('El numero de tarjeta es incorrecto')
    navigation.navigate('PreparingOrder');
  }

  return (
    <View className='h-full w-full bg-[#fff]'>
      <ImageBackground className='w-full h-full absolute top-0 opacity-[.2]' source={Food} />

      <SafeAreaView className='m-auto'>
        <KeyboardAwareScrollView>
          <View className='rounded-md border bg-black w-80 h-40 '>
            <ImageBackground className='w-full h-full absolute top-0 opacity-[.25]' source={FoodCard} />

            <View className='px-4 py-1'>
              <View className='w-full h-full'>
                <View className='mt-2 flex-row justify-between items-center'>
                  <Image className='w-10 h-10' source={Chip} />
                  <Image className='w-20 h-12' source={MasterCard} />
                </View>

                <View className='mt-2 items-center justify-center'>
                  <Text className='text-gray-50 text-xl tracking-[2em] font-bold'>{agregarCaracter(numberCard, '-', 4)}</Text>
                </View>

                <View className='px-2 mt-1'>
                  <Text className='text-gray-50 text-sm capitalize'>{holderName}</Text>
                </View>

                <View className='px-2 mt-1 flex-row justify-between'>
                  <Text className='text-gray-50 text-sm capitalize'>Expira: {agregarCaracter(expDate, '/', 2)}</Text>
                  <Text className='text-gray-50 text-sm capitalize'>CVV: {cvv}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className='mt-10'>
            <View className='mb-4'>
              <Text className='text-black font-bold text-lg mb-1'>Numero de tarjeta</Text>
              <TextInput
                onChangeText={(text) => setNumberCard(text)}
                placeholder='4111 1111 1111 1111'
                className={`px-2 py-4 bg-white rounded-lg border
                ${isValidCard === false && numberCard.length === 16 ? 'border-red-600' : ''}
                ${isValidCard && numberCard.length === 16 ? 'border-green-600' : ''}`}
                maxLength={16}
                keyboardType='number-pad'
              />
            </View>

            <View className='mb-4'>
              <Text className='text-black font-bold text-lg mb-1'>Titular de la tarjeta</Text>
              <TextInput
                onChangeText={(text) => setHolderName(text)}
                placeholder='Nombre de propietario'
                className='px-2 py-4 bg-white rounded-lg border border-black'
              />
            </View>

            <View className='flex-row gap-2'>
              <View className='flex-1'>
                <Text className='text-black font-bold text-lg mb-1'>Fecha</Text>
                <TextInput
                  onChangeText={(text) => setExpDate(text)}
                  placeholder='Fecha de expiracion'
                  className='px-2 py-4 bg-white rounded-lg border border-black'
                  maxLength={4}
                  keyboardType='number-pad'
                />
              </View>

              <View className='flex-1'>
                <Text className='text-black font-bold text-lg mb-1'>CVV</Text>
                <TextInput
                  onChangeText={(text) => setCvv(text)}
                  placeholder='CVV'
                  className='px-2 py-4 bg-white rounded-lg border border-black'
                  maxLength={3}
                  keyboardType='number-pad'
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View className='mt-5 space-y-4'>
            <TouchableOpacity onPress={() => navigation.navigate('BankIo')}
              className='bg-[#006DE9] p-3 rounded-2xl'>
              <Text className='text-white font-bold text-lg text-center'>Pagar con Bankio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={prepareOrder}
              className='bg-[#9B59B6] p-3 rounded-2xl'>
              <Text className='text-white font-bold text-lg text-center'>Proceder al pago</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView >
    </View >
  )
}

export default PaymentScreen