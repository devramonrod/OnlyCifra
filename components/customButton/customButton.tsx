import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

type Props = {
    color?: string;
    icon?: string;
    isActive?: boolean;
    handle: () => void;
}

export default function CustomButton({ color = '#620e0e96', icon = 'delete-circle-outline', handle, isActive = false }: Props) {
    return (
        <TouchableOpacity
            onPress={() => handle()}
        >
            {isActive && (
                <IconButton
                    icon={icon}
                    size={28}
                    iconColor={color}
                />
            )}
        </TouchableOpacity>
    )
}