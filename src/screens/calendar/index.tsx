import React, { useEffect, useMemo, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, FlatList } from "react-native";
import {
  Margin,
  Text,
  TaskCard,
  TaskCardPlaceholder,
  CreateTaskButton,
  ListEmptyComponent,
  Input,
} from "@components";
import { useLoading, useTranslation } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@navigation/routes";
import { GenericMainStackScreenProps } from "@navigation/types";
import { useDispatch, useSelector } from "react-redux";
import CalendarStrip from "react-native-calendar-strip";
import {
  fetchTasksRequest,
  GET_TASKS_LOADING_KEY,
  toggleTaskCompletion,
} from "@store/actions";
import { getAllCharacters } from "@store/tasks/selectors";
import { colors } from "@theme";
import { SearchIcon } from "lucide-react-native";
import { EListingCategory } from "@constants/types";

const CalendarScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeDateFilter, setActiveFilter] = useState<string>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_TASKS_LOADING_KEY);
  const tasksList = useSelector(getAllCharacters);

  const tasksToDisplay = useMemo(() => {
    let filteredTasks = tasksList.filter((task) => {
      const matchesDate =
        !activeDateFilter || task.dueDate === activeDateFilter;

      const matchesSearch =
        !searchKeyword ||
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchesDate && matchesSearch;
    });

    return filteredTasks;
  }, [activeDateFilter, searchKeyword, tasksList]);

  const taskListLength = tasksToDisplay.length;

  console.log("to diplay ", { tasksToDisplay });

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  useEffect(() => {
    console.log("+++ ==== Task List Updated === +++", tasksList);
  }, [tasksList]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasksToDisplay}
        style={styles.list}
        contentContainerStyle={styles.items}
        ListHeaderComponent={
          <Margin mb={16}>
            <Text size={24} bold>
              {t("tasks.allTasks")}
            </Text>
            <Text size={16} mb={16} color={colors.grey100}>
              {taskListLength}{" "}
              {t("tasks.remainingTasks").replace(
                "{0}",
                taskListLength === 1 ? "" : "s"
              )}
            </Text>

            <CalendarStrip
              scrollable
              style={{ height: 80, paddingTop: 20, paddingBottom: 10 }}
              calendarColor={colors.transparent}
              calendarHeaderStyle={{
                color: colors.textGrey,
                fontSize: 14,
                marginBottom: 8,
              }}
              onDateSelected={(date: moment.Moment) => {
                console.log("++++++ >>", { date });
                const formattedDate = date.format("DD-MM-YYYY");
                console.log("++++++ >>", { formattedDate });
                setActiveFilter(formattedDate as EListingCategory);

                // tasksToDisplay
              }}
              dateNumberStyle={{ color: colors.grey100 }}
              dateNameStyle={{ color: colors.grey100 }}
              highlightDateNumberStyle={styles.dateStyles}
              highlightDateNameStyle={styles.dateStyles}
              disabledDateNameStyle={{ color: "grey" }}
              disabledDateNumberStyle={{ color: "grey" }}
              iconContainer={{ flex: 0.1 }}
            />

            <Input
              left={<SearchIcon size={16} color={colors.borderGreyDark} />}
              search
              style={{ height: 42, marginTop: 16 }}
              placeholder={t("tasks.search")}
              onChangeText={(text) => setSearchKeyword(text)}
            />
          </Margin>
        }
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
        ListEmptyComponent={
          !loading ? (
            <ListEmptyComponent
              onCreateNewTask={() => {
                navigation.navigate(routes.CREATE_TASK);
              }}
              search={!!searchKeyword || !!activeDateFilter}
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

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  dateStyles: { color: colors.primary },
  items: {
    paddingBottom: 106,
    padding: 8,
  },
  rfrsh: { width: 90 },
  list: { padding: 16, width: "100%" },
});
