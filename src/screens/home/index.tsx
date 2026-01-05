import React, { useEffect, useMemo, useState } from "react";
import { Alert, SectionList, StyleSheet } from "react-native";
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
import {
  fetchTasksRequest,
  GET_TASKS_LOADING_KEY,
  deleteTaskRequest,
  toggleTaskCompletion,
} from "@store/actions";
import { getAllCharacters } from "@store/tasks/selectors";
import { colors } from "@theme";
import { FiltersAndFolders } from "./FiltersAndFolders";
import { SearchIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EListingCategory } from "@constants/types";
import { buildSections } from "@util";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<EListingCategory>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_TASKS_LOADING_KEY);
  const tasksList = useSelector(getAllCharacters);
  const taskListLength = tasksList.length;

  const tasksToDisplay = useMemo(() => {
    let filteredTasks = tasksList.filter((task) => {
      const matchesList = !activeFilter || task.list === activeFilter;

      const matchesSearch =
        !searchKeyword ||
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchesList && matchesSearch;
    });

    return filteredTasks;
  }, [activeFilter, searchKeyword, tasksList]);

  const sections = buildSections(tasksToDisplay);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  const onFilterSelection = (filter: EListingCategory) => {
    setActiveFilter(filter == activeFilter ? undefined : filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        style={styles.list}
        contentContainerStyle={styles.items}
        stickySectionHeadersEnabled={false}
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

            <FiltersAndFolders
              onFilterSelection={onFilterSelection}
              activeFilter={activeFilter}
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
        renderSectionHeader={({ section }) => (
          <Text mt={8} mb={8} size={16} bold color={`${colors.dark}70`}>
            {section.title}
          </Text>
        )}
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
  },
  items: {
    paddingBottom: 106,
    padding: 8,
  },
  rfrsh: { width: 90 },
  list: { padding: 16, width: "100%" },
});
