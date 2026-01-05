import React, { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Calendar as RNCalendar, DateData } from "react-native-calendars";
import { Text } from "@components";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { StyleSheet } from "react-native";
import { colors } from "@theme";
import { Theme } from "react-native-calendars/src/types";

interface Props {
  close: () => void;
  onSelection: (date: any) => void;
  currentDate?: string;
}

export const Calendar: FC<Props> = ({ onSelection, currentDate }) => {
  const [selectedDate, setSelected] = useState<string | undefined>(currentDate);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const CustomDay = ({ date, state }: DayProps & { date?: DateData }) => {
    const disabled = state === "disabled";
    const isToday = state === "today";
    const currentSelection = date?.dateString === selectedDate;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.customDay,
          currentSelection ? styles.selectedDay : undefined,
        ]}
        onPress={() => {
          setSelected(date?.dateString);
          onSelection(date);
        }}
      >
        <Text
          bold={isToday || currentSelection}
          color={
            disabled
              ? colors.textGrey
              : isToday && !currentSelection
              ? colors.primary
              : currentSelection
              ? colors.white
              : colors.grey100
          }
          size={14}
        >
          {date?.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <RNCalendar
      theme={calendarTheme}
      dayComponent={CustomDay}
      minDate={tomorrow.toDateString()}
      monthFormat={"MMMM yyyy"}
      onPressArrowLeft={(subtractMonth: () => any) => subtractMonth()}
      onPressArrowRight={(addMonth: () => any) => addMonth()}
      enableSwipeMonths={true}
    />
  );
};

const styles = StyleSheet.create({
  customDay: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDay: {
    borderRadius: 32,
    backgroundColor: colors.primary,
  },
});

const calendarTheme: Theme = {
  backgroundColor: colors.white,
  calendarBackground: colors.white,
  textSectionTitleColor: colors.textGrey,
  textSectionTitleDisabledColor: colors.grey100,
  todayTextColor: colors.primary,
  dayTextColor: colors.grey100,
  textDisabledColor: colors.grey100,
  arrowColor: colors.grey100,
  disabledArrowColor: colors.textGrey,
  monthTextColor: colors.textGrey,
  textDayFontFamily: "HelveticaNeue",
  textMonthFontFamily: "HelveticaNeue",
  textDayHeaderFontFamily: "HelveticaNeue",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textMonthFontWeight: "700",
  textDayHeaderFontWeight: "700",
};
