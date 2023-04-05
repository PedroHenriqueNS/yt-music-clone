import react, { useEffect } from "react";
import { Audio } from 'expo-av';
import { useState } from 'react';

export const AudioControllerContext = react.createContext()

export const AudioController = (props) => {

    const log = () => console.log('teste')

    const [MusicStatus, setMusicStatus] = useState(null)
    const [Playback] = useState(new Audio.Sound())
    const [SelectedAudio, setSelectedAudio] = useState(null)

    useEffect(() => {
        Playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
    }, [])

    const _onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state

            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop.
                const status = Playback.stopAsync()
                setMusicStatus(status)
            }

            if (playbackStatus.didJustFinish && playbackStatus.isLooping) {
                // The player has just finished playing and will play next music.

                const status = Playback.unloadAsync()
                setMusicStatus(status)

                // TODO: Call next music
                // const status = Playback.
            }

            //   ... // etc
        }
    };

    // STATUS EXAMPLE
    // {
    //     "androidImplementation": "SimpleExoPlayer", 
    //     "audioPan": 0, 
    //     "didJustFinish": false, 
    //     "durationMillis": 180432, 
    //     "isBuffering": true, 
    //     "isLoaded": true, 
    //     "isLooping": false, 
    //     "isMuted": false, 
    //     "isPlaying": true, 
    //     "playableDurationMillis": 22176, 
    //     "positionMillis": 0, 
    //     "progressUpdateIntervalMillis": 500, 
    //     "rate": 1, 
    //     "shouldCorrectPitch": false, 
    //     "shouldPlay": true, 
    //     "uri": "/storage/emulated/0/Music/Adam Jensen - Hi(MP3_320K).mp3", 
    //     "volume": 1
    // }

    const handleSingleAudio_GeneralPress = async (audio) => {

        // Play audio for the first time
        if (MusicStatus === null) {
            const status = await Playback.loadAsync(
                { uri: audio.uri },
                { shouldPlay: true },
                { rate: 1.0 }
            )
            setMusicStatus(status)
            setSelectedAudio(audio)
        }
        // TODO: The audio won't stop here, it's just to understand
        // Pause audio 
        if (MusicStatus.isLoaded && MusicStatus.isPlaying) {
            const status = await Playback.setStatusAsync({ shouldPlay: false })
            setMusicStatus(status)
        }

        // Resume audio
        if (MusicStatus.isLoaded && !MusicStatus.isPlaying && SelectedAudio.id === audio.id) {
            const status = await Playback.playAsync()
            setMusicStatus(status)
        }

        // Change audio and Play
        if (MusicStatus.isLoaded && SelectedAudio.id !== audio.id) {
            await Playback.unLoadAsync()
            const status = await Playback.loadAsync(
                { uri: audio.uri },
                { shouldPlay: true }
            )
            setMusicStatus(status)
        }
    }

    return (
        <AudioControllerContext.Provider
            value={{
                handleSingleAudio_GeneralPress,
                MusicStatus,
                SelectedAudio,
                log
            }}>
            {props.children}
        </AudioControllerContext.Provider>
    )
}

// const _onPlaybackStatusUpdate = playbackStatus => {
//     if (!playbackStatus.isLoaded) {
//         // Update your UI for the unloaded state
//         if (playbackStatus.error) {
//             console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
//             // Send Expo team the error on Slack or the forums so we can help you debug!
//         }
//     } else {
//         // Update your UI for the loaded state

//         if (playbackStatus.isPlaying) {
//             // Update your UI for the playing state
//         } else {
//             // Update your UI for the paused state
//         }

//         if (playbackStatus.isBuffering) {
//             // Update your UI for the buffering state
//         }

//         if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
//             // The player has just finished playing and will stop. Maybe you want to play something else?
//         }

//         //   ... // etc
//     }
// };

//   ... // Load the playbackObject and obtain the reference.
// playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);