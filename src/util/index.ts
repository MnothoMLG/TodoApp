import Toast from "react-native-toast-message";
import { ITask, ToastConfig } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TASKS_KEY } from "@constants";

export const showToast = ({ type, message, topOffset }: ToastConfig) => {
  Toast.show({
    type,
    text2: message,
    visibilityTime: 3000,
    position: topOffset ? "top" : "bottom",
    bottomOffset: 100,
    topOffset: topOffset ?? 80,
  });
};

export const isComplete = (
  //could use id only but keeping ITask for future extensibility
  characterId: ITask,
  completed: Array<ITask>
) => {
  return completed.some((char) => char.id === characterId.id);
};

export async function loadTasksFromStorage(): Promise<ITask[]> {
  const raw = await AsyncStorage.getItem(TASKS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ITask[]) : [];
  } catch {
    return [];
  }
}

export async function saveTasksToStorage(tasks: ITask[]) {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
