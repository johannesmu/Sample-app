import { Text, TextInput, StyleSheet, View, Pressable } from 'react-native'

export function AuthForm ( props:any ) {
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>{ props.title }</Text>
            <Text>Email</Text>
            <TextInput style={ styles.input } />
            <Text>Password</Text>
            <TextInput style={ styles.input }  secureTextEntry={ true }/>
            <Pressable onPress={ () => props.action } style={ styles.button }>
                <Text style={ styles.buttonText } >{ props.actionText }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 100,
        padding: 20,
        backgroundColor: "#bbbbbb",
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        textAlign: "center"
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#efefef",
        borderRadius: 6,
    },
    button: {
        backgroundColor: "#333333",
        borderRadius: 4,
    },
    buttonText: {
        color: "#efefef",
        textAlign: "center",
        padding: 8,
    }
})