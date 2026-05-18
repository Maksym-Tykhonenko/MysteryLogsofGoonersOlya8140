import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomTabBar} from '../components/CustomTabBar';
import {ExtraWordScreen} from '../screens/ExtraWordScreen';
import {FactsScreen} from '../screens/FactsScreen';
import {GuessWordScreen} from '../screens/GuessWordScreen';
import {MissingLetterScreen} from '../screens/MissingLetterScreen';
import {RiddlesScreen} from '../screens/RiddlesScreen';
import {StoriesScreen} from '../screens/StoriesScreen';
import {StoryDetailScreen} from '../screens/StoryDetailScreen';
import {MainTabParamList, StoriesStackParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const StoriesStack = createNativeStackNavigator<StoriesStackParamList>();

function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{headerShown: false}}>
      <StoriesStack.Screen name="StoriesList" component={StoriesScreen} />
      <StoriesStack.Screen name="StoryDetail" component={StoryDetailScreen} />
    </StoriesStack.Navigator>
  );
}

function renderTabBar(props: BottomTabBarProps) {
  return <CustomTabBar {...props} />;
}

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="StoriesTab"
        component={StoriesStackScreen}
        options={{tabBarAccessibilityLabel: 'Stories'}}
      />
      <Tab.Screen
        name="GuessWord"
        component={GuessWordScreen}
        options={{tabBarAccessibilityLabel: 'Guess word'}}
      />
      <Tab.Screen
        name="MissingLetter"
        component={MissingLetterScreen}
        options={{tabBarAccessibilityLabel: 'Missing letter'}}
      />
      <Tab.Screen
        name="Riddles"
        component={RiddlesScreen}
        options={{tabBarAccessibilityLabel: 'Riddles'}}
      />
      <Tab.Screen
        name="ExtraWord"
        component={ExtraWordScreen}
        options={{tabBarAccessibilityLabel: 'Extra word'}}
      />
      <Tab.Screen
        name="Facts"
        component={FactsScreen}
        options={{tabBarAccessibilityLabel: 'Pirate facts'}}
      />
    </Tab.Navigator>
  );
}
