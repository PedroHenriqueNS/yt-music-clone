import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, PanResponder, Animated, useRef, Dimensions, LayoutAnimation, TouchableOpacity } from 'react-native';

import { AudioControllerContext } from '../context/AudioController';
import MusicInfo from 'expo-music-info';

import { Ionicons, FontAwesome, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

import styles from './player.styles';

const Player = () => {

    const AudioController = useContext(AudioControllerContext)

    const animatedValue = new Animated.Value(0);

    const [musicInfoChanged, setMusicInfoChanged] = useState(false)
    const [musicInfo, setMusicInfo] = useState(null)
    const [isMaximized, setIsMaximized] = useState(true);
    const [height, setHeight] = useState();
    const panResponder =
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                if ((height - gestureState.dy) <= Dimensions.get('window').height) {
                    setHeight(height - gestureState.dy);
                }
            },
            onPanResponderRelease: () => {
                // animate()

                if (height > 200 && isMaximized === false) {
                    setIsMaximized(true);
                    return
                }
                if (height < (Dimensions.get('window').height - 200) && isMaximized === true) {
                    setIsMaximized(false);
                    setHeight(70);
                    return
                }

                animate()
                if (isMaximized) {
                    setHeight(Dimensions.get('window').height);
                } else {
                    setHeight(70)
                }
            },
        })

    useEffect(() => {
        animate()
        if (isMaximized) {
            setHeight(Dimensions.get('window').height);
        } else {
            setHeight(70)
        }
    }, [isMaximized, AudioController.MusicStatus])

    useEffect(() => {
        const getInfo = async () => {
            return await getMusicInfo(AudioController.SelectedAudio.uri)
        }
        if (AudioController.SelectedAudio !== null) {
            getInfo()
        }

    }, [AudioController.SelectedAudio])

    const getMusicInfo = async (audioUri) => {
        let metadata = await MusicInfo.getMusicInfoAsync(audioUri, {
            title: true,
            artist: true,
            album: true,
            genre: true,
            picture: true
        });

        setMusicInfo(metadata)
        setMusicInfoChanged(true)
    }

    const animate = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        Animated.timing(animatedValue, {
            toValue: height,
            duration: 1000, // Animation duration in milliseconds
            useNativeDriver: true
        }).start();
    }

    if (AudioController.MusicStatus === null) {
        return <></>
    }

    return (
        <Animated.View
            style={[
                styles.container,
                { height: height },
                isMaximized && { borderRadius: 0, backgroundColor: '#000', flexDirection: 'column', justifyContent: 'space-evenly' },
            ]}
            {...panResponder.panHandlers}
        >
            {musicInfoChanged &&
                <Image
                    // source={musicInfoChanged ? { uri: musicInfo.picture.pictureData } : '../../assets/adaptive-icon.png'}
                    source={{ uri: musicInfo.picture.pictureData }}
                    style={[styles.albumCover, { backgroundColor: '#666' }, isMaximized && { width: Dimensions.get('screen').width, height: 350, marginTop: 50, marginLeft: 0 }]}
                    resizeMode='contain'
                    progressiveRenderingEnabled={true}
                />
            }
            <View style={[styles.detailsContainer, isMaximized && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}>
                <Text style={styles.title}>{musicInfoChanged === true ? musicInfo.title : "Titulo"}</Text>
                <Text style={styles.artist}>{musicInfoChanged === true && musicInfo.artist ? musicInfo.artist : "Artista"}</Text>
            </View>

            <TouchableOpacity style={[{ zIndex: 2, }, isMaximized ? { opacity: 0, width: 0, height: 0, position: 'absolute' } : { opacity: 1, padding: 10, paddingLeft: 13, zIndex: 2 }]} onPress={() => console.log("play music")}>
                <MaterialIcons
                    style={[isMaximized && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name={AudioController.MusicStatus.isPlaying === true ? "pause" : "play-arrow"}
                    size={30}
                    color="white"

                />
            </TouchableOpacity>
            <TouchableOpacity style={[{ zIndex: 2, }, isMaximized ? { opacity: 0, width: 0, height: 0, position: 'absolute' } : { opacity: 1, padding: 10, paddingLeft: 13, zIndex: 2 }]} onPress={() => console.log("next music")}>
                <MaterialIcons
                    style={[isMaximized && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name="skip-next"
                    size={30}
                    color="white"

                />
            </TouchableOpacity>

            <View style={[styles.detailsContainerMax, isMaximized ? { opacity: 1 } : { opacity: 0, width: 0, height: 0, position: 'absolute' }]}>
                <Text style={styles.titleMax}>{musicInfoChanged === true ? musicInfo.title : "Titulo"}</Text>
                <Text style={styles.artistMax}>{musicInfoChanged === true && musicInfo.artist ? musicInfo.artist : "Artista"}</Text>
            </View>

            <View style={[styles.controllerContainer, { width: (Dimensions.get('screen').width - 30) }, isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}>
                <Ionicons
                    style={[isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name="shuffle"
                    size={25}
                    color="white"
                />
                <MaterialIcons
                    style={[isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name="skip-previous"
                    size={35}
                    color="white"
                />
                <MaterialIcons
                    style={[isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }, { backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: 15, borderRadius: 40 }]}
                    name={AudioController.MusicStatus.isPlaying === true ? "pause" : "play-arrow"}
                    size={35}
                    color="white"
                />
                <MaterialIcons
                    style={[isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name="skip-next"
                    size={35}
                    color="white"
                />
                <SimpleLineIcons
                    style={[isMaximized === false && { opacity: 0, width: 0, height: 0, position: 'absolute' }]}
                    name="loop"
                    size={25}
                    color="white"
                />
            </View>
        </Animated.View>
    );
}

export default Player