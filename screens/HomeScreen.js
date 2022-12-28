import React, { useEffect, useLayoutEffect, useState } from "react"

import { Image, SafeAreaView, Text, TextInput, View, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import sanityClient, { urlFor } from "../sanity";

import { grayColor, primaryColor } from "../styles/colors";
import { Categories, FeaturedRow } from "../components/Categories";

import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline'

function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == 'featured']{
        ...,
        restaurants[] ->{
          ...,
          dishes[]->
        },
      }
    `).then(res => setFeaturedCategories(res)).catch(error => console.log(error));

    sanityClient.fetch(`
      *[_type == 'category']{
        ...,
      }
    `).then(res => setCategories(res)).catch(error => console.log(error));
  }, [setFeaturedCategories, sanityClient])

  // console.log(categories);

  return (
    <SafeAreaView className='bg-white pt-5'>
      <View>
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
      </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          className='bg-gray-100'
        >

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingTop: 10
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              categories.map(categories => {
                return (
                  <Categories
                    key={categories._id}
                    id={categories._id}
                    imgUrl={urlFor(categories.image).width(200).url()}
                    title={categories.name}
                  />
                )
              })
            }
          </ScrollView>

          {
            featuredCategories?.map(category => (
              // console.log('this is a restaurant' + JSON.stringify(restaurants));
              <FeaturedRow
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
              />
            ))
          }
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen