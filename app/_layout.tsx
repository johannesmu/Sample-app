import { SafeAreaView, StyleSheet, StatusBar } from "react-native"
import { Constants } from "expo-constants"
import { Stack } from "expo-router"

export default function Layout() {
  return (
    <SafeAreaView style={styles.appcontainer}  >
      <Stack screenOptions={{ headerShown: false }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appcontainer: {
    marginTop: StatusBar.currentHeight,
      flex: 1,
  }
})