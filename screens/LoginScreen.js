
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,

} from "react-native";
import auth from '@react-native-firebase/auth';


import RNBounceable from "@freakycoder/react-native-bounceable";




const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
    
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
    
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        
        <RNBounceable style={styles.loginBtn} onPress={() =>login_register(email, password, navigation)} testID="LoginButton">
          <Text style={styles.loginText}>Login</Text>
        </RNBounceable>


    

      </View>
      );
}
export default LoginScreen

const login_register = (em, pas, navigation) =>{
    auth()
  .createUserWithEmailAndPassword(em, pas)
  .then(() => {
    console.log('User account created & signed in!');
    navigation.navigate("Scan")
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
        auth().signInWithEmailAndPassword(em, pas)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate("Scan")
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#DDDDDD",
    borderRadius: 30,
    width: "65%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "flex-start",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "green"
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "green",
  },
  
});