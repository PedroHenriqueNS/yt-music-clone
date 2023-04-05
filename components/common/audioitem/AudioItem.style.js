import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {},
    audioContainer: {
        flex: 1,
        display: "flex",

        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,

        alignItems: "center",

        flexDirection: "row"
    },
    musicLogo: {
        width: 50,
        height: 50,
        borderRadius: 2,

        marginRight: 10,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#ddd",
    },
    letterLogo: {
        fontSize: 20,
        fontFamily: "DMBold",
        fontWeight: "900",
        color: "#000"
    },
    textContainer: {},
    musicTitle: {
        fontSize: 14,
        fontFamily: 'DMMedium',
        color: '#fff'
    },
    musicDescription: {
        fontSize: 13,
        fontFamily: 'DMRegular',
        color: '#ddd'
    }
})

export default styles