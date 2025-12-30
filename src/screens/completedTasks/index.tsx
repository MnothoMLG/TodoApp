import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "@theme";
import {
  Margin,
  TaskCard,
  Text,
  Center,
  ListEmptyComponent,
} from "@components";
import { useTranslation } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@navigation/routes";
import { GenericMainStackScreenProps } from "@navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskCompletion } from "@store/actions";
import { getAllFavourites } from "@store/tasks/selectors";
import { EmptyListIcon } from "@assets/icons";

const CompletedTasks = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<GenericMainStackScreenProps<routes.COMPLETE>>();

  const favs = useSelector(getAllFavourites);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favs}
        style={styles.list}
        testID="Done-FlatList"
        extraData={favs}
        contentContainerStyle={styles.items}
        renderItem={({ item, index }) => (
          <TaskCard
            index={index}
            task={item}
            toggleComplete={() => {
              dispatch(toggleTaskCompletion({ task: item }));
            }}
            onPress={() => {
              navigation.navigate(routes.DETAILS, {
                task: item,
              });
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
