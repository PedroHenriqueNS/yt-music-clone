import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    btnContainer: {
        borderWidth: 1,
        borderRadius: SIZES.small / 1.5,
        borderStyle: 'solid',
        borderColor: '#232323',

        marginRight: SIZES.small / 1.5,

        backgroundColor: '#1a1a1a',

        justifyContent: "center",
        alignItems: "center",
    },
    btnContainerPressed: {
        borderWidth: 1,
        borderRadius: SIZES.small / 1.5,
        borderStyle: 'solid',
        borderColor: '#fff',

        marginRight: SIZES.small / 1.5,

        backgroundColor: '#fff',

        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: COLORS.white,
        fontFamily: 'DMMedium',
        fontSize: SIZES.medium,

        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    textPressed: {
        color: COLORS.black,
        fontFamily: 'DMMedium',
        fontSize: SIZES.medium,

        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    closerText: {
        color: COLORS.white,
        fontFamily: 'DMMedium',
        fontSize: SIZES.medium,

        padding: 10,
    },
    closerTextPressed: {
        color: COLORS.black,
        fontFamily: 'DMMedium',
        fontSize: SIZES.medium,

        padding: 10,
    }
})

export default styles