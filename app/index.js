import { View, Text, SafeAreaView, ScrollView, Button } from 'react-native';
import { Stack } from 'expo-router';
import React, { useContext } from 'react';

import { COLORS, icons, images, SIZES, FONT } from '../constants'
import { Albuns, Artistas, Musicas, Playlists, NavButton, Welcome } from '../components'
import { NavButtonContext } from '../components/context';
import { useState } from 'react';
import { AudioContext } from '../components/context/audioProvider';

const tabs = [
    {
        title: 'closeButton',
        id: 'close',
        closeButton: true
    },
    {
        title: "Playlists",
        id: "playlists",
        closeButton: false
    },
    {
        title: "Musicas",
        id: "musicas",
        closeButton: false
    },
    {
        title: "Albuns",
        id: "albuns",
        closeButton: false
    },
    {
        title: "Artistas",
        id: "artistas",
        closeButton: false
    },
]

const Home = () => {

    // const router = useRouter();
    const [ActualTab, setActualTab] = useState(null);
    const [tabButtons, setTabButtons] = useState(tabs.filter(tab => tab.id !== 'close'))

    const [tabSelected, setTabSelected] = useState(false)

    // Audio Provider, Every page that contains music details needs to have
    // const audioFiles = useContext(AudioContext)


    const changeNavButtons = (tabx) => {
        if (ActualTab !== null) {

            //Show everything that is not a close button
            setActualTab(null)
            setTabButtons(tabs.filter(tab => tab.id !== 'close'))
        } else {

            // Set the selected tab
            setActualTab(tabx)

            // Add the close and the selected tab to the navigation
            let close = {
                title: 'closeButton',
                id: 'close',
                closeButton: true
            }

            var tabsToAdd = []
            tabsToAdd.push(close)
            tabsToAdd.push(tabx)

            setTabButtons(tabsToAdd)
        }

        // Pressed Button Controller
        if (tabSelected === false) {
            setTabSelected(true)
        } else {
            setTabSelected(false)
        }
    }

    const renderNavButtons = () => {

        return (
            tabButtons.map((tab, i) => (
                <NavButtonContext.Provider value={changeNavButtons} key={i}>
                    <NavButton
                        pageName={tab.title}
                        isPressed={tabSelected}
                        item={tab}
                        isCloserButton={tab.closeButton}
                    />
                </NavButtonContext.Provider>
            ))
        )
    }

    const renderPage = () => {
        if (validateActualTab()) {

            if (ActualTab.id === 'playlists') return (<Playlists />)
            if (ActualTab.id === 'musicas') return (<Musicas />)
            if (ActualTab.id === 'albuns') return (<Albuns />)
            if (ActualTab.id === 'artistas') return (<Artistas />)

        } else { return (<Text style={{ color: '#fff' }}>HOME</Text>) }
    }

    const validateActualTab = () => {
        if (ActualTab === null) return false
        if (ActualTab === undefined) return false

        return true
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>

            {/* HEADER */}
            <Stack.Screen
                options={{
                    headerStyle: { flex: 1, backgroundColor: '#000', padding: 30 },
                    headerShadowVisible: false,

                    headerTitle: "Biblioteca",
                    headerTitleStyle: { color: '#fff', fontFamily: 'DMBold' },

                    // headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension='70%' />)
                }}
            />

            {/* BODY */}
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium,
                    paddingEnd: 0
                }}
            >
                {/* NAV BUTTONS */}
                <ScrollView
                    style={{
                        flexGrow: 0,
                        marginBottom: SIZES.large,
                        flexDirection: 'row',
                        columnGap: SIZES.small / 1.5
                    }}

                    scrollEnabled={true}
                    horizontal={true}
                    refreshing={true}
                >
                    {renderNavButtons()}
                </ScrollView>


                {renderPage()}

                {/* <Button style={{ padding: 10 }}
                    title="Oi"
                    color="#444"
                    accessibilityLabel='Oi'
                >
                    <Text style={{color: '#fff'}}>OI</Text>
                </Button> */}

            </View>
            {/* <Welcome /> */}
        </SafeAreaView>
    )
}

export default Home