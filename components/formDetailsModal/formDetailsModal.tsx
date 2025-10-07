import { ColorUtils } from "@/libs/utils/ColorUtils";
import React, { ReactNode } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

type Props = {
    title?: string;
    children: ReactNode;
    labelBtn?: string;
    visible: boolean;
    isLoading?: boolean;
    onClose: () => void
    onOpen: () => void
    submit: (close: () => void) => void;
};

export default function FormDetailsModal({
    title,
    children,
    labelBtn,
    visible,
    isLoading = false,
    onClose,
    onOpen,
    submit
}: Props) {

    return (
        <View className="mb-5">
            <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                    onPress={onOpen}>
                    <Text className="text-white font-bold text-[1.5rem]">{labelBtn}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="flex-1 bg-black/40" />
                </TouchableWithoutFeedback>

                <View className="absolute top-20 left-0 right-0 bg-bgSecondary rounded-lg justify-center items-center p-6" >
                    {title && (
                        <Text className="text-3xl font-bold text-secondary">
                            {title}
                        </Text>
                    )}

                    {children}

                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={() => submit(onClose)}
                        className="bg-third p-4 rounded-xl items-center justify-center mt-8 w-full"
                    >
                        {isLoading ? (
                            <ActivityIndicator color={ColorUtils.SECONDARY} />
                        ) : (
                            <Text className="text-secondary font-bold text-lg">
                                Salvar
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
