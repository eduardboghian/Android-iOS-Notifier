import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage } from 'react-native'
import axios from 'axios'
import { reload } from 'expo/build/Updates/Updates'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo'

export default function RegisterScreen() {
    const [code, setCode] = useState('')

    async function sendCode() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = status
    
        if(status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }
    
        if (finalStatus !== 'granted') {
            alert('No notification permissions!');
            return;
        }
    
        let token = await Notifications.getExpoPushTokenAsync()
        axios.post('https://notificationsserver.herokuapp.com/api/send-code', {
            code: code,
            pushToken: token
        })
        .then(async res=> {
            console.log('send-code res',res.data)
            try {
                await AsyncStorage.removeItem('WorkRulesId')
                await AsyncStorage.setItem('WorkRulesId', res.data);
                console.log('done...')
                reload()
            } catch (error) {
                alert(error)
            }    
        })
        .catch(err=> console.log(err))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text2}>Enter the four digits code here!</Text>
            <TextInput onChangeText={text=> setCode(text)} value={code} style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={ e=> sendCode() }>
                <Text style={styles.text} >Login </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    input: {
        borderBottomWidth: 2,
        width: 250,
        height: 60,
        borderBottomColor: '#777',
        marginBottom: 30,
        marginTop: 100,
        padding: 20,
        fontSize: 20,
        textAlign: "center" 
    },
    button: {
        backgroundColor: '#34a5de',
        width: 250,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 20
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 5
    },
    text2: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 5
    }
})
