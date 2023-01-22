import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { MapPinIcon, StarIcon } from 'react-native-heroicons/solid';
import { grayColor, starColor } from '../styles/colors';
import { urlFor } from '../sanity';


export const RestaurantCard = ({
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
}) => {

  const navigation = useNavigation();

  return (
    <View className='flex-row pt-3'>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Restaurant', {
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
          })
        }}
        className='mr-3 bg-white shadow-sm'>
        <Image className='w-64 h-36 rounded-sm ' source={{
          uri: urlFor(imgUrl).width(200).url(),
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
    </View>
  )
};
