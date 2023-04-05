import { Dimensions, Text, View, TouchableOpacity } from 'react-native'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import { useContext, useState } from 'react';

import styles from './musicas.style'

import { AudioContext } from '../../context/audioProvider'
import AudioItem from '../../common/audioitem/AudioItem';
import { AudioControllerContext } from '../../context/AudioController';

const Musicas = () => {

    const AudioController = useContext(AudioControllerContext)
    const handleSingleAudio = AudioController.handleSingleAudio_GeneralPress

    const layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.width = Dimensions.get('window').width
                dim.height = 70
                break;
            default:
                dim.width = 0
                dim.height = 0
        }
    })

    const rowRenderer = (type, audio) => {

        return (
            <AudioItem
                audio={audio}
                onAudioPress={() => handleSingleAudio(audio)}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', marginBottom: 15 }}>// TODO: "Adicionados recentemente"</Text>
            {/* <ScrollView style={styles.container}> */}
            <AudioContext.Consumer>
                {({ dataProvider }) => {
                    return (
                        <View style={{ flex: 1 }}>
                            <RecyclerListView
                                dataProvider={dataProvider}
                                layoutProvider={layoutProvider}
                                rowRenderer={rowRenderer}
                            />
                        </View>
                    )
                }}
            </AudioContext.Consumer>
            {/* </ScrollView> */}
        </View>
    )
}

export default Musicas