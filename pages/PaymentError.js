import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const PaymentError = () => {
  const progress = useRef(new Animated.Value(0.5)).current
  const scale = useRef(new Animated.Value(1)).current
  const opacityAlert = useRef(new Animated.Value(0)).current

  const navigation = useNavigation()

  useEffect(() => {
    Animated.spring(progress, { toValue: 1, useNativeDriver: true, }).start()
    Animated.timing(scale, { toValue: 10, useNativeDriver: true, duration: 600 }).start()
    Animated.timing(opacityAlert, { toValue: 1, useNativeDriver: true, duration: 1000 }).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.square,
        {
          borderRadius: progress.interpolate({
            inputRange: [0.5, 1],
            outputRange: [SIZE / 4, SIZE / 2],
          }),
          opacity: progress,
          transform: [
            { scale },
          ],
        }
      ]}>
      </Animated.View>
      <Animated.View style={[
        styles.alertSuccess,
        {
          opacity: opacityAlert,
        }
      ]}
        className='bg-[#EA2000] rounded-full p-5 items-center justify-center absolute'>
        <XMarkIcon size={100} color={'#fff'} />
      </Animated.View>
      <Animated.View style={[
        styles.alertSuccess,
        {
          opacity: opacityAlert,
        }
      ]}
        className='rounded-full p-5 items-center justify-center absolute bottom-[20%]'>
        <Text className='text-white font-bold text-3xl text-center'>No se pudo realizar la compra</Text>
        
        <View className='mt-4'>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} className='border border-white p-2 rounded-xl'>
            <Text className='text-white font-bold text-xl text-center'>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View >
  )
}

const SIZE = 100.0

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    width: 100.0,
    height: 100.0,
    backgroundColor: '#D91E00'
  },
  alertSuccess: {
    opacity: 0
  }
})

export default PaymentError