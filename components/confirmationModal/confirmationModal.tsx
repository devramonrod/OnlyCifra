import React from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

type ConfirmationModalProps = {
    title: string;
    message?: string;
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmationModal({
    title,
    message,
    visible,
    onCancel,
    onConfirm
}: ConfirmationModalProps) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View className="flex-1 bg-black/40" />
            </TouchableWithoutFeedback>

            <View className="absolute top-20 left-0 right-0 bg-bgSecondary rounded-lg justify-center items-center p-6" >
                <Text className="text-3xl font-bold text-secondary">
                    {title}
                </Text>
                {message && (
                    <Text className="text-secondary text-gray-700 mt-2 mb-4">
                        {message}
                    </Text>
                )}

                <View className="flex-row justify-center gap-4">
                    <TouchableOpacity
                        onPress={onCancel}
                        className="bg-default p-4 rounded-xl items-center justify-center mt-8"
                    >
                        <Text className="text-secondary font-bold text-lg">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onConfirm}
                        className="bg-third p-4 rounded-xl items-center justify-center mt-8"
                    >
                        <Text className="text-secondary font-bold text-lg">Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
