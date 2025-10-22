import SongsList from '@/components/song/songsList';
import { StringUtils } from '@/libs/utils/StringUtils';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function HomeScreen() {
    const [searchTerm, setSearchTerm] = useState<string>(StringUtils.EMPTY);


    return (
        <View style={{ flex: 1 }}>
            <View>
                <TextInput
                    placeholder="Buscar cifra"
                    mode="outlined"
                    className="mb-2"
                    contentStyle={{ fontSize: 22 }}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            <ScrollView
                contentContainerStyle={{ padding: 10 }}
                showsVerticalScrollIndicator={false}
            >
                <SongsList searchTerm={searchTerm} />
            </ScrollView>
        </View>
    );
}
