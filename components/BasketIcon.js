import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, TouchableOpacity } from 'react-native'
import Currency from 'react-currency-formatter'

import { useSelector } from 'react-redux'
import { selectBasketTotal, selectItemBasket } from '../features/basket'

const BasketIcon = () => {
  const items = useSelector(selectItemBasket);
  const total = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity className='bg-[#AF7AC5] mx-5 p-4 rounded-lg flex-row items-center space-x-1'
      onPress={() => navigation.navigate('Basket')}>
        <Text className='text-white font-extrabold text-lg bg-[#9B59B6] py-1 px-2'>{items.length}</Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>Tu carrito</Text>
        <Text className='text-white font-extrabold text-lg'>
          <Currency quantity={total} />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon;