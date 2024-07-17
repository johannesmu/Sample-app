import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { DbContext } from '@/contexts/DbContext'
import { collection, addDoc, getDocs, query } from "firebase/firestore"
import { useNavigation } from 'expo-router'
import { SignOutButton } from '@/components/SignOutButton'


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
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Fourth Item',
      },
]

export default function Home( props:any ) {
    const auth = useContext( AuthContext )
    const db = useContext( DbContext )
    const router = useRouter()
    const navigation = useNavigation()

    const [data, setData ] = useState([])


    // showing the header via setOptions()
    useEffect( () => {
        navigation.setOptions({ 
            headerShown: true,
            headerRight: () => <SignOutButton /> 
        })
    }, [navigation])

    useEffect( () => {
        fetchData()
    }, [data])


    const addData = async () => {
        const data = {
            time: new Date().getTime(),
            number: Math.floor(Math.random() * 100)
        }
        const authUser = auth.currentUser.uid
        console.log( authUser)
        const path = `users/${ authUser }/items`
        const docRef = await addDoc( collection( db, path), data )
    }

    const fetchData = async () => {
        console.log("fetching...")
        const path = `users/${auth.currentUser.uid }/items`
        const qs = await getDocs( collection(db, path ) )
        let items:any = []
        qs.forEach( (doc ) => {
            let item = doc.data()
            item.id = doc.id
            items.push( item )
        })
        setData( items )
    }

    const ListItem = ( props:any ) => {
        return (
            <View style={ styles.listItem }>
                <Text>{ props.title }</Text>
                <Text>{ props.id }</Text>
            </View>
        )
    }

    const Separator = () => {
        return (
            <View style={styles.separator}></View>
        )
    }

    const renderItem = ( {item}:any ) => {
        return (
            <ListItem title={item.time} id={item.id} />
        )
    }

    return(
        <View>
            <Pressable style={ styles.addButton } onPress={ () => addData() } >
                <Text style={ styles.addButtonText }>Add data</Text>
            </Pressable>
            <FlatList 
                data={data} 
                renderItem={ renderItem } 
                keyExtractor={ item => item.id }
                ItemSeparatorComponent={ Separator }
            />
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
    },
    listItem: {
        backgroundColor: "#CCCCCC",
        padding: 10,
        flexDirection: "row",
    },
    separator: {
        backgroundColor:"#EEEEEE",
        height: 3,
    }
})
