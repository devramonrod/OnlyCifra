import { Chord } from "@/libs/domain/Chord/Chord"
import { PlayList } from "@/libs/domain/PlayList/PlayList"
import { create } from 'zustand'

type dataStore = {
    structChords: Chord[],
    setStructChors: (data: Chord[]) => void,

    chord: Chord | null,
    setChord: (data: Chord | null) => void,

    playList: PlayList[],
    setPlayList: (data: PlayList[]) => void,

    isFavorite: boolean,
    setIsFavorite: (data: boolean) => void,
}

export const useDataStore = create<dataStore>((set) => ({
    structChords: [],
    setStructChors: (data) => set({ structChords: data }),

    chord: null,
    setChord: (data) => set({ chord: data }),

    playList: [],
    setPlayList: (data) => set({ playList: data }),

    isFavorite: false,
    setIsFavorite: (data) => set({ isFavorite: data }),
}))