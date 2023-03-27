import { Text, View } from 'react-native'
import styles from './musicas.style'

import { AudioContext } from '../../context/audioProvider'

const Musicas = () => {

    const audioFiles = useContext(AudioContext)

    const renderMusicCards = () => {}

    return (
        <View>
            <Text style={{ color: '#fff' }}>// TODO: "Adicionados recentemente"</Text>
        </View>
    )
}

export default Musicas