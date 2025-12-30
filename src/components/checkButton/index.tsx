import { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";
import { CheckLottie } from "@assets";
import { colors } from "@theme";

interface Props {
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}
export function CheckButton({ active, onPress, style }: Props) {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    if (active) {
      animation.current?.play(0, 45);
    } else {
      animation.current?.play(45, 0);
    }
  }, [active]);

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
      style={[styles.animationContainer, style]}
    >
      <LottieView
        ref={animation}
        style={styles.animation}
        source={CheckLottie}
        autoPlay={false}
        loop={false}
        speed={1.5}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.textGrey + "30",
  },
  animation: {
    width: 40,
    height: 40,
  },
});
