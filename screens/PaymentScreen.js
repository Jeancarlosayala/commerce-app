import React from 'react'

import CurrencyFormat from 'react-currency-format'
import { View, Text, SafeAreaView, TextInput } from 'react-native'

const PaymentScreen = () => {

  return (
    <View>
      <SafeAreaView className='m-auto'>
        <View className='rounded-md border bg-black w-80 h-40'>
          <View className='m-auto'>
            <Text className='text-white font-bold'>Hola</Text>
            <TextInput placeholder='Hola'>
              <CurrencyFormat value={4111} format='#### #### #### ####'  />
            </TextInput>
        </View>
    </View>
      </SafeAreaView >
    </View >
  )
}

export default PaymentScreen