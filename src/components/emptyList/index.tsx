import { StyleSheet } from "react-native";
import { Center } from "../layout/layout";
import { Text } from "../text";
import { AppButton } from "../appButton";
import { useTranslation } from "@hooks/useTranslationHook";
import { EButtonVariants } from "@constants/index";
import { PlusIcon } from "lucide-react-native";
import { colors } from "@theme/index";
import { EmptyListIcon } from "@assets/icons";

type Props = {
  onCreateNewTask: () => void;
  refreshing?: boolean;
  search?: boolean;
};
export const ListEmptyComponent = ({
  onCreateNewTask,
  refreshing,
  search,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Center style={styles.container}>
      <EmptyListIcon size={30} color={colors.dark} />
      <Text mt={16} mb={22} color={colors.textGrey} size={14}>
        {t("common.noResults")}
      </Text>
      {!search && (
        <AppButton
          variant={EButtonVariants.SECONDARY}
          iconLeft={() => <PlusIcon size={16} color={colors.primary} />}
          label={` ${t("tasks.start")} `}
          br={12}
          style={styles.rfrsh}
          textSize={12}
          onPress={onCreateNewTask}
          loading={refreshing}
        />
      )}
    </Center>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 102 },
  rfrsh: { width: 172 },
});
