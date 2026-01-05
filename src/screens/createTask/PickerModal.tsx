import React, { FC } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { AppButton, Margin, Center } from "@components";
import { colors } from "@theme/index";
import { useTranslation } from "@hooks/useTranslationHook";
import { XIcon } from "lucide-react-native";

interface Props {
  showPicker?: boolean;
  closeModal: () => void;
  renderContent: () => React.ReactNode;
  canProceed?: boolean;
}

export const PickerModal: FC<Props> = ({
  showPicker,
  closeModal,
  canProceed,
  renderContent,
}) => {
  const { t } = useTranslation();

  return (
    <Modal visible={showPicker} transparent animationType="fade">
      <Center style={styles.bg}>
        <View style={styles.modalWrapper}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
            <XIcon size={18} color={colors.grey100} />
          </TouchableOpacity>

          {renderContent()}

          <Margin mt={24} />

          <AppButton
            label={t("common.Ok")}
            br={8}
            disabled={!canProceed}
            onPress={closeModal}
          />
        </View>
      </Center>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: `${colors.black}30`,
    paddingHorizontal: 24,
  },
  modalWrapper: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    padding: 16,
  },
  closeModal: { width: 30, height: 30 },

  row: { flexDirection: "row", gap: 14 },
  half: { flex: 1 },
});
