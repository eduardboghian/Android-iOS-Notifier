import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import Popout from './Popup';
import { reload } from 'expo/build/Updates/Updates'

export default function RegisterScreen({id, fName, address, lName, email}) {
    const [reload, setReload] = useState(1)
    const [ans, setAns] = useState('')

    function popup(answer) {
        styles.popup = {
          width: ScreenWidth,
          height: ScreenHeight,
          zIndex: 5,
          backgroundColor: '#282828',
          position: 'absolute',
          borderRadius: 10,
          bottom: 0,
          opacity: 0.9
        }
        setAns(answer)
        setReload(reload+1)
    }

    let removeStoredData = async ()=> {
      try{
        await AsyncStorage.removeItem('WorkRulesId')
      }
      catch(err) {
          console.log(err)
      }
    }

    return (
        <View style={styles.container}>
            <Popout 
            id={id}
              styleWr={styles.popup} f
              Name={fName+' '+lName} 
              address={address} 
              email={email} 
              ans={ans} 
            />
            <Text style={styles.title} onPress={e => removeStoredData()}>Good Morning</Text>
            <Text style={styles.title}>{fName}</Text>
            <Text style={{  marginTop: 40, textAlign: 'center', fontSize: 10 }} >Please confirm that you are working today on the following site:</Text>
            <Text style={styles.address} >{address}</Text>


            <TouchableOpacity style={styles.button} onPress={ e=> popup('yes') }>
                <Text style={styles.text} >Yes! I am working today!  </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonNo} onPress={ e=> popup('no') }>
                <Text style={styles.text} >No! I am not working today!  </Text>
            </TouchableOpacity>
        </View>
    )
}

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width + 20;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#45Dd50',
      width: 250,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginBottom: 20
    },
    buttonNo: {
      backgroundColor: '#f00',
      width: 280,
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
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    address: {
      fontSize: 24,
      textAlign: 'center', 
      padding: 40
    },popup: {
      display: "none"
    }
});
