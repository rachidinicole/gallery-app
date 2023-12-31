import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CameraComponent from "./components/CameraComponent";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Gallery" component={ImageGallery} />
        <Tab.Screen name="Camera" component={CameraComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
