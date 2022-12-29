import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CategoryCard, RestaurantCard } from './CategoryCard';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { primaryColor } from '../styles/colors';
import sanityClient from "../sanity";

export const Categories = ({ imgUrl, title }) => {

  return (
    <TouchableOpacity className='relative mr-2'>
      <Image className='w-20 h-20 rounded' source={{
        uri: imgUrl
      }} />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}

export const FeaturedRow = ({ id, title, description, restaurantCategories }) => {

  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == 'featured' && _id == $id]{
        ...,
        restaurants[] ->{
          ...,
          dishes[]->,
          type->{
            name
          }
        },
      }[0]
    `, { id }
    ).then(res => setRestaurant(res?.restaurants)).catch(error => console.log(error))
  }, [setRestaurant, sanityClient])

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
        {
          restaurant?.map(restaurant => {
            return (
              <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                imgUrl={restaurant.image}
                address={restaurant.address}
                title={restaurant.name}
                dishes={restaurant.dishes}
                rating={restaurant.rating}
                short_description={restaurant.short_description}
                genre={restaurant.type.name}
                long={restaurant.long}
                lat={restaurant.lat}
              />
            )
          })
        }

        {/* <RestaurantCard title={title} restauranData={[...restaurantCategories]} /> */}
      </ScrollView>
    </View>
  )
}
