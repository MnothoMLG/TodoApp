import { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";
import { CheckLottie } from "@assets";
import { colors } from "@theme";
import { CheckIcon } from "lucide-react-native";

interface Props {
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function CheckButton({ active, onPress, style }: Props) {
  const animation = useRef<LottieView>(null);

  // useEffect(() => {
  //   if (active) {
  //     animation.current?.play(0, 45);
  //   } else {
  //     animation.current?.play(45, 0);
  //   }
  // }, [active]);

  const like = () => {
    animation.current?.play(0, 45);
  };

  const unlike = () => {
    animation.current?.play(45, 0);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (active) {
          unlike();
        } else {
          like();
        }
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
  animation: {
    width: 40,
    height: 40,
  },
});
