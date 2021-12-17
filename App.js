import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DetailNewsScreen from "./screens/DetailNewsScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="DetailNewsScreen"
          component={DetailNewsScreen}
          options={{ title: "News" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
