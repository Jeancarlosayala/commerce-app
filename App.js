import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './store';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import BankIoScreen from './screens/BankioScreen';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentError from './pages/PaymentError';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurant' component={RestaurantScreen} />
          <Stack.Screen name='Basket' component={BasketScreen}
            options={{
              presentation: 'modal',
              headerShown: false
            }} />
          <Stack.Screen name='Payments' component={PaymentScreen} options={{
            presentation: 'fullScreenModal',
            headerShown: false
          }} />
          <Stack.Screen name='BankIo' component={BankIoScreen}
            options={{
              presentation: 'modal',
              headerShown: false
            }} />
          <Stack.Screen name='PreparingOrder' component={PreparingOrderScreen} options={{
            presentation: 'fullScreenModal',
            headerShown: false
          }} />
          <Stack.Screen name='PaymentSuccess' component={PaymentSuccess} options={{
            presentation: 'fullScreenModal',
            headerShown: false
          }} />
          <Stack.Screen name='PaymentError' component={PaymentError} options={{
            presentation: 'fullScreenModal',
            headerShown: false
          }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}