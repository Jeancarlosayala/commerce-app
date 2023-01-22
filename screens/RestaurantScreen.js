import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Currency from 'react-currency-formatter';

import { useDispatch, useSelector } from 'react-redux';
import { addItemBasket, removeItemBasket, selectItemBasket, selectItemBasketId } from '../features/basket';
import { setRestaurant } from '../features/restaurant';

import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, MinusCircleIcon, PlusCircleIcon, StarIcon } from 'react-native-heroicons/solid';

import { grayColor, primaryColor, starColor } from '../styles/colors'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import BasketIcon from '../components/BasketIcon';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { params: {
    imgUrl,
    address,
    rating,
    genre,
    title,
    short_description,
    dishes,
    id,
    long,
    lat
  } } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
      imgUrl,
      address,
      rating,
      genre,
      title,
      short_description,
      dishes,
      id,
      long,
      lat
    }))
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  const quantity = useSelector(selectItemBasket);

  return (
    <>
      {quantity.length > 0 && <BasketIcon />}

      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url()
            }}
            className='w-full h-56 bg-gray-500 p-4'
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
            className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
            <ArrowLeftIcon size={20} color={primaryColor} />
          </TouchableOpacity>
        </View>

        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon color={starColor} opacity={0.5} />
                <Text>
                  <Text className='text-xs text-gray-500'>
                    <Text className=''>{rating}</Text>
                    - {genre}
                  </Text>
                </Text>
              </View>

              <View className='flex-row items-center space-x-1'>
                <MapPinIcon color={grayColor} opacity={0.5} />
                <Text className='text-xs text-gray-500'>{address}</Text>
              </View>
            </View>

            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>

          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
            <QuestionMarkCircleIcon size={20} opacity={0.6} />
            <Text className='pl-2 flex-1 text-md font-bold'>¿Tienes alergia a algun ingrediente?</Text>
            <ChevronRightIcon color={primaryColor} />
          </TouchableOpacity>
        </View>

        <View className={quantity.length > 0 && 'pb-36'}>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

          {
            dishes === null ? <Text className='font-bold px-4'>No hay productos disponibles</Text> : (
              dishes.map(({ name, short_description, image, _id, price }) => {

                const [isPressed, setIsPressed] = useState(false);
                const dispatch = useDispatch()
                const itemsQuantity = useSelector((state) => selectItemBasketId(state, _id))

                const addItemToBasket = () => {
                  dispatch(addItemBasket({ name, short_description, image, _id, price }))
                }

                const removeItemToBasket = () => {
                  if (!itemsQuantity.length > 0) return;

                  dispatch(removeItemBasket({ _id }))
                }

                return (
                  <View key={_id}>
                    <TouchableOpacity
                      onPress={() => setIsPressed(!isPressed)}
                      className={`bg-white border p-4 border-gray-200 
                    ${isPressed && 'border-b-0'}`}>
                      <View className='flex-row'>
                        <View className='flex-1 pr-2'>
                          <Text className='text-lg mb-1'>{name}</Text>
                          <Text className='text-gray-400'>{short_description}</Text>
                          <Text className='text-gray-400 mt-2'>
                            <Currency quantity={price} />
                          </Text>
                        </View>

                        <View>
                          <Image
                            className='w-20 h-20'
                            style={{
                              borderWidth: 1,
                              borderColor: '#F3F3F4'
                            }}
                            source={{
                              uri: urlFor(image).url()
                            }} />
                        </View>
                      </View>
                    </TouchableOpacity>

                    {
                      isPressed && (
                        <View className='bg-white px-4'>
                          <View className='flex-row items-center space-x-2 pb-3'>
                            <TouchableOpacity
                              onPress={removeItemToBasket}
                              className={`${!itemsQuantity.length && 'opacity-25'}`}
                              disabled={itemsQuantity.length > 0 ? false : true}>
                              <MinusCircleIcon color={primaryColor} size={40} />
                            </TouchableOpacity>

                            <Text>{itemsQuantity.length}</Text>

                            <TouchableOpacity onPress={addItemToBasket}>
                              <PlusCircleIcon color={primaryColor} size={40} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }
                  </View>
                )
              })
            )
          }
        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen