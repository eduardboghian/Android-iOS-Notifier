import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import axios from 'axios'
import { reload } from 'expo/build/Updates/Updates'

export default function Popup({styleWr, Name, address, email, ans}) {
    const [style, setStyle] = useState({})
    const[popupMessage, setMsg] = useState('')

    useEffect(() => {
        if(ans==='yes'){
            setMsg('Please confirm that you will work today!')
        }else(
            setMsg('Please confirm that you will NOT work today!')
        )
    }, [ans])
    
    useEffect(()=> {
        setStyle(styleWr)
    },[styleWr])

    async function sendEmail(ans) {
        
        //https://notificationsserver.herokuapp.com
        axios.post('https://notificationsserver.herokuapp.com/api/send-email', {
            response: ans,
            name: Name,
            address: address,
            email: email
        })
        .then(res=> {
            console.log(res.data)
            setStyle({display: 'none'})
        })
        .catch(error => console.log(error))

        await AsyncStorage.setItem('resToday', 'yes')
        reload()
    }

    return (
        <View style={style}>

            <View style={styles.content}>
                <Text style={styles.text}>{popupMessage}</Text>

                <View style={ styles.buttons}>
                    <TouchableOpacity style={styles.buttonNo} onPress={ e=> sendEmail(ans) }>
                        <Text style={styles.btnText} > OK </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonYes} onPress={ e=> {setStyle({display: 'none'})}  }>
                        <Text style={styles.btnText} > Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

let ScreenHeight = Dimensions.get("window").height / 3;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 30,
        marginTop: 20
    },
    content: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 7,
        marginTop: ScreenHeight,
        borderRadius: 10
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: 50,
        borderTopColor: '#383838',
        borderTopWidth: 1,
        alignItems: 'center'
    },
    btnText: {
        width: 150,
        textAlign: "center",
        justifyContent: 'center',
        fontSize: 18,
        color: '#053f9c',
        fontWeight: '700'
    },
    buttonYes: {
        borderLeftColor: '#383838',
        borderLeftWidth: 1
    }
})