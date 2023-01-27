import { View, Text, Image } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { useNavigation } from '@react-navigation/native'

const slides = [
  {
    id: 1,
    image: require('../assets/restaurant.jpeg'),
    text: 'white',
  },
  {
    id: 2,
    title: '¿No se te antoja un sushi?',
    description: 'Prueba el mejor sushi en Sushi Kirby y obten grandes descuentos',
    image: require('../assets/sushi.jpeg'),
    text: 'black'
  },
  {
    id: 3,
    title: 'Vive el momento en familia',
    description: 'Aprovecha los descuentos en KFC y pasa un momento compartido',
    image: require('../assets/kfc.png'),
    text: 'white'
  },
]

const Slides = () => {
  const navigation = useNavigation()

  return (
    <AppIntroSlider
      data={slides}
      activeDotStyle={{
        backgroundColor: '#fff',
        width: 30,
      }}
      showPrevButton
      nextLabel='Siguiente'
      prevLabel='Atras'
      doneLabel='Terminar'
      onDone={() => navigation.navigate('Home')}
      renderItem={({item}) => {
        return (
          <View className='bg-white w-full h-full'>
            <Image source={item.image} className='w-full h-full m-auto' />
            <View className='absolute top-20 m-auto items-center justify-center w-full px-2'>
                <Text className={`text-${item.text} m-auto font-extrabold text-2xl text-center`}>{item.title}</Text>
                <Text className={`text-${item.text} m-auto text-center text-md font-bold`}>{item.description}</Text>
            </View>
          </View>
        )
      }}
    />
  )
}

export default Slides