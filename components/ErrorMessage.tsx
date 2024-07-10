import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

export function ErrorMessage( props:any ) {
    const[ message, setMessage ] = useState('')

    useEffect( () => {
        if( props.error ) {
            const msg:string = props.error
            const slashIndex:number = props.error.indexOf('/')
            setMessage( msg.slice( slashIndex + 1, msg.length ).replaceAll('-', ' ') )
        }
        else {
            setMessage('')
        }
    }, [ props.error ] )

    if( message ) {
        return(
            <View style={ styles.alert }>
                <Text style={ styles.text } >{ message }</Text>
            </View>
        )
    }
    else {
        return null
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    alert: {
        padding: 5,
        backgroundColor: '#ffc9c9',
        width: 250,
        alignSelf: 'center',
        borderRadius: 10,
    }
})