import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    Text, View, TouchableOpacity, Platform,
    UIManager,
    LayoutAnimation,
} from "react-native";
import { NavButtonContext } from "../../context";
import { AntDesign } from '@expo/vector-icons';

import styles from './navButton.style'

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NavButton = ({ pageName, isPressed, item, isCloserButton }) => {

    const [btnPressed, setBtnPressed] = useState(isPressed || false)

    const changeNavButton = React.useContext(NavButtonContext)

    if (isCloserButton === false) {

        const handlePress = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                // () => { setAnimationComplete(true) },
                // () => console.log("Animation failed")
            )

            // setBtnPressed(!btnPressed)

        }
        const handlePressOut = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                // () => { setAnimationComplete(true) },
                // () => console.log("Animation failed")
            )

            changeNavButton(item)
        }

        return (
            <View>
                <TouchableOpacity
                    style={isPressed === false ? styles.btnContainer : styles.btnContainerPressed}
                    onPress={handlePress}
                    onPressOut={handlePressOut}
                >
                    <Text
                        style={isPressed === false ? styles.text : styles.textPressed}
                    >{pageName}</Text>
                </TouchableOpacity>
            </View>
        )
    } else {

        const handlePress = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                // () => { setAnimationComplete(true) },
                // () => console.log("Animation failed")
            )

            // setBtnPressed(!btnPressed)

        }

        const handlePressOut = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                // () => { setAnimationComplete(true) },
                // () => console.log("Animation failed")
            )

            changeNavButton(item)
        }

        return (
            <View>
                <TouchableOpacity
                    style={isPressed === false ? styles.btnContainer : styles.btnContainerPressed}
                    onPress={handlePress}
                    onPressOut={handlePressOut}
                >
                    <Text style={isPressed === false ? styles.closerText : styles.closerTextPressed}>
                        <AntDesign name="close" size={20} color="black" />
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavButton