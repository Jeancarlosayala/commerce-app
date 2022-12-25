import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { CategoryCard, RestaurantCard } from './CategoryCard';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { primaryColor } from '../styles/colors';

export const Categories = () => {

  const categoryCardItems = [
    {
      id: 1,
      title: 'Test',
      imgUrl: 'https://links.papareact.com/gn7'
    },
    {
      id: 2,
      title: 'Test',
      imgUrl: 'https://links.papareact.com/gn7'
    },
    {
      id: 3,
      title: 'Test',
      imgUrl: 'https://links.papareact.com/gn7'
    },
    {
      id: 4,
      title: 'Test',
      imgUrl: 'https://links.papareact.com/gn7'
    }
  ]

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}>

      {
        categoryCardItems.map(({ id, title, imgUrl }) => {
          return (
            <CategoryCard key={id} imgUrl={imgUrl} title={title} />
          )
        })
      }
    </ScrollView>
  )
}

export const FeaturedRow = ({ title, description, restaurantCategories }) => {

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color={primaryColor} />
      </View>

      <Text className='px-4 text-xs text-gray-500'>{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        <RestaurantCard title={title} restauranData={[...restaurantCategories]} />
      </ScrollView>
    </View>
  )
}
