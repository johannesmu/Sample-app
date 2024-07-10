import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { signOut } from '@firebase/auth'
import { useRouter } from 'expo-router'
import { DbContext } from '@/contexts/DbContext'
import { collection, addDoc } from "firebase/firestore"
import { useNavigation } from 'expo-router'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
]

export default function Home( props:any ) {
    const auth = useContext( AuthContext )
    const db = useContext( DbContext )
    const router = useRouter()
    const navigation = useNavigation()
    // showing the header via setOptions()
    navigation.setOptions({ headerShown: true })

    interface Iitem  {
        id:string,
        title:string
    }

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

   

    const renderItem = ( {item}:any ) => {
        return (
            <View><Text>{ item.title }</Text></View>
        )
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
            <FlatList data={DATA} renderItem={ renderItem } keyExtractor={ item => item.id }/>
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
