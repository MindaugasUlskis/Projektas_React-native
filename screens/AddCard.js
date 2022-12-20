import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Alert
} from "react-native";


import RNBounceable from "@freakycoder/react-native-bounceable";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import uuid from 'react-native-uuid';



const AddCard = ({ navigation }) => {

    const [cardOwnerName, setCardOwnderName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [date, setDate] = useState("")
    const [cVV, setCVV] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    handleCardNumber = (text) => {
        let formattedText = text.split(' ').join('');
        if (formattedText.length > 0) {
          formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        setCardNumber(formattedText)
        return formattedText;
      }

    const upload = async () => {
        setIsLoading(true)
        if(cardOwnerName.length <1){
            Alert.alert('Alert', 'Card Owner name is not valid!',[
                {text: 'Ok', onPress: () => console.log('alert closed')}
              ])
        }
        else if(cardNumber.length != 19)
        {
            Alert.alert('Alert', 'Card number is not valid!',[
                {text: 'Ok', onPress: () => console.log('alert closed')}
              ])
        }
        else if(date.length != 5){
            Alert.alert('Alert', 'Card date is not valid!',[
                {text: 'Ok', onPress: () => console.log('alert closed')}
              ])
        }
        else if(cVV.length != 3){
    
            Alert.alert('Alert', 'CVV is not valid!',[
                {text: 'Ok', onPress: () => console.log('alert closed')}
              ])
        }
        else{
        cardDataBaseID = uuid.v4()

        firestore().collection('Card').doc(cardDataBaseID).set({
            CardOwnder: cardOwnerName,
            CardNumber: cardNumber,
            Date:date,
            CVV:cVV,
            UserID:auth().currentUser.uid
        })
        console.log(cardNumber.length)
        firestore().collection('User').doc(auth().currentUser.uid).update({
            CardID:cardDataBaseID
        })
        Alert.alert('Success!', 'Card has been added!',[
            {text: 'Ok', onPress: () => navigation.navigate("Settings")}
          ])
    }
    setIsLoading(false)
    };

    if (isLoading == true) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
        )
      }

    return (
        <View>

            <View style={{ alignItems: "center" }}>
                
                <Text style={{
                    color: "green", fontWeight: "bold", fontSize: 25,
                    marginBottom: "60%", alignSelf: "center", marginTop:"10%"
                }}>Add a card</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Card owner name"
                        placeholderTextColor="grey"
                        onChangeText={(value) => setCardOwnderName(value)}
                        
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Card number"
                        placeholderTextColor="grey"
                        onChangeText={(value) => handleCardNumber(value)}
                        value={cardNumber}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent:"space-between", }}>
                    <View style={styles.date}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Date"
                        placeholderTextColor="grey"
                        onChangeText={(value) => setDate(value)}
                    />
                    </View>
                    <View style={styles.date}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="CVV"
                        placeholderTextColor="grey"
                        onChangeText={(value) => setCVV(value)}
                    />
                    </View>

                </View>
                <View style={styles.buttonViewContainer}>
                    <RNBounceable style={styles.saveButton} onPress={() => upload()}>
                        <Text style={{ fontSize: 16 }}>Add this card</Text>
                    </RNBounceable>
                </View>
            </View>
        </View>
    );
}
export default AddCard

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
        height: 50,
        marginBottom: 20,
        alignItems: "flex-start",
    },

    TextInput: {
        height: 50,
        flex: 1,
        paddingLeft: "8%",
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
        height: "25%",
        width: "80%",
        marginBottom: "25%" // change when addiing new elements above buttons
    },
    saveButton: {
        width: "100%",
        alignItems: "center"

    },
    buttonViewContainer: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        backgroundColor: "green",
    },
    date:{
        marginHorizontal: "15%",
        backgroundColor: '#DDDDDD',
        height: 50,
        width:"25%",
        borderRadius: 30,
    },
    

});