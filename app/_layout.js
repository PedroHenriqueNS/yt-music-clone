import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AudioProvider } from "../components/context/audioProvider";
import { AudioController } from "../components/context/AudioController";
import Player from "../components/player/Player";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync()

const Layout = () => {

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

    return (
        <AudioProvider>
            <AudioController>
                    <StatusBar style="light" />
                    <Stack onLayout={onLayoutRootView} />
                    <Player />
            </AudioController>
        </AudioProvider>
    )
}

export default Layout;