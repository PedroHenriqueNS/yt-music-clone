import { TouchableOpacity, View, Text } from "react-native"
import styles from './AudioItem.style'


const AudioItem = ({ audio, onAudioPress }) => {


    return (
        <TouchableOpacity style={styles.audioContainer} onPress={onAudioPress}>
            <View
                style={styles.musicLogo}
            // source={{ uri: thumbnailUri}}
            // onLayout={() => getMusicInfo(audio.uri)}
            // resizeMode="contain"
            // progressiveRenderingEnabled
            >
                <Text style={styles.letterLogo}>{audio.filename.substring(0, 2)}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.musicTitle}>{audio.filename}</Text>
                {/* {getMusicInfo(audio.uri)} */}
                <Text style={styles.musicDescription}>Artista • {Math.floor(audio.duration / 60)}:{Math.floor(audio.duration % 60)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AudioItem