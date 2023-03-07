import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import DataContext from '../context/DataContext';
import MarqueeText from 'react-native-marquee'
import { useIsFocused } from '@react-navigation/native';

const Login = ({ navigation }) => {

  const focus = useIsFocused()

  const { userList, setUserList } = useContext(DataContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (focus === true) {
      setUserName("");
      setPassword("");
    }
    getData()
  }, [focus])

  const handleLogin = () => {
    const filtered = userList.find((data) => (data.name === userName) && (data.password === password))
    if (filtered) {
      navigation.navigate('Details')
    } else {
      Alert.alert("warning!", 'You are not a User')
      console.log("warning!")
    }

  }
  const handleSignUp = () => {
    navigation.navigate("Signup")
  }

  const getData = async () => {
    try {
      const response = await AsyncStorage.getItem("validUser");
      console.log(JSON.parse(response))
      setUserList(JSON.parse(response))
    }
    catch (err) {
      console.log("ERr = ", err.message)
    }
  }
  // Clear Async Storage Saved Data
  const clearData = async () => {
    try {
      const response = await AsyncStorage.setItem("validUser", JSON.stringify([]))
    }
    catch (err) {
      console.log("ERr = ", err.message)
    }
  }
  // go to details w/o Login
  const details = () => {
    navigation.navigate('Details')
  }
  return (
    <ImageBackground
      style={styles.background}
      source={require('./assets/login.png')}
    >
      <View style={styles.border}>
        <View>
          <Text style={styles.heading}>User name</Text>
          <TextInput
            style={styles.body}
            placeholder='Enter User Name'
            placeholderTextColor='#233EE8'
            value={userName}
            onChangeText={(e) => setUserName(e)}
          />
        </View>
        <View >
          <Text style={styles.heading}>Password</Text>
          <TextInput
            style={styles.body}
            placeholder='Enter Password'
            placeholderTextColor='#233EE8'
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <View >
          <TouchableOpacity onPress={handleLogin} >
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
          <View>
            <MarqueeText
              style={styles.warning}
              speed={1}
              marqueeOnStart={true}
              loop={true}
              delay={1000}
            >If you dont have an account Click Signup!
            </MarqueeText>
          </View>

          {/* <Text style={styles.warning}>If you dont have an account Click Signup!</Text> */}
          <TouchableOpacity onPress={handleSignUp} >
            <Text style={styles.button}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title='Datails' onPress={details} />
        <Button title='clearData' onPress={clearData} /> */}
      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#000",
    borderWidth: 1,
    marginLeft: 120,
    marginRight: 120,
    padding: 8,
    backgroundColor: "#10491D",
    color: "#fff",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  // Background Image
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  // Text
  heading: {
    color: '#000',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  //TextInput
  body: {
    fontSize: 15,
    borderBottomColor: '#000',
    borderWidth: 1
  },
  // login container
  border: {
    borderColor: '#000',
    margin: 10,
    padding: 10
  },
  // SignUp warning Text
  warning: {
    color: 'red',
    fontSize: 20,
    marginLeft: 50
  }
})

export default Login