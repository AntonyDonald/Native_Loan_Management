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
    <SafeAreaView>
      <View>
        <Text>User name</Text>
        <TextInput
          placeholder='Enter User Name'
          value={userName}
          onChangeText={(e) => setUserName(e)}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          placeholder='New Password'
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View>
        <Text>Retype Password</Text>
        <TextInput
          placeholder='Confirm New Password'
          value={retypePassword}
          onChangeText={(e) => setRetypePassword(e)}
        />
      </View>
      <View style={styles.button}>
        <Button title='SignIn' onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 50,
    margin: 20,
  }
})

export default Signup
