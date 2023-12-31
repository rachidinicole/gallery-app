import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CameraComponent from "./components/CameraComponent";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

// Import the necessary icons library
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Gallery"
          component={ImageGallery}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="photo" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="camera" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
