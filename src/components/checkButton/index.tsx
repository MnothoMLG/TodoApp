import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "@theme";
import { CheckIcon } from "lucide-react-native";

interface Props {
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function CheckButton({ active, onPress, style }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
      }}
      style={[styles.container, !active && styles.inactive, style]}
    >
      <CheckIcon size={18} color={active ? colors.white : colors.transparent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.success,
    borderRadius: 15,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.borderGreyDark + "30",
  },
  inactive: {
    backgroundColor: colors.lightGrey,
  },
});
