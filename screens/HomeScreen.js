import React, { useEffect, useLayoutEffect, useState } from "react"

import { Image, SafeAreaView, Text, TextInput, View, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { grayColor, primaryColor } from "../styles/colors";
import { Categories, FeaturedRow } from "../components/Categories";

import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline'
const featuredCategoryItems = [
  {
    id: 1,
    title: 'Sugerencias',
    description: 'Te sugerimos',
    restaurantCategories: [
      {
        id: 1,
        imgUrl: '',
        title: 'Prueba 1',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      },
      {
        id: 2,
        imgUrl: '',
        title: 'Prueba 2',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      },
      {
        id: 3,
        imgUrl: '',
        title: 'prueba 3',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      }
    ]
  },
  {
    id: 2,
    title: 'Intereses',
    description: 'Tambien puede interesarte',
    restaurantCategories: [
      {
        id: 1,
        imgUrl: '',
        title: 'Prueba 4',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      },
      {
        id: 2,
        imgUrl: '',
        title: 'Prueba 5',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      },
      {
        id: 3,
        imgUrl: '',
        title: 'Prueba 6',
        rating: '',
        genre: '',
        address: '',
        short_description: '',
        dishes: '',
        long: '',
        lat: ''
      }
    ]
  }
]

function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      <View className='flex-row pb-3 items-center mx-2 space-x-2'>
        <Image source={{
          uri: 'https://links.papareact.com/wru',
        }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full' />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Pide ahora!</Text>
          <Text className='font-bold text-xl'>
            Cerca de ti
            <ChevronDownIcon size={20} color={primaryColor} />
          </Text>
        </View>

        <UserIcon size={35} color={primaryColor} />
      </View>

      <View className='flex-row items-center space-x-2 p-2 mx-2'>
        <View className='flex-row space-x-2 bg-gray-200 p-3 flex-1'>
          <MagnifyingGlassIcon color={grayColor} />
          <TextInput
            placeholder="Restaurant y comida rapida"
            keyboardType="default" />
        </View>

        <AdjustmentsVerticalIcon color={primaryColor} />
      </View>

      <ScrollView>
        <Categories />

        {
          featuredCategoryItems.map(({ id, title, description, restaurantCategories }) => {

            return (
              <FeaturedRow
                key={id}
                title={title}
                description={description}
                restaurantCategories={[...restaurantCategories]}
              />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen