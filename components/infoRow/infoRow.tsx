import { Text, View } from "react-native";

type InfoRowProps = {
    icon: React.ReactNode;
    label: string;
    value?: string;
};

export default function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <View className="flex-row items-center p-4 border-b border-gray-700">
            {icon}
            <View className="ml-4">
                <Text className="text-sm text-gray-400">{label}</Text>
                <Text className="text-base text-secondary font-semibold">{value || '-'}</Text>
            </View>
        </View>
    )
}