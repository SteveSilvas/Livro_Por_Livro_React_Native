import HomeScreen from '../Screen/App/Home';
import ProfileScreen from '../Screen/App/Profile';
import SearchScreen from '../Screen/App/Search';
import SettingsScreen from '../Screen/App/Settings'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'search' : 'search-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'settings' : 'settings-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}