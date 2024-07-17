import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from 'expo-router'
import { AuthContext } from '@/contexts/AuthContext'
import { signOut } from '@firebase/auth'
import { useRouter } from 'expo-router'

export function SignOutButton ( props:any ) {

    const auth = useContext( AuthContext )
    const navigation = useNavigation()
    const router = useRouter()

    const SignOutUser = () => {
        signOut( auth )
        .then( () => {
            router.replace('/')
        } )
        .catch( ( error ) => {
            console.log( error.code, error.message )
        } )
    }
    return (
        <View style={ styles.button }>
            <Pressable onPress={ () => SignOutUser()}>
                <FontAwesome name="sign-out" size={24} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    }
})