import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MapPinIcon, StarIcon } from 'react-native-heroicons/solid';
import { grayColor, starColor } from '../styles/colors';

export const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className='relative mr-2'>
      <Image className='w-20 h-20 rounded' source={{
        uri: imgUrl
      }} />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
};

export const RestaurantCard = ({ restauranData }) => {
  return (
    <View className='flex-row pt-3'>
      {
        restauranData.map(({ title, id, imgUrl, rating, genre, address }) => {
          return (
            <TouchableOpacity className='mr-3 bg-white shadow-sm' key={id}>
              <Image className='w-64 h-36 rounded-sm ' source={{
                uri: imgUrl
              }} />
              <View className='px-3 pb-4'>
                <View className='pt-2'>
                  <Text className='font-bold text-lg'>{title}</Text>
                </View>
                <View className='flex-row items-center'>
                  <StarIcon color={starColor} opacity={0.5} />
                  <Text className='text-xs text-gray-500'>
                    <Text className=''>{rating}</Text>
                    - {genre}
                  </Text>
                </View>

                <View className='flex-row items-center space-x-1'>
                  <MapPinIcon color={grayColor} opacity={0.5} />
                  <Text className='text-xs text-gray-500'>{address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
};
