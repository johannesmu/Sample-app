import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { useRouter } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Signup(props: any) {
    const auth = useContext(AuthContext)
    const router = useRouter()
    const [authError, setAuthError] = useState(null)

    const createAccount = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // user is authenticated, route to /home
                router.replace('/home')
            })
            .catch((error) => {
                setAuthError(error)
            })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // user is authenticated
            // redirect to home
            router.replace('/home')
        }
        else {
            // user is not authenticated
        }
    })

    return (
        <View>
            <AuthForm title="Sign up for an account" actionText="Sign up" action={createAccount} />
            <View style={styles.container}>
                <Text>Already have an account?</Text>
                <Link href='/login'>
                    <Text style={styles.link} >Go to Sign in</Text>
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
