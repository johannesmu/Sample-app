import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export function ErrorMessage(props: any) {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (props.error) {
            setError( props.error )
            // get the error message
            const errorMsg = props.error.message
            // get where the '/' is in the string
            const errorMsgIndex = errorMsg.indexOf('/')
            // extract error message text
            const errorMsgText = errorMsg.slice( errorMsgIndex + 1, errorMsg.length - 2 )
            setMessage( errorMsgText.replaceAll('-', ' ') )
        }
    }, [props.error])

    if (error) {
        return (
            <View>
                <Text style={ styles.text }>{message}</Text>
            </View>
        )
    }
    else {
        return null
    }

}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    }
})