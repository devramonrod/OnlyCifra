import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-reanimated';
import '../global.css';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CredentialsProvider } from '@/context/CredentialsContext';
import { PermissionProvider } from '@/context/PermissionContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { theme } from '@/libs/utils/paperThemer';
import { StringUtils } from '@/libs/utils/StringUtils';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const { user, loading } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;
        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('./(auth)/index');
        }

        if (user && inAuthGroup) {
            router.replace('./(tabs)/menu');
        }
    }, [user, segments, loading]);

    function getDynamicTabOptions({ route }: { route: any }) {
        const routeName = route?.name ?? 'index';

        let titlePage = StringUtils.EMPTY;

        switch (routeName) {
            case 'songsList':
                titlePage = 'Biblioteca';
                break;
            case 'playListTeam':
                titlePage = 'Playlist';
                break;
            default:
                titlePage = 'Home';
                break;
        }
        return { title: titlePage };
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
                <AuthProvider>
                    <CredentialsProvider>
                        <PermissionProvider>
                            <PaperProvider theme={theme}>
                                <Stack>

                                    <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
                                    <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
                                    <Stack.Screen name="(auth)/forgotPassWord" options={{ headerShown: false }} />

                                    <Stack.Screen name="(menu)/chordDetailsScreen" options={{ title: 'Cadastrar Cifra' }} />
                                    <Stack.Screen name="(menu)/groupScreen" options={{ title: 'Grupo' }} />
                                    <Stack.Screen name="(menu)/tutorialScreen" options={{ title: 'Tutorial' }} />
                                    <Stack.Screen name="(menu)/userProfileScreen" options={{ title: 'Perfil' }} />
                                    <Stack.Screen name="userProfile/[id]" options={{ title: 'Perfil' }} />


                                    <Stack.Screen name="(tabs)" options={getDynamicTabOptions} />
                                    <Stack.Screen name="chord/[id]" options={{ title: 'Cifra' }} />
                                    <Stack.Screen name="editChord/[id]" options={{ title: 'Editar Cifra' }} />
                                    <Stack.Screen name="favoriteList/[id]" options={{ title: 'Play' }} />
                                    <Stack.Screen name="chordFavorites/[id]" options={{ title: 'Cifra' }} />
                                </Stack>
                                <StatusBar style="dark" />
                            </PaperProvider>
                        </PermissionProvider>
                    </CredentialsProvider>
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView >
    );
}
