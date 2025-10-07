import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity } from "react-native"

type Props = {
    icon: any,
    title: string,
    subtitle: string,
    onPress: () => void,
}

export default function DashboardButton({ icon, title, subtitle, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-struct w-[150px] m-2 aspect-square flex-col justify-center items-center p-4 rounded-2xl shadow-md"
        >
            <Ionicons name={icon} size={40} color="#20f535" />
            <Text className="text-lg font-bold text-title mt-3 text-center">{title}</Text>
            <Text className="text-sm text-gray-400 text-center" numberOfLines={1}>{subtitle}</Text>
        </TouchableOpacity>
    )
}