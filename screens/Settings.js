import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput,  ActivityIndicator, Alert, } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';


import RNBounceable from "@freakycoder/react-native-bounceable";

export default function Settings({ navigation }, props) {
  const [fullName, setFullName] = useState("Enter full name")
  const [userInfo, setUserInfo] = useState("")
  const [blocker, setBlocker] = useState("0") // blocker will be used to chose if user can add a card
  const [cardNumber, setCardNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)

 const pressHandler = (navigation) => {

  console.log(blocker)
  if(blocker === "1"){
        navigation.navigate('AddCard')
  }
  else if (blocker === "0"){
    Alert.alert('Allert', 'First save your Full name',[
      {text: 'Ok', onPress: () => console.log('alert closed')}
    ])
  }
  else{
    Alert.alert('Allert', 'You already have a card',[
      {text: 'Ok', onPress: () => console.log('alert closed')}
    ])
  }
    }

    const deleteHandler = () => {
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          { text: "Delete", onPress: () => deletePress() }
        ]
      );
    }
    const MyOrdersHandler = (navigation) => {
      navigation.navigate("MyOrders")
    }
    const deletePress = () => {
      setIsLoading(true)
 
      firestore()
        .collection('Card')
        .doc(userInfo.cardID)
        .delete()
        .then(() => {
          console.log('Card deleted from card folder');
        });

        firestore().collection('User').doc(userInfo.userID).update({
          CardID: firestore.FieldValue.delete(),
        });
        console.log('CardID deleted from user');
        CollectData()
        setIsLoading(false)
    }
      

  const CollectData = () => {
    setIsLoading(true)
    firestore()
      .collection('User')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          info = ({
            fullName: documentSnapshot.data().FullName,
            cardID: documentSnapshot.data().CardID,
            userID: documentSnapshot.data().UserID
          })
          setUserInfo(info)
          setFullName(info.fullName)
          setBlocker("1")
          console.log(fullName)

        }
        else{
          info = ({
            fullName:"Enter full name",
          })
          setUserInfo(info)
        }
        console.log(info.cardID)
          firestore()
      .collection('Card')
      .doc(info.cardID)
      .get()
      .then(documentSnapshot => {
        console.log('card exists ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
         
            full =  documentSnapshot.data().CardNumber
            lastFour = full.slice(-4)
            console.log(lastFour)

            setCardNumber("**** **** **** "+ lastFour)
            setBlocker("2")

        }
        else {
          setCardNumber("You dont have a linked card yet")
          
        }

      })
        
       
        
  })
  setIsLoading(false)
}
  const saveChangesHandler = async (userInfo) => {
    setIsLoading(true)
    
    firestore().collection('User').doc(auth().currentUser.uid).update({
      FullName: fullName,
      UserID: auth().currentUser.uid,
  })
  setIsLoading(false)
} 
const isFocused = useIsFocused();

useEffect(() => {
  CollectData();
},[isFocused]);
 

  if (isLoading == true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
    )
  }
  
  return (
    <View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 25, marginBottom: "10%", alignSelf: "center" }}>Settings</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={userInfo.fullName}
            placeholderTextColor="grey"
            onChangeText={(value) => setFullName(value)}
          />
        </View>
        <View style={styles.cardContainer}>
          <Text style={{ paddingLeft: "8%", paddingVertical: "3%" }}>Your linked card:</Text>
          <Text style={{ color: "grey", paddingLeft: "8%", fontSize: 20 }} >{cardNumber}</Text>
          {blocker ==="2" &&<View>
        <RNBounceable style={styles.deletebutton} onPress={() =>deleteHandler()}>
            <Text style={{ fontSize: 36, bottom:8, color:"green" }} >+</Text>
          </RNBounceable>
        </View>}
        </View>
        
        <View style={styles.buttonViewContainer}>
          <RNBounceable style={styles.saveButton} onPress={() =>pressHandler(navigation)}>
            <Text style={{ fontSize: 16 }}>Link a card</Text>
          </RNBounceable>
        </View>
        <View style={styles.buttonViewContainer}>
          <RNBounceable style={styles.saveButton} onPress={() => saveChangesHandler({userInfo})}>
            <Text style={{ fontSize: 16 }}>Save changes</Text>
          </RNBounceable>
        </View>
        <View style={styles.buttonViewContainer}>
          <RNBounceable style={styles.saveButton} onPress={() => MyOrdersHandler(navigation)}>
            <Text style={{ fontSize: 16 }}>My orders</Text>
          </RNBounceable>
        </View>
      </View>
    </View>
  );
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
    width: "80%",
    height: "15%",
    marginBottom: 20,

    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    paddingLeft:"8%",
    fontSize: 24,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "green"
  },
  cardContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 30,
    height: "15%",
    width: "80%",
    marginBottom:"25%" // change when addiing new elements above buttons
  },
  saveButton: {
    width: "100%",
    alignItems: "center"

  },
  buttonViewContainer: {
    width: "80%",
    borderRadius: 25,
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "green",
  },
  deletebutton:{
    position:"absolute",
    bottom:"10%",
    borderWidth: 2,
    left:"80%",
    transform: [{ rotate: "45deg" }],
    height:40,
    width: 40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:40,
    borderColor:"green",

  }


});