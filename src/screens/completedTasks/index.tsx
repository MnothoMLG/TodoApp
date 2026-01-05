import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "@theme";
import { Margin, TaskCard, Text, ListEmptyComponent } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskCompletion } from "@store/actions";
import { getAllCompleteTasks } from "@store/tasks/selectors";
import { useTranslation } from "@hooks";

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const completeTasks = useSelector(getAllCompleteTasks);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={completeTasks}
        style={styles.list}
        testID="Done-FlatList"
        contentContainerStyle={styles.items}
        ListHeaderComponent={() => (
          <Text mb={16} size={24} bold>
            {t("tasks.complete")}
          </Text>
        )}
        renderItem={({ item, index }) => (
          <TaskCard
            index={index}
            task={item}
            toggleComplete={() => {
              dispatch(toggleTaskCompletion({ task: item }));
            }}
          />
        )}
        ItemSeparatorComponent={() => <Margin mt={16} />}
        ListEmptyComponent={<ListEmptyComponent onCreateNewTask={() => {}} />}
      />
    </SafeAreaView>
  );
};

export default CompletedTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  items: {
    paddingBottom: 106,
    padding: 8,
  },
  rfrsh: { width: 90 },
  list: { padding: 16, width: "100%" },
});
