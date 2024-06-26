import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'

export default function Login(props: any) {
    return (
        <View>
            <AuthForm title="Sign in to your account" actionText="Sign in" />
            <View style={ styles.container }>
                <Text>Don't have an account?</Text>
                <Link href='/'>
                    <Text style={ styles.link } >Go to Sign up</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15,
    },
    link: {
        color: "#b8111e",
        fontWeight: 700,
    }
})