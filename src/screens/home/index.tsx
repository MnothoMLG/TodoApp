import React, { useEffect } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet } from "react-native";
import {
  Margin,
  Text,
  TaskCard,
  TaskCardPlaceholder,
  CreateTaskButton,
  ListEmptyComponent,
} from "@components";
import { useLoading, useTranslation } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@navigation/routes";
import { GenericMainStackScreenProps } from "@navigation/types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksRequest,
  GET_TASKS_LOADING_KEY,
  toggleTaskCompletion,
} from "@store/actions";
import { getAllCharacters } from "@store/tasks/selectors";
import { colors } from "@theme";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_TASKS_LOADING_KEY);
  const tasksList = useSelector(getAllCharacters);
  const taskListLength = tasksList.length;

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  useEffect(() => {
    console.log("+++ ==== Task List Updated === +++", tasksList);
  }, [tasksList]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loading ? new Array(10) : tasksList}
        style={styles.list}
        contentContainerStyle={styles.items}
        renderItem={({ item, index }) =>
          loading ? (
            <TaskCardPlaceholder />
          ) : (
            <TaskCard
              index={index}
              task={item}
              toggleComplete={() => {
                dispatch(toggleTaskCompletion({ task: item }));
              }}
              onEdit={() => {
                navigation.navigate(routes.CREATE_TASK, {
                  task: item,
                });
              }}
              onDelete={() => {
                Alert.alert(
                  t("tasks.deleteTaskTitle"),
                  t("tasks.deleteTaskMessage"),
                  [
                    {
                      text: t("common.cancel"),
                      style: "cancel",
                    },
                    {
                      text: t("common.delete"),
                      style: "destructive",
                      onPress: () => {
                        /* Dispatch delete action here */
                      },
                    },
                  ]
                );
              }}
            />
          )
        }
        ListHeaderComponent={
          <Margin mt={24} mb={16}>
            <Text size={24} bold>
              {t("tasks.allTasks")}
            </Text>
            <Text size={16} color={colors.grey100}>
              {taskListLength}{" "}
              {t("tasks.remainingTasks").replace(
                "{0}",
                taskListLength === 1 ? "" : "s"
              )}
            </Text>
          </Margin>
        }
        ListEmptyComponent={
          !loading ? (
            <ListEmptyComponent
              onCreateNewTask={() => {
                navigation.navigate(routes.CREATE_TASK);
              }}
              refreshing={loading}
            />
          ) : null
        }
        ItemSeparatorComponent={() => <Margin mr={8} mt={16} />}
        onEndReachedThreshold={0.5} // Load more when scrolled 50% from the bottom
      />
      <CreateTaskButton
        onPress={() => {
          navigation.navigate(routes.CREATE_TASK);
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

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
