import { StyleSheet } from "react-native"

const baseStyles = StyleSheet.create({
    span: {
        fontSize: 11,
        fontWeight: '400'
    },
    h1: {
        fontSize: 40,
        fontWeight: '700'
    },
    h2: {
        fontSize: 30,
        fontWeight: '700'
    },
    p: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        width: '90%',
        marginLeft: '5%',
    },
    line: {
        backgroundColor: 'black',
        height: 1,
        flex: 1,
        alignSelf: 'center'
    },
    dateTime: {
        fontSize: 15,
        color: '#9BA4B0'
    },
    avatar: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        borderRadius: '50%',
        marginTop: 5

    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
    },
    loaddingContainer:{
        flex: 1,
        justifyContent: "center"
    }
})


export { baseStyles }