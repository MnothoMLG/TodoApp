import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import {
  Text,
  Input,
  BackButton,
  AppButton,
  Calendar,
  Row,
  Margin,
} from "@components";
import { colors } from "@theme/index";
import { useTranslation } from "@hooks/useTranslationHook";
import { useLoading } from "@hooks/useLoadingHook";
import { ADD_TASK_LOADING_KEY, addTaskRequest } from "@store/actions";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { EButtonVariants, ITask } from "@constants/types";
import { useNavigation } from "@react-navigation/native";
import { CalendarIcon, ChevronDown } from "lucide-react-native";
import { PickerModal } from "./PickerModal";
import { formatDate, generateTaskId } from "@util";
import { filtersConfig } from "@config/index";

type ListOption = "Inbox" | "Work" | "Personal";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  list: ListOption;
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "A title is required")
    .required("A title is required"),
  description: Yup.string().optional(),
  dueDate: Yup.string().optional(),
});

export default function NewTaskScreen() {
  const loading = useLoading(ADD_TASK_LOADING_KEY);
  const [showPicker, setPickerModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialValues = useMemo<FormValues>(
    () => ({
      title: "",
      description: "",
      dueDate: "",
      list: "Inbox",
    }),
    []
  );

  const closeModal = () => setPickerModal(false);

  const addTask = (values: FormValues, onSuccessfulAddition?: () => void) => {
    const onSuccess = () => {
      onSuccessfulAddition?.();
      navigation.goBack();
    };

    const payload: Partial<ITask> = {
      title: values.title.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate,
      list: values.list,
      id: generateTaskId(),
    };

    dispatch(addTaskRequest({ task: payload as ITask, onSuccess }));
  };

  return (
    <View style={styles.container}>
      <Row
        fullWidth
        align="center"
        justify="space-between"
        style={styles.headerRow}
      >
        <BackButton />

        <Text bold size={18}>
          {t("tasks.new")}
        </Text>

        <View style={{ width: 42 }} />
      </Row>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={(values, helpers) => {
          addTask(values, () => {
            helpers.resetForm();
          });
        }}
      >
        {({ values, errors, handleChange, setFieldValue, resetForm }) => {
          const canSave =
            values.title.trim().length > 0 && !loading && !errors.title;

          return (
            <View style={styles.screen}>
              <Input
                label={t("common.title")}
                value={values.title}
                onChangeText={handleChange("title")}
                placeholder={t("tasks.titlePlaceholder")}
                style={styles.input}
                error={errors.title}
                returnKeyType="done"
              />

              <Input
                label={t("common.description")}
                value={values.description}
                onChangeText={handleChange("description")}
                placeholder={t("tasks.descriptionPlaceholder")}
                style={styles.textArea}
                multiline
                textAlignVertical="top"
              />

              <Margin mt={24} mb={24}>
                <Row
                  justify="space-between"
                  align="center"
                  style={{ marginBottom: 8 }}
                >
                  <View style={styles.flex}>
                    <Text size={14} mb={8} color={colors.grey100}>
                      {t("tasks.dueDate")}
                    </Text>
                    <AppButton
                      label={values?.dueDate || t("common.dateFormat")}
                      onPress={() => {
                        setPickerModal(true);
                      }}
                      variant={EButtonVariants.SECONDARY}
                      br={8}
                      style={{ height: 42 }}
                      textSize={13}
                      iconLeft={() => (
                        <CalendarIcon size={16} color={colors.textGrey} />
                      )}
                      iconRight={() => (
                        <ChevronDown color={colors.primary} size={14} />
                      )}
                    />
                  </View>

                  <View style={styles.flex} />
                </Row>

                <Text size={14} mb={8} mt={16} color={colors.grey100}>
                  {t("tasks.list")}
                </Text>
                <Row align="center" fullWidth flexWrap="wrap">
                  {filtersConfig.map(({ label, color, ...cat }) => {
                    const isActive = values.list === label;

                    return (
                      <AppButton
                        label={label}
                        onPress={() => {
                          setFieldValue("list", label);
                        }}
                        variant={EButtonVariants.SECONDARY}
                        br={8}
                        style={{
                          height: 42,
                          backgroundColor: `${color}15`,
                          borderColor: isActive ? color : `${color}15`,
                          marginRight: 8,
                          marginBottom: 8,
                        }}
                        textColor={isActive ? color : colors.borderGreyDark}
                        iconLeft={() => <cat.icon size={16} color={color} />}
                      />
                    );
                  })}
                </Row>
              </Margin>

              <AppButton
                onPress={() => {
                  addTask(values, () => {
                    resetForm();
                  });
                }}
                activeOpacity={0.9}
                br={8}
                label={t("tasks.save")}
                disabled={!canSave}
                loading={loading}
              />
              <PickerModal
                canProceed={!!values.dueDate}
                showPicker={showPicker}
                closeModal={closeModal}
                renderContent={() => (
                  <Calendar
                    close={closeModal}
                    currentDate={values.dueDate}
                    onSelection={(date) => {
                      setFieldValue("dueDate", formatDate(date?.dateString));
                    }}
                  />
                )}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  modalWrapper: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    padding: 16,
  },
  flex: { flex: 1, marginRight: 7 },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  closeModal: { width: 30, height: 30 },
  headerRow: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderWidth: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    color: "rgba(220,235,255,0.95)",
    fontSize: 34,
    fontWeight: "400",
    paddingVertical: 6,
    marginBottom: 18,
  },

  label: {
    color: "rgba(210, 224, 255, 0.55)",
    fontSize: 13,
    marginBottom: 8,
  },

  textArea: {
    fontSize: 16,
    height: 120,
  },

  row: { flexDirection: "row", gap: 14 },
  half: { flex: 1 },

  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  fieldIcon: {
    color: "rgba(220,235,255,0.8)",
    fontSize: 16,
    width: 18,
    textAlign: "center",
  },
  fieldRightIcon: {
    color: "rgba(220,235,255,0.55)",
    marginLeft: "auto",
    fontSize: 14,
  },
  fieldText: { color: "rgba(220,235,255,0.9)", fontSize: 16 },
  fieldPlaceholder: { color: "rgba(210, 224, 255, 0.35)" },

  saveBtn: {
    backgroundColor: "#3C82F6",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 12,
    shadowColor: "#3C82F6",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  saveBtnDisabled: { opacity: 0.55 },
  saveText: { color: "white", fontSize: 16, fontWeight: "700" },
});
