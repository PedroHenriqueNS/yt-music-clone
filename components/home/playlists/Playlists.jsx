import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './playlists.style'
import { useState } from 'react';

const setPlaylists = async (playlists) => {
    await AsyncStorage.setItem('playlists', "teste")
}

const getPlaylists = async () => {
    let playlist = await AsyncStorage.getItem('playlists')
    return playlist
}

const Playlists = () => {

    const [Playlists, setPlaylists] = useState(getPlaylists())

    return (
        <View>
            <Text style={{ color: '#fff' }}>// TODO: "Adicionados recentemente"</Text>
            <View>
                <Text style={{ color: '#fff' }}>// TODO: "Playlists Cards"</Text>
            </View>
        </View>
    )
}

export default Playlists