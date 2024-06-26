import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export default function Index( props : any ) {
    const auth = useContext( AuthContext )

    const createAccount = ( email:string, password:string ) => {

    }

    return (
        <View>
            <AuthForm title="Sign up for an account" actionText="Sign up" />
            <View style={ styles.container }>
                <Text>Already have an account?</Text>
                <Link href='/login'>
                    <Text style={ styles.link } >Go to Sign in</Text>
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
