import Toast from "react-native-toast-message";
import some from "lodash/some";
import values from "lodash/values";
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
  taskToCheck: ITask,
  completed: Array<ITask>
) => {
  return completed?.some(
    (task) =>
      task.title === taskToCheck.title && task.dueDate === taskToCheck.dueDate
  );
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

export function formatDate(date: string): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

export function isToday(date?: string) {
  if (!date) return false;
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  return date === formatDate(today);
}

export function generateTaskId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildSections(tasks: ITask[]) {
  const todayTasks = tasks.filter((t) => isToday(t.dueDate));
  const otherTasks = tasks.filter((t) => !isToday(t.dueDate));

  return [
    { title: "Today", data: todayTasks },
    { title: "Upcoming", data: otherTasks },
  ].filter((section) => section.data.length > 0);
}
