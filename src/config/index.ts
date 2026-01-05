import { colors } from "@theme/index";
import {
  BriefcaseIcon,
  FolderIcon,
  HeartIcon,
  PersonStandingIcon,
} from "lucide-react-native";
import { EListingCategory, IListingCategory } from "../constants/types";
export * from "./toastConfig";
export const noHeader = {
  options: {
    header: undefined,
    headerShown: false,
  },
};

export const filtersConfig: IListingCategory[] = [
  {
    label: EListingCategory.HEALTH,
    count: 6,
    color: colors.purple,
    icon: HeartIcon,
  },
  {
    label: EListingCategory.WORK,
    count: 5,
    color: colors.success,
    icon: BriefcaseIcon,
  },
  {
    label: EListingCategory.PERSONAL,
    count: 4,
    color: colors.pink,
    icon: PersonStandingIcon,
  },
  {
    label: EListingCategory.OTHER,
    count: 13,
    color: colors.borderGreyDark,
    icon: FolderIcon,
  },
];
