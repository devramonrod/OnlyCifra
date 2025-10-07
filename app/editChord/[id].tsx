import ChordDetails from '@/components/chordDetails/chordDetails';
import { useLocalSearchParams } from 'expo-router';

export default function EditChord() {
    const { id } = useLocalSearchParams<{ id?: string }>();

    return <ChordDetails id={id} />
}