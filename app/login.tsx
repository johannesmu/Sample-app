import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword, onAuthStateChanged  } from '@firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { useNavigation } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Login(props: any) {
    const auth = useContext( AuthContext )
    const navigation = useNavigation()
    const [ error, setError ] = useState('')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // user is authenticated
            // redirect to home
            navigation.reset(
                { index: 0, routes: [ { name: "home"} ] }
            )
        }
        else {
            // user is not authenticated
        }
    })

    const SignIn = ( email:string, password:string ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then((userCredential) => {
            //router.replace('/home')
            navigation.reset(
                { index: 0, routes: [ { name: "home"} ] }
            )
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