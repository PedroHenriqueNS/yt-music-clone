import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 1
    },
    maximizedContainer: {
        borderRadius: 0,
    },
    albumCover: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15,
    },
    detailsContainerMax: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    artist: {
        color: 'white',
        fontSize: 12,
    },
    titleMax: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 24,
    },
    artistMax: {
        color: 'white',
        fontSize: 14,
        color: '#888'
    },
    controllerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})

export default styles