import { Text, View, Pressable } from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { useState, useEffect, useContext } from 'react'
import { DbContext } from '@/contexts/DbContext'
import { AuthContext } from '@/contexts/AuthContext'
import { doc, getDoc, deleteDoc } from '@firebase/firestore'

export default function Detail(props: any) {
    const db = useContext(DbContext)
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const id:string  = params.id as string

    interface Idoc {
        number: number,
        title: string,
        time: number,
    }
    const [document, setDocument] = useState<Idoc>()

    useEffect(() => {
        navigation.setOptions({ headerShown: true })
        getDocument(id)
        console.log( params.id )
    }, [navigation])

    const getDocument = async (documentId: string) => {
        const docRef = doc(db, `users/${auth.currentUser.uid}/items`, id )
        const docSnap = await getDoc(docRef)
        setDocument(docSnap.data() as Idoc)
    }

    const deleteDocument = async ( documentId: string ) => {
        const docRef = doc(db, `users/${auth.currentUser.uid}/items`, id)
        const delDoc = await deleteDoc( docRef )
        navigation.goBack()
    }

    if (document) {
        return (
            <View>
                <Text>Item Detail for {id}</Text>
                <Text>Title: {document.title}</Text>
                <Text>Time: {document.time }</Text>
                <Pressable onPress={ () => deleteDocument(id) }>
                    <Text>Delete</Text>
                </Pressable>
            </View>
        )
    }
    else {
        return null
    }
}
