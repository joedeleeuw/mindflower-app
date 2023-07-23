import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./components/Loader";
import {
  MeditationDetailScreen,
  MeditationsScreen,
} from "./screens/Meditation";
import { CourseDetailScreen, CoursesScreen } from "./screens/Courses";
import GrowthScreen from "./screens/Growth";
import HomeScreen from "./screens/Home";

// Define the home stack navigator
const CoursesStack = createStackNavigator();
function CoursesStackScreen() {
  return (
    <CoursesStack.Navigator>
      <CoursesStack.Screen name="Courses" component={CoursesScreen} />
      <CoursesStack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </CoursesStack.Navigator>
  );
}

// Define the meditations stack navigator
const MeditationsStack = createStackNavigator();
function MeditationsStackScreen() {
  return (
    <MeditationsStack.Navigator>
      <MeditationsStack.Screen
        name="Meditations"
        component={MeditationsScreen}
      />
      <MeditationsStack.Screen
        name="MeditationDetail"
        component={MeditationDetailScreen}
      />
    </MeditationsStack.Navigator>
  );
}

const HomePageStack = createStackNavigator();
function HomepageStackScreen() {
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen name="Home" component={HomeScreen} />
    </HomePageStack.Navigator>
  );
}

// Define the bottom tab navigator
const Tab = createMaterialBottomTabNavigator();

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/xp4gm4n3vlji",
  cache,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer dhO-C8Y9QLUAwNua0EPL9wZOZGdy1K3VjNxlvZY5IhI`,
  },
});

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <Loader />;
  }

  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="white"
            barStyle={{ backgroundColor: "#3d5b43" }}
          >
            <Tab.Screen
              name="Home"
              component={HomepageStackScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="flower"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Courses"
              component={CoursesStackScreen}
              options={{
                tabBarLabel: "Courses",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="book-open"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Meditations"
              component={MeditationsStackScreen}
              options={{
                tabBarLabel: "Meditations",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="meditation"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Growth"
              component={GrowthScreen}
              options={{
                tabBarLabel: "Growth",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}
