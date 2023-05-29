import { TouchableOpacity, View, Text, Image } from "react-native"
import styles from './AudioItem.style'
import { useEffect, useState } from "react"

import MusicInfo from 'expo-music-info';
import { storeData } from '../../AsyncStorage/AsyncStorage';

const AudioItem = ({ audio, audioInfos, onAudioPress }) => {

    const [Info, setInfo] = useState({
        model: true,
        title: "aa"
    })

    // useEffect(() => {
    //     checkMusicInfo()
    // }, [])

    const checkMusicInfo = async () => {
        for (let i = 0; i < audioInfos.length; i++) {
            if (audioInfos[i].id === audio.id) {
                setInfo(audioInfos[i].metadata)
                return
            }
        }
        
        let infos = audioInfos
        let info = await getMusicInfo(audio)
        infos.push(info)

        setInfo(infos)
        storeData("MusicInfo", infos)
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

    // try {
    //     return (
    //         <TouchableOpacity style={styles.audioContainer} onPress={onAudioPress} >
    //             <View
    //                 style={styles.musicLogo}
    //             // source={{ uri: FileSystem.documentDirectory + `Music/${audio.albumId}.png` }}
    //             >
    //                 <Text style={styles.letterLogo}>{Info.title.substring(0, 2)}</Text>
    //             </View>

    //             <View style={styles.textContainer}>
    //                 <Text style={styles.musicTitle}>{Info.title}</Text>
    //                 <Text style={styles.musicDescription}>Artista • {Math.floor(audio.duration / 60)}:{Math.floor(audio.duration % 60)}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // } catch (error) {
        return (
            <TouchableOpacity style={styles.audioContainer} onPress={onAudioPress} >
                <View
                    style={styles.musicLogo}
                // source={{ uri: FileSystem.documentDirectory + `Music/${audio.albumId}.png` }}
                >
                    <Text style={styles.letterLogo}>{audio.filename.substring(0, 2)}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.musicTitle}>{audio.filename}</Text>
                    <Text style={styles.musicDescription}>Artista • {Math.floor(audio.duration / 60)}:{Math.floor(audio.duration % 60)}</Text>
                </View>
            </TouchableOpacity>
        )
    // }

    return <></>
}

export default AudioItem