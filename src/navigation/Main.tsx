import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CreateTaskScreen,
  CompletedTasksScreen,
  CalendarScreen,
  HomeScreen,
} from "@screens";
import { MainStackParamList } from "./types";
import { noHeader } from "@config";
import { routes } from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "@components/tabBar";

const MainStackNav = createStackNavigator<MainStackParamList>();

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <MainStackNav.Navigator initialRouteName={routes.HOME_TAB}>
      <MainStackNav.Screen
        {...noHeader}
        name={routes.HOME_TAB}
        component={HomeTabNav}
      />
      <MainStackNav.Group screenOptions={{ presentation: "modal" }}>
        <MainStackNav.Screen
          {...noHeader}
          name={routes.CREATE_TASK}
          component={CreateTaskScreen}
        />
      </MainStackNav.Group>
    </MainStackNav.Navigator>
  );
};

const HomeTabNav = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen {...noHeader} name={routes.HOME} component={HomeScreen} />

      <Tab.Screen
        {...noHeader}
        name={routes.CALENDAR}
        component={CalendarScreen}
      />
      <Tab.Screen
        {...noHeader}
        name={routes.COMPLETE}
        component={CompletedTasksScreen}
      />
    </Tab.Navigator>
  );
};
