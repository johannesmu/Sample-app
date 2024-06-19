import { SafeAreaView, View, Text, StyleSheet} from "react-native"

export default function Home () {
    return (
        <SafeAreaView style={ styles.container}>
            <Text>Hello</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
})