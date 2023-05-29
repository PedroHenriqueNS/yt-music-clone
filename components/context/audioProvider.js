import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { MusicInfo } from 'expo-music-info';

// -------------------CREATE-CONTEXT----------------------------

export const AudioContext = React.createContext()

// -----------------PROVIDES-AUDIO-FILES------------------------

export const AudioProvider = (props) => {

    const [AudioFiles, setAudioFiles] = useState([])
    const [PermissionError, setPermissionError] = useState(false)
    const [SongsFindFinished, setSongsFindFinished] = useState(false)

    useEffect(() => {
        getPermissions()
    }, [])

    const permissionAlert = () => {
        Alert.alert('Permission required', 'This app needs to read audio files!', [{
            text: "I am ready",
            onPress: () => getPermissions()
        }, {
            text: "Cancel",
            onPress: () => permissionAlert()
        }])
    }

    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio,
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio,
            first: media.totalCount,
        })

        if (media !== undefined) {
            setAudioFiles(media.assets)
            setSongsFindFinished(true)
        }

        // if (media.totalCount > 0) {
        //     // iterate through the array of assets
        //     for (let i = 0; i < media.assets.length; i++) {
        //         const asset = media.assets[i];
        //         console.log(`Asset ${i}:`);
        //         console.log(`ID: ${asset.id}`);
        //         console.log(`Filename: ${asset.filename}`);
        //         console.log(`Duration: ${asset.duration}`);
        //         console.log(`URI: ${asset.uri}`);
        //         console.log(`--------------------------`);
        //     }
        // }
    }

    const getPermissions = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if (permission.granted) {
            // TODO: Get al the audio files
            getAudioFiles()
        }

        if (!permission.canAskAgain && !permission.granted) {
            setPermissionError(true)
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()
            if (status === "denied" && canAskAgain) {
                // display alert that user must allow this permission to work this app

                permissionAlert()
            }

            if (status === "denied" && !canAskAgain) {
                // display alert error

                setPermissionError(true)
            }

            if (status === "granted") {
                // Get al the audio files
                getAudioFiles()
            }
        }
    }

    if (PermissionError) {
        return (
            <View style={styles.container}>
                <Text style={styles.textAlertError}>Aparentemente você não aceitou a permição para o acesso do Armazenamento</Text>
                <Button onPress={() => getPermissions()}>Aceitar Permissões</Button>
            </View>
        )
    }

    return (
        <AudioContext.Provider value={{ AudioFiles, SongsFindFinished }}>
            {AudioFiles !== undefined ? props.children : <View />}
            {/* {props.children} */}
        </AudioContext.Provider>
    )

}

// Audio file details example:

// {
//     "albumId": "82896267",
//     "creationTime": 0,
//     "duration": 191.184,
//     "filename": "Adam Jensen - Street Fight(MP3_160K).mp3",
//     "height": 0,
//     "id": "41600",
//     "mediaType": "audio",
//     "modificationTime": 1553176765000,
//     "uri": "file:///storage/emulated/0/Music/Adam Jensen - Street Fight(MP3_160K).mp3",
//     "width": 0
// }

// {
//     "albumId": "-1451648891",
//     "creationTime": 0,
//     "duration": 8.58,
//     "filename": "AUD-20230210-WA0026.opus",
//     "height": 0,
//     "id": "90952",
//     "mediaType": "audio",
//     "modificationTime": 1676068101000,
//     "uri": "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Audio/AUD-20230210-WA0026.opus",
//     "width": 0
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textAlertError: {
        fontSize: 25,
        fontFamily: 'DMRegular',
        textAlign: 'center',
        color: '#fc1d1e' // RED
    }
})