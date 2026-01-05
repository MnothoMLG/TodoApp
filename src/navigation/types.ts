import { RouteProp } from "@react-navigation/native";
import { routes } from "./routes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ITask } from "@constants/types";

export type MainStackParamList = {
  [routes.HOME]: undefined;
  [routes.COMPLETE]: undefined;
  [routes.CALENDAR]: undefined;
  [routes.CREATE_TASK]:
    | {
        task: ITask;
      }
    | undefined;
};
export type GenericMainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>["navigation"];

export type GenericMainStackRouteProps<T extends keyof MainStackParamList> =
  RouteProp<MainStackParamList, T>;
