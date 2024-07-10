import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Login(props: any) {
    const auth = useContext( AuthContext )
    const router = useRouter()
    const [ error, setError ] = useState('')

    const SignIn = ( email:string, password:string ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then((userCredential) => {
            router.replace('/(tabs)/')
        })
        .catch(( error) => {
            setError( error.code )
        })
    }

    return (
        <View>
            <AuthForm title="Sign in to your account" actionText="Sign in" action={ SignIn } />
            <View style={ styles.container }>
                <Text>Don't have an account?</Text>
                <Link href='/'>
                    <Text style={ styles.link }>Go to Sign up</Text>
                </Link>
            </View>
            <ErrorMessage error={error} />
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
        marginLeft: 5,
    }
})