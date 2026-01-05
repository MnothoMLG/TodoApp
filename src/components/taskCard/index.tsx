import React, { FC, useState } from "react";
import { Text } from "../text";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@theme";
import { ITask } from "@constants/types";
import { Margin, Row } from "../layout/layout";
import { useTranslation } from "@hooks";
import { AnimatedButton } from "../appButton";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { CheckButton } from "../checkButton";
import { isComplete } from "@util";
import { useSelector } from "react-redux";
import { getAllFavourites } from "@store/tasks/selectors";
import {
  PenIcon as EditIcon,
  Trash2Icon,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";

export interface Props {
  task: ITask;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  toggleComplete: () => void;
}

export const TaskCard: FC<Props> = ({
  onEdit,
  toggleComplete,
  onDelete,
  task,
  index,
}) => {
  const favs = useSelector(getAllFavourites);
  const { t } = useTranslation();
  const isTaskComplete = isComplete(task, favs);
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedButton
      animation={"fadeInUp"}
      delay={index * 70}
      onPress={() => {
        setExpanded(!expanded);
        // onPress();
      }}
      style={styles.container}
      activeOpacity={0.8}
      duration={350}
      useNativeDriver
      key={task.id + index}
    >
      <Row align="center" justify="space-between">
        <CheckButton
          active={isTaskComplete}
          onPress={toggleComplete}
          style={styles.checkBox}
        />
        <Margin style={styles.details}>
          <Text size={16}>{task?.title}</Text>
        </Margin>

        {expanded ? (
          <ChevronUp color={colors.grey100} size={16} />
        ) : (
          <ChevronDown color={colors.grey100} size={16} />
        )}
      </Row>

      {expanded && (
        <Margin ml={42}>
          {task?.description && (
            <Text color={colors.textGrey} size={14} mt={4}>
              {task?.description}
            </Text>
          )}

          <Row fullWidth align="center" justify="flex-end">
            <TouchableOpacity onPress={onEdit} style={styles.actionIcon}>
              <EditIcon color={colors.primary} size={14} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.actionIcon}>
              <Trash2Icon color={colors.danger} size={16} />
            </TouchableOpacity>
          </Row>
        </Margin>
      )}
    </AnimatedButton>
  );
};

export const TaskCardPlaceholder: FC = () => {
  return (
    <AnimatedButton
      animation={"fadeIn"}
      style={styles.container}
      activeOpacity={0.8}
    >
      <Row fullWidth>
        <Margin style={styles.details}>
          <ShimmerPlaceholder
            style={styles.detailShimmer}
            LinearGradient={LinearGradient}
          />
          <Margin mt={8} />
          <ShimmerPlaceholder
            style={styles.detailShimmer}
            LinearGradient={LinearGradient}
          />
        </Margin>
        <Margin mr={8} />
      </Row>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 12,
    padding: 12,
    justifyContent: "space-between",
  },
  detailShimmer: { maxWidth: "95%" },
  imgLoader: { height: 102 },
  details: {
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 12,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textGrey + "30",
    marginLeft: 4,
  },
  image: {
    width: 100,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  checkBox: {
    height: 30,
    maxWidth: 30,
    alignSelf: "flex-start",
  },
});
