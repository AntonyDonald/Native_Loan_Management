import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from 'react-native';
import DataContext from '../context/DataContext';

const Signup = ({ navigation }) => {
  const { userList, setUserList } = useContext(DataContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  useEffect(() => {
    setUserName("")
    setPassword("")
    setRetypePassword("")
  }, [])


  const handleCancel = () => {
    navigation.navigate('Login')
  }

  const handleSignUp = async () => {
    var data = {
      name: userName,
      password: password
    }
    const newUserList = [...userList, data]
    const setFilter = newUserList.filter((obj) => (obj.name).toString() === (userName).toString())
    if (setFilter.length === 0) {
      setUserList(newUserList);
    }
    const filtered = userList.filter((obj) => (obj.name).toString() === (userName).toString())
    if (filtered.length === 0) {
      if ((userName).trim().length > 0) {
        if (password !== "") {
          if ((password).toString() === (retypePassword).toString()) {
            try {
              const response = await AsyncStorage.setItem("validUser", JSON.stringify(newUserList))
              navigation.navigate("Login")
            }
            catch (err) {
              console.log("ERr = ", err.message)
            }
          } else {
            Alert.alert("Password Incorrect")
          }
        } else {
          Alert.alert("Password Should not be Empty")
        }

      } else {
        Alert.alert("Empty Space is Not Allowed")
      }

    } else {
      Alert.alert("Name Already Exist")
    }


  }
  return (
    <ImageBackground
      style={styles.background}
      source={require('./assets/login.png')}
    >
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
      <View>
        <Text style={styles.heading}>Password</Text>
        <TextInput
          style={styles.body}
          placeholder='New Password'
          placeholderTextColor='#233EE8'
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View >
        <Text style={styles.heading}>Retype Password</Text>
        <TextInput
          style={styles.body}
          placeholder='Confirm New Password'
          placeholderTextColor='#233EE8'
          value={retypePassword}
          onChangeText={(e) => setRetypePassword(e)}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleSignUp} >
          <Text style={styles.button}>SignIn</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={handleCancel} >
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
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
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Signup
