import { Dimensions, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { useContext, useEffect, useState } from 'react';

import styles from './musicas.style'

import { AudioContext } from '../../context/audioProvider'
import AudioItem from '../../common/audioitem/AudioItem';
import { AudioControllerContext } from '../../context/AudioController';

import MusicInfo from 'expo-music-info';

import { storeData, getData } from '../../AsyncStorage/AsyncStorage';

const Musicas = () => {

    const audiosContext = useContext(AudioContext)
    const AudioController = useContext(AudioControllerContext)
    const handleSingleAudio = AudioController.handleSingleAudio_GeneralPress

    const [ShowCard, setShowCard] = useState(true)
    const [Info, setInfo] = useState()

    // useEffect(() => {
        // if (audiosContext.SongsFindFinished) {
        //     checkMusicInfo()
        // }
    // }, [audiosContext.SongsFindFinished])

    const checkMusicInfo = async () => {
        let musicInfo = await getData("MusicInfo")

        if (musicInfo !== null) {

            setInfo(musicInfo)
            setShowCard(true)

        } else {
            for (let i = 0; i < audiosContext.AudioFiles.length; i++) {
                let info = await getMusicInfo(audiosContext.AudioFiles[i])
                musicInfo.push(info)
            }

            storeData("MusicInfo", musicInfo)
            setInfo(musicInfo)
            
            setShowCard(true)
        }
    }

    const getMusicInfo = async (audio) => {
        let metadata = await MusicInfo.getMusicInfoAsync(audio.uri, {
            title: true,
            artist: true,
            album: true,
            genre: true,
            picture: false
        })

        return {
            id: audio.id,
            metadata: metadata
        }
    }

    if (!ShowCard) return <ActivityIndicator />

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', marginBottom: 15 }}>// TODO: "Adicionados recentemente"</Text>
            {/* <ScrollView style={styles.container}> */}
            <AudioContext.Consumer>
                {({ AudioFiles }) => {
                    return (
                        <FlashList
                            data={AudioFiles}
                            renderItem={({ item }) => <AudioItem audio={item} audioInfos={Info} onAudioPress={() => handleSingleAudio(item)} />}
                            estimatedItemSize={AudioFiles.length}
                        />
                    )
                }}
            </AudioContext.Consumer>
            {/* </ScrollView> */}
        </View>
    )
}

export default Musicas