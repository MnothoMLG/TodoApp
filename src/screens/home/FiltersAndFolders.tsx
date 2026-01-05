import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@components";
import { colors } from "@theme";
import groupBy from "lodash/groupBy";
import { filtersConfig } from "@config/index";
import { useSelector } from "react-redux";
import { getAllCharacters } from "@store/tasks/selectors";
import { EListingCategory } from "@constants/types";

type Props = {
  onFilterSelection: (filter: EListingCategory) => void;
  activeFilter?: EListingCategory;
};

export function FiltersAndFolders({ onFilterSelection, activeFilter }: Props) {
  const tasksList = useSelector(getAllCharacters);
  const groupedTasks = groupBy(tasksList, "list");

  return (
    <View style={styles.summaryGrid}>
      {filtersConfig.map((item) => {
        const Icon = item.icon;

        const tasksInList = groupedTasks[item.label] || [];
        const isActive = activeFilter === item.label;

        return (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.summaryCard,
              {
                backgroundColor: `${item.color}10`,
                borderColor: isActive ? item.color : colors.transparent,
              },
            ]}
            onPress={() => onFilterSelection(item.label)}
          >
            <Icon size={18} color={item.color} />
            <Text size={16} bold>
              {tasksInList.length}{" "}
              <Text size={16} color={colors.textGrey}>
                {item.label}
              </Text>
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summaryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
});
