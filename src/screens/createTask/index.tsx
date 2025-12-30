import React, { useMemo, useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Formik } from "formik";
import { Text, Input, BackButton, AppButton, Row, Margin } from "@components";
import { colors } from "@theme/index";
import { useTranslation } from "@hooks/useTranslationHook";
import { useLoading } from "@hooks/useLoadingHook";
import { ADD_TASK_LOADING_KEY, addTaskRequest } from "@store/actions";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ITask } from "@constants/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GenericMainStackRouteProps } from "@navigation/types";
import { routes } from "@navigation/routes";

type ListOption = "Inbox" | "Work" | "Personal";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  list: ListOption;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().min(1, "Required").required("Required"),
  description: Yup.string().optional(),
  dueDate: Yup.string().optional(),
  list: Yup.mixed<ListOption>().oneOf(["Inbox", "Work", "Personal"]).required(),
});

export default function NewTaskScreen() {
  const { params } = useRoute<GenericMainStackRouteProps<routes.CREATE_TASK>>();
  const loading = useLoading(ADD_TASK_LOADING_KEY);

  console.log("+++ NewTaskScreen Rendered +++", { loading, params });

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialValues = useMemo<FormValues>(
    () => ({
      title: "",
      description: "",
      dueDate: "",
      list: "Inbox",
      ...params?.task,
    }),
    []
  );

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
    };

    console.log("+++ Adding Task with payload: ", payload);

    dispatch(addTaskRequest({ task: payload as ITask, onSuccess }));
  };

  return (
    <SafeAreaView style={styles.safe}>
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
        validateOnChange={false}
        onSubmit={(values, helpers) => {
          addTask(values, () => {
            helpers.resetForm();
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          resetForm,
        }) => {
          const canSave = values.title.trim().length > 0 && !loading;

          return (
            <View style={styles.screen}>
              <Input
                label={t("common.title")}
                value={values.title}
                onChangeText={handleChange("title")}
                placeholder={t("tasks.titlePlaceholder")}
                style={styles.input}
                error={touched.title && errors.title ? errors.title : undefined}
                autoFocus
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

              <Margin mt={24} />

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
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 8, android: 14 }),
  },
  headerRow: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
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
