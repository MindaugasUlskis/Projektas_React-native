import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute, } from '@react-navigation/native'; 
import RNBounceable from "@freakycoder/react-native-bounceable";
import auth from '@react-native-firebase/auth';
  export default function MyOrders ({ navigation }, props)  {
    const route = useRoute();
    const [order, setOrder] = useState([]);
    
    const [isLoading, setIsLoading] = useState()

    async function fetchData() {


        orderData = []
    const querySnapshot = await firestore().collection("Order").get();
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        if (doc.data().UserID == auth().currentUser.uid) {
            orderData.push({
                RestaurantID: doc.data().RestaurantID,
                Date: doc.data().Date,
                id: doc.id
            })
        };
    });

    setOrder(orderData);

}
  

    const clickHandler = (navigation, item) => {
        navigation.navigate('OrderStatus', {
            orderID:item.id
        })
    
  }
  useEffect(() => { fetchData() }, [])
    
    if (isLoading == true) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
        )
      }
      return (
        <View style={{ height: "100%", paddingTop: 10, flex: 1 }}>
         
          <View style={{flex: 1}}>
          <ScrollView style={{minHeight:"100%"}}>
    
            {order.map(item =>
              <RNBounceable style={styles.container} onPress={() => clickHandler(navigation, item)}>
                <Text style={{color:"green", paddingLeft:5, alignSelf:"center"}}>{item.Date}</Text>
              </RNBounceable>
            )}
    
          </ScrollView>
          </View>
        </View>
      );
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        paddingHorizontal: 5,
        paddingBottom: 5,
        borderRadius: 30,
        marginBottom: "5%",
        height:30,
        flexDirection: "row",
    
      }
    });
    