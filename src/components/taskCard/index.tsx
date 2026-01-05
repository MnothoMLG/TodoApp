import React, { FC, useState } from "react";
import { Text } from "../text";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@theme";
import { ITask } from "@constants/types";
import { Margin, Row } from "../layout/layout";
import { useTranslation } from "@hooks";
import { AnimatedButton } from "../appButton";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { CheckButton } from "../checkButton";
import { formatDMY, isComplete } from "@util";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompleteTasks } from "@store/tasks/selectors";
import { Trash2Icon, ChevronDown, ChevronUp } from "lucide-react-native";
import { filtersConfig } from "@config/index";
import { deleteTaskRequest } from "@store/actions";

export interface Props {
  task: ITask;
  index: number;
  toggleComplete: () => void;
}

export const TaskCard: FC<Props> = ({ toggleComplete, task, index }) => {
  const favs = useSelector(getAllCompleteTasks);
  const { t } = useTranslation();
  const isTaskComplete = isComplete(task, favs);
  const [expanded, setExpanded] = useState(false);
  const listConfig = filtersConfig.find((f) => f.label === task.list);
  const dispatch = useDispatch();

  const formattedDate = formatDMY(task.dueDate);
  const onDelete = () => {
    Alert.alert(t("tasks.deleteTaskTitle"), t("tasks.deleteTaskMessage"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          dispatch(
            deleteTaskRequest({
              taskId: task.id,
              taskTitle: task.title,
            })
          );
        },
      },
    ]);
  };

  return (
    <AnimatedButton
      animation={"fadeInUp"}
      delay={index * 70}
      onPress={() => {
        setExpanded(!expanded);
      }}
      style={styles.container}
      activeOpacity={0.8}
      duration={350}
      useNativeDriver
      key={task.id + index}
    >
      <Row justify="space-between">
        <CheckButton
          active={isTaskComplete}
          onPress={toggleComplete}
          style={styles.checkBox}
        />
        <Margin style={[styles.details, expanded && styles.row]}>
          <Text mr={8} size={16}>
            {task?.title}
          </Text>
          <View
            style={{
              borderWidth: 1,
              backgroundColor: `${listConfig?.color}20`,
              borderColor: listConfig?.color,
              borderRadius: 4,
              padding: 4,
              paddingVertical: 2,
            }}
          >
            <Text color={listConfig?.color} size={8}>
              {listConfig?.label}
            </Text>
          </View>
        </Margin>

        {expanded ? (
          <ChevronUp color={colors.grey100} size={16} />
        ) : (
          <ChevronDown color={colors.grey100} size={16} />
        )}
      </Row>

      {expanded && (
        <Margin ml={32}>
          {task?.description && (
            <Text color={colors.textGrey} size={14} mt={4}>
              {task?.description}
            </Text>
          )}

          <Row fullWidth align="center" justify="flex-end">
            <Text size={11}>
              {t("tasks.dueDate")}: {formattedDate}
            </Text>
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
  row: { flexDirection: "row", alignItems: "center" },
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
    height: 20,
    maxWidth: 20,
    alignSelf: "flex-start",
  },
});
