import React, { useEffect, useState } from 'react';

import { MusicInfo } from 'expo-music-info';

// -------------------CREATE-CONTEXT----------------------------

export const SongInfoContext = React.createContext()

// -----------------PROVIDES-AUDIO-INFOS------------------------

export const SongInfoProvider = (props) => {

    const [LoadedData, setLoadedData] = useState(false)
    const [SongInfoData, setSongInfoData] = useState()

    const getMusicInfo = async (audioUri) => {
        let metadata = await MusicInfo.getMusicInfoAsync("file:///storage/emulated/0/Download/Sting - What Could Have Been _ Arcane League of Legends _ Riot Games Music(MP3_320K).mp3", {
            title: true,
            artist: true,
            album: true,
            genre: true,
            picture: false
        });

        console.log(metadata)

        setLoadedData(true)
        setSongInfoData(metadata)
    }
    
    return (
        <SongInfoContext.Provider value={{ LoadedData, setLoadedData, SongInfoData, getMusicInfo }}>
            {props.children}
        </SongInfoContext.Provider>
    )
}