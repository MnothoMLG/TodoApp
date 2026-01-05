import { LucideIcon } from "lucide-react-native";
import { ReactNode } from "react";

export interface ICallBacks {
  onSuccess?: (msg?: string) => void;
  onFailure?: (reason?: string) => void;
}

export interface IGenericResponse {
  message: string;
}

export enum EToastTypes {
  ERROR = "error",
  SUCCESS = "success",
}

export enum EButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export interface ToastConfig {
  type: EToastTypes;
  message: string;
  description?: string;
  topOffset?: number;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  list?: string;
  completed?: boolean;
  createdAt?: number;
}

export enum EListingCategory {
  HEALTH = "Health",
  WORK = "Work",
  PERSONAL = "Personal",
  OTHER = "Others",
}

export interface IListingCategory {
  label: EListingCategory;
  color: string;
  icon: LucideIcon;
  count?: number;
}
