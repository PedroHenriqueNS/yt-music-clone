import { Stack } from "expo-router";
import { useCallback, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AudioContext, AudioProvider } from "../components/context/audioProvider";
import { AudioController } from "../components/context/AudioController";
import Player from "../components/player/Player";
import { StatusBar } from "expo-status-bar";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { MusicInfo } from "expo-music-info";
import { Text } from "react-native";


const BACKGROUND_FETCH_THUMBNAIL = 'background-fetch-thumbnail';

var listTest = []

TaskManager.defineTask(BACKGROUND_FETCH_THUMBNAIL, async () => {
    console.log("oi")
    // listTest.push('background-fetch')
    // const audioProv = useContext(AudioContext)
    // const files = audioProv.AudioFiles

    // if (!files[0]) return

    // console.log(files[0])

    // for (let i = 0; i < files.length; i++) {
    //     let metadata = await MusicInfo.getMusicInfoAsync(files[i].uri, {
    //         title: true,
    //         artist: true,
    //         album: true,
    //         genre: true,
    //         picture: true
    //     });
    //     console.log(metadata.title)
    // }

    return BackgroundFetch.BackgroundFetchResult.NewData
})

const register_BackgroundFetchThumbnailAsync = async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_THUMBNAIL, {
        minimumInterval: 60,
        stopOnTerminate: true,
        startOnBoot: true,
    })
}

const unregister_BackgroundFetchThumbnailAsync = async () => {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_THUMBNAIL)
}

SplashScreen.preventAutoHideAsync()

const Layout = () => {

    useEffect(() => {
        register_BackgroundFetchThumbnailAsync()
    }, [])

    useEffect(() => {
        console.log(listTest)
    }, [listTest])

    const startBackgroundFetchCheck = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_THUMBNAIL);

        console.log(status)
        console.log(isRegistered)
    };

    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    startBackgroundFetchCheck()

    return (
        <AudioProvider>
            <AudioController>
                <StatusBar style="light" />
                <Stack onLayout={onLayoutRootView} />
                <Text>{listTest}</Text>
                <Player />
            </AudioController>
        </AudioProvider>
    )
}

export default Layout;