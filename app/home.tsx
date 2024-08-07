import { View, Text, StyleSheet, Pressable, FlatList, Modal, TextInput } from 'react-native'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter, Link } from 'expo-router'
import { DbContext } from '@/contexts/DbContext'
import { collection, addDoc, where, query, onSnapshot } from "firebase/firestore"
import { useNavigation } from 'expo-router'
import { SignOutButton } from '@/components/SignOutButton'
import { Ionicons } from '@expo/vector-icons'

export default function Home(props: any) {
    const auth = useContext(AuthContext)
    const db = useContext(DbContext)
    const router = useRouter()
    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')

    // showing the header via setOptions()
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => <SignOutButton />
        })
    }, [navigation])

    useEffect(() => {
        if (loaded == false) {
            fetchData()
            setLoaded(true)
        }
    }, [data, auth])

    useEffect( () => {
        setTitle('')
        setNumber('')
    }, [modalVisible])


    const addData = async () => {
        const data = {
            time: new Date().getTime(),
            number: parseInt(number),
            title: title
        }
        const authUser = auth.currentUser.uid
        const path = `users/${authUser}/items`
        const docRef = await addDoc(collection(db, path), data)
    }

    const fetchData = async () => {
        const path = `users/${auth.currentUser.uid}/items`
        const q = query(collection(db, path))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let items: any = []
            querySnapshot.forEach((doc) => {
                let item = doc.data()
                item.id = doc.id
                items.push(item)
            })
            setData(items)
        })

    }

    const ListItem = (props: any) => {
        return (
            <View style={styles.listItem}>
                <Text>{props.title}</Text>
                <Link href={{ pathname: "/detail", params: { id: props.id } }}>
                    <Text>Detail</Text>
                </Link>
            </View>
        )
    }

    const Separator = () => {
        return (
            <View style={styles.separator}></View>
        )
    }

    const renderItem = ({ item }: any) => {
        return (
            <ListItem title={item.title} id={item.id} />
        )
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.addButton}
                //onPress={() => addData()} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>
                    <Ionicons name="add" size={24} />
                </Text>
            </Pressable>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                ItemSeparatorComponent={Separator}
                style={styles.list}
            />
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text>Enter title</Text>
                        <TextInput style={styles.modalInput} value={title} onChangeText={(val) => setTitle(val)} />
                        <Text>Enter Number</Text>
                        <TextInput style={styles.modalInput} inputMode="numeric" value={number} onChangeText={(val) => setNumber(val)} />
                        <Pressable
                            style={styles.addItemButton}
                            onPress={() => {
                                addData()
                                setModalVisible(false)
                            }
                            }>
                            <Text style={styles.addItemText}>Add Item</Text>
                        </Pressable>
                    </View>
                    <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        backgroundColor: "#333333",
        padding: 8,
        alignSelf: "center",
        width: 40,
        height: 40,
        borderRadius: 5,
        position: "absolute",
        right: 20,
        bottom: 20,
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center"
    },
    addButtonText: {
        color: "#eeeeee",
        textAlign: "center",
        fontSize: 30,
    },
    listItem: {
        backgroundColor: "#CCCCCC",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    separator: {
        backgroundColor: "#EEEEEE",
        height: 3,
    },
    list: {
        flex: 1,
    },
    modal: {
        padding: 20,
        // backgroundColor: "hsla(0, 0%, 0%, 0.4)",
        flex: 1,
    },
    modalClose: {
        position: "absolute",
        right: 20,
        top: 20,
    },
    modalContainer: {
        flex: 1,
        marginVertical: 50
    },
    addItemButton: {
        backgroundColor: "#333333",
        padding: 8,
        alignSelf: "center",
    },
    addItemText: {
        color: "#CCCCCC",
        textAlign: "center",
    },
    modalInput: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        padding: 8,
        marginBottom: 20,
    },
})
