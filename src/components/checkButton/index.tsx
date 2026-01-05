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
      <CheckIcon size={14} color={active ? colors.white : colors.transparent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.success,
    borderRadius: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.borderGreyDark + "30",
  },
  inactive: {
    backgroundColor: colors.lightGrey,
  },
});
