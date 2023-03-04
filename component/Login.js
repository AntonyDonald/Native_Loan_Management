import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect , useState } from 'react';
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

const Login = ({ navigation }) => {
  const {userList, setUserList } = useContext(DataContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setUserName("");
    setPassword("");
    getData()
  },[])

  const handleLogin = () => {
      const filtered = userList.find((data) => (data.name === userName) && (data.password === password))
      if (filtered) {
        Alert.alert("ok")
      } else {
        Alert.alert("notok")
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
  const clearData = async() => {
    try{
      const response = await AsyncStorage.setItem("validUser" , JSON.stringify([]))
    }
    catch(err){
      console.log("ERr = " , err.message)
    }
  }
  const details = () => {
    navigation.navigate('Details')
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
          placeholder='Enter Password'
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View style={styles.button}>
        <Button title='Login' onPress={handleLogin} />
        <Text style={{ margin: 10, color: 'red' }}>If you dont have an account Click Signup!</Text>
        <Button onPress={handleSignUp} title='Signup' />
      </View>
      <Button title='Datails' onPress={details} />
      <Button title='clearData' onPress={clearData} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 50,
    margin: 20,
  }
})

export default Login