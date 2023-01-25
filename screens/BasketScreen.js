import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { removeItemBasket, selectBasketTotal, selectItemBasket } from '../features/basket'

import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const BasketScreen = () => {
  const items = useSelector(selectItemBasket);
  const subTotal = useSelector(selectBasketTotal);
  const IVA = subTotal * 0.05;
  const delivery = subTotal * 0.02;
  const total = subTotal + IVA + delivery;

  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [groupedItemsBasket, setGroupedItemsBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)
      return results
    }, {})

    setGroupedItemsBasket(groupedItems);
  }, [items])

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1'>
        <View className='p-5 bg-[#9B59B6]'>
          <Text className='text-center font-extrabold text-xl text-white'>Mi carrito</Text>
        </View>

        <ScrollView>
          {
            Object.entries(groupedItemsBasket).map(([key, items]) => {
              return (
                <View
                  style={{
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowOffset: {
                      width: 2,
                      height: 3,
                    },
                    shadowOpacity: 0.4
                  }}
                  className='flex-row items-center bg-white py-2 px-5 space-x-3 border border-gray-200 mb-7 mx-3 rounded-md'
                  key={key}>
                  <Image
                    className='w-20 h-20'
                    source={{
                      uri: urlFor(items[0]?.image).url()
                    }} />
                  <View className='flex-col flex-1'>
                    <Text className='font-bold'>{items[0]?.name}</Text>

                    <View className='flex-row items-center space-x-2'>
                      <TouchableOpacity onPress={() => dispatch(removeItemBasket({ _id: key }))}>
                        <MinusCircleIcon size={25} color='#9B59B6' />
                      </TouchableOpacity>

                      <Text className='font-bold text-lg'>{items.length}</Text>

                      <TouchableOpacity>
                        <PlusCircleIcon color='#9B59B6' size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text className='font-bold'>
                    <Currency quantity={items[0]?.price} />
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>

        <View className='px-4 space-y-2 py-2'>
          <View className='flex-row justify-between'>
            <Text className='font-bold text-gray-400'>SubTotal:</Text>
            <Text className='font-bold text-gray-400'>
              <Currency quantity={subTotal} />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='font-bold text-gray-400'>IVA:</Text>
            <Text className='font-bold text-gray-400'>
              <Currency quantity={IVA} />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='font-bold text-gray-400'>Envio:</Text>
            <Text className='font-bold text-gray-400'>
              <Currency quantity={delivery} />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='font-bold '>Total:</Text>
            <Text className='font-bold'>
              <Currency quantity={total} />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Payments')}
            className='bg-[#9B59B6] p-3 items-center rounded-md'>
            <Text className='text-white font-bold text-lg'>Realizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen