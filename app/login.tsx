import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'

export default function Login() {
    return (
        <View>
            <Text>Sign in</Text>
            <Link href='/'>
                <Text>Go to Sign up</Text>
            </Link>
        </View>
    )    
}