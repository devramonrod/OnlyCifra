import Profile from "@/components/profile/profile";
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
    const { id } = useLocalSearchParams<{ id?: string }>();

    return (
        <Profile userId={id} />
    );
}