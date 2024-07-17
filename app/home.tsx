import { View, Text, StyleSheet, Pressable } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { signOut } from '@firebase/auth'
import { useRouter } from 'expo-router'
import { DbContext } from '@/contexts/DbContext'
import { collection, addDoc } from "firebase/firestore"
import { useNavigation } from 'expo-router'

export default function Home( props:any ) {
    const auth = useContext( AuthContext )
    const db = useContext( DbContext )
    const router = useRouter()
    const navigation = useNavigation()
    // showing the header via setOptions()
    //navigation.setOptions({ headerShown: true })
    useEffect( () => {
        navigation.setOptions({ headerShown: true })
    }, [navigation])

    const SignOutUser = () => {
        signOut( auth )
        .then( () => {
            router.replace('/')
        } )
        .catch( ( error ) => {
            console.log( error.code, error.message )
        } )
    }

    const addData = async () => {
        const data = {
            time: new Date().getTime(),
            number: Math.floor(Math.random() * 100)
        }
        const path = `users/${ auth.currentUser.uid }/items`
        const docRef = await addDoc( collection( db, path), data )
        console.log( docRef.id )
    }

    return(
        <View>
            <Text>Home</Text>
            <Pressable onPress={ () => SignOutUser() }>
                <Text>Sign Out</Text>
            </Pressable>
            <Pressable style={ styles.addButton } onPress={ () => addData() } >
                <Text style={ styles.addButtonText }>Add data</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#333333",
        padding: 8,
        alignSelf: "center",
        width: 200,
        borderRadius: 5,
    },
    addButtonText: {
        color: "#eeeeee",
        textAlign: "center",
    }
})
