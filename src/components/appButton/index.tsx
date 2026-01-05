import React, { FC } from "react";
import { Text } from "../text";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "@theme";
import { SvgProps } from "react-native-svg";
import { EButtonVariants } from "@constants/types";
import * as Animatable from "react-native-animatable";

export interface AppButtonProps extends TouchableOpacityProps {
  label?: string;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  variant?: EButtonVariants;
  br?: number;
  bold?: boolean;
  textSize?: number;
  textColor?: string;
  iconRight?: FC<SvgProps>;
  iconLeft?: FC<SvgProps>;
}

export const AppButton: FC<AppButtonProps> = ({
  label,
  children,
  fullWidth,
  style,
  loading,
  textSize,
  textColor,
  br,
  bold,
  rounded,
  variant = "primary",
  disabled,
  ...props
}) => {
  const IconLeft = props.iconLeft;
  const IconRight = props.iconRight;
  return (
    <TouchableOpacity
      style={[
        bodyStyle.base,
        bodyStyle[variant],
        fullWidth ? bodyStyle.fullWidth : null,
        style,
        { borderRadius: br || 0 },
        disabled ? bodyStyle.disabled : null,
        props.iconRight && { justifyContent: "space-between" },
      ]}
      {...props}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.white : colors.primary}
          size="small"
        />
      ) : label ? (
        <>
          {props.iconLeft ? (
            <IconLeft
              color={
                textColor ||
                (variant === "primary" ? colors.white : colors.primary)
              }
              width={19}
              height={19}
              storeWidth={1}
            />
          ) : null}
          <Text
            ml={props.iconLeft ? 8 : 0}
            mr={props.iconRight ? 8 : 0}
            color={textColor || textStyle[variant]}
            size={textSize || 14}
            bold={bold}
          >
            {label}
          </Text>

          {props.iconRight ? (
            <IconRight
              color={
                textColor ||
                (variant === "primary" ? colors.white : colors.primary)
              }
              width={textSize || 19}
              height={19}
              storeWidth={1}
            />
          ) : null}
        </>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
const textStyle = {
  primary: colors.white,
  secondary: colors.primary,
  tertiary: colors.primary,
};

const bodyStyle = StyleSheet.create({
  base: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  tertiary: {
    borderStyle: "dashed",

    borderColor: colors.primary,
    borderWidth: 1,

    backgroundColor: colors.white,
  },
  secondary: {
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.transparent,
    paddingHorizontal: 12,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.primary,
  },
});

export const AnimatedButton =
  Animatable.createAnimatableComponent(TouchableOpacity);
