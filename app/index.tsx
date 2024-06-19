import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'

export default function Index() {
    return (
        <View>
            <AuthForm title="Sign up for an account" />
            <Link href='/login'>
                <Text>Go to Sign in</Text>
            </Link>
        </View>
    )
}