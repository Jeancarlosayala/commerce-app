import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className='relative mr-2'>
      <Image className='w-20 h-20 rounded' source={{
        uri: imgUrl
      }} />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
};

export const RestaurantCard = ({title, restauranData}) => {
  return(
    <View>
      <Text>{title}</Text>

      {
        restauranData.map(({title}) =>{
          return(
            <View>
              <Text>{title}</Text>
            </View>
          )
        })
      }
    </View>
  )
};
