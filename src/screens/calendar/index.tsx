import React, { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, FlatList } from "react-native";
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
  deleteTaskRequest,
  toggleTaskCompletion,
} from "@store/actions";
import { getAllCharacters } from "@store/tasks/selectors";
import { colors } from "@theme";
import { SearchIcon } from "lucide-react-native";
import moment, { Moment } from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeDateFilter, setActiveFilter] = useState<Moment>(moment());
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_TASKS_LOADING_KEY);
  const tasksList = useSelector(getAllCharacters);

  const tasksToDisplay = useMemo(() => {
    let filteredTasks = tasksList.filter((task) => {
      const matchesDate =
        !activeDateFilter ||
        task.dueDate === activeDateFilter.format("DD-MM-YYYY");

      const matchesSearch =
        !searchKeyword ||
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchesDate && matchesSearch;
    });

    return filteredTasks;
  }, [activeDateFilter, searchKeyword, tasksList]);

  const taskListLength = tasksToDisplay?.length;

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

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
              calendarHeaderStyle={styles.calendarHeaderStyle}
              selectedDate={activeDateFilter}
              onDateSelected={(date: moment.Moment) => {
                setActiveFilter(date);
              }}
              dateNumberStyle={styles.baseDateStyles}
              dateNameStyle={styles.baseDateStyles}
              highlightDateNumberStyle={styles.dateStyles}
              highlightDateNameStyle={styles.dateStyles}
              disabledDateNameStyle={styles.disabledDateStyle}
              disabledDateNumberStyle={styles.disabledDateStyle}
              iconContainer={styles.icon}
            />

            <Input
              left={<SearchIcon size={16} color={colors.borderGreyDark} />}
              search
              style={{ height: 42, marginTop: 16 }}
              placeholder={t("tasks.search")}
              onChangeText={(text) => setSearchKeyword(text)}
            />

            {!!activeDateFilter && (
              <Text mt={16} bold size={14} color={colors.textGrey}>
                {t("tasks.dueOn").replace(
                  "{0}",
                  activeDateFilter.format("DD MMM YY")
                )}
              </Text>
            )}
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
  },
  calendarHeaderStyle: {
    color: colors.textGrey,
    fontSize: 14,
    marginBottom: 8,
  },
  icon: { flex: 0.1 },
  disabledDateStyle: { color: colors.grey },
  baseDateStyles: { color: colors.grey100 },
  dateStyles: { color: colors.primary },
  items: {
    paddingBottom: 106,
    padding: 8,
  },
  rfrsh: { width: 90 },
  list: { padding: 16, width: "100%" },
});
