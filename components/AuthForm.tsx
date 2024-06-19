import { Text, TextInput, StyleSheet, View } from 'react-native'

export function AuthForm ( props:any ) {
    return (
        <View>
            <Text style={ styles.title }>{ props.title }</Text>
            <Text>Email</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput secureTextEntry={ true }/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: "center"
    },
})