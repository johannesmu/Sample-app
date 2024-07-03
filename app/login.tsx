import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Login(props: any) {
    const auth = useContext(AuthContext)
    const router = useRouter()
    const [authError, setAuthError] = useState(null)

    return (
        <View>
            <AuthForm title="Sign in to your account" actionText="Sign in" />
            <View style={ styles.container }>
                <Text>Don't have an account?</Text>
                <Link href='/'>
                    <Text style={ styles.link }>Go to Sign up</Text>
                </Link>
            </View>
            <ErrorMessage error={authError} />
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
        marginLeft: 10,
    }
})