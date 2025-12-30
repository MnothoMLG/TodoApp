import { colors } from "@theme/index";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { PlusIcon } from "lucide-react-native";

type Props = {
  onPress?: () => void;
};

export const CreateTaskButton = ({ onPress }: Props) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
    <PlusIcon width={20} height={20} color={colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
