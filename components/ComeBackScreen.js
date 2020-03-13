import React,{ useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default function ComeBackScreen() {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        let today = new Date().getDay()
        if(today >= 1 && today < 5) {
            setMsg('Please come back at 6:00 a.m. tomorrow morning.')
        }else {
            setMsg('Please come back at 6:00 a.m. on Monday morning.')
        }
    }, [])

    return (
        <View>
            <Text style={styles.text}>Thank you, your message was registered.</Text>
            <Text style={styles.text2}>{msg}</Text>
        </View>
    )
}

const styles =  StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 3
    },
    text2: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30
    },
})