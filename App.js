import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios'
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen' 
import ComeBackScreen from './components/ComeBackScreen'

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCmCknaHb2eu1845H3bxwz2A73MVx3US1w",
  authDomain: "workrules-7df60.firebaseapp.com",
  databaseURL: "https://workrules-7df60.firebaseio.com",
  projectId: "workrules-7df60",
  storageBucket: "workrules-7df60.appspot.com",
  messagingSenderId: "536990184282",
  appId: "1:536990184282:web:e31fef2256404deaadb963",
  measurementId: "G-9CEBMTGLHM"
};

firebase.initializeApp(firebaseConfig)

export default function App() {
  const [workerId, setWorkerId] = useState('')
  const [userData, setUserData] = useState({
      id: '',
      firstName: '',
      lastName: '',
      address: '', 
      email: ''
  })
  const [openHr, setOpenHr] = useState(0)
  const [closeHr, setCloseHr] = useState(0)
  const [resToday, setResTdoay] = useState('')
  
  useEffect(() => {
    getStoredData()
    .catch(err => console.log(err))

    axios.get('https://notificationsserver.herokuapp.com/api/open-hours')
    .then(res => {
        setOpenHr( res.data[0] )
        setCloseHr( res.data[1] )
    })
    .catch(err => console.log(err))

    
  }, [])

  useEffect(() => {
    getResToday()
    .catch(err => console.log(err))
  }, [openHr, closeHr])

  let getResToday = async () => {
    console.log(openHr, closeHr)
    if( openHr!==0 && closeHr!==0 ){ 
      if(time < openHr || time > closeHr) {
        console.log('removed...')
        await AsyncStorage.removeItem('resToday')
      }
    }

    let newresToday = await AsyncStorage.getItem('resToday')
    setResTdoay(newresToday)
    console.log("respons",newresToday)
  }

  let getStoredData = async () => {
    const value = await AsyncStorage.getItem('WorkRulesId');
    setWorkerId(value)
    axios.post('https://notificationsserver.herokuapp.com/api/user-data', {
        userId: value
    })
    .then(res=> {
      res.data.map(data => {
          console.log(data)
          if(data!==null) {
              setUserData({ id: data[9], firstName: data[0], lastName: data[1], address: data[3]+ "\n" +data[4]+"\n" +data[5], email: data[6] })
          }
      })
    })
    .catch(err => console.log(err))
  }
  
  let time = new Date().getHours()+ parseInt(new Date().getMinutes())/100 
  let content
  if(workerId) {
      content = <HomeScreen id={userData.id} fName={userData.firstName} lName={userData.lastName} address={userData.address} email={userData.email} />
      console.log(openHr, closeHr, resToday)
      if(time > openHr && time < closeHr) {
          console.log('test')
          if(resToday !== 'yes'){
            content = <HomeScreen id={userData.id} fName={userData.firstName} lName={userData.lastName} address={userData.address} email={userData.email} />
            console.log('test2')
            
          }else {
            console.log('test3')
            content = <ComeBackScreen />
          }
      }else {
          console.log('test4')
          content = <ComeBackScreen />
      }
  }else {
      content = <RegisterScreen /> 
  }

  return (
      <View style={styles.container}>
          {content}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})


