import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';





export default function OrderStatus({ navigation }, props) {


  const [isLoading, setIsLoading] = useState()
  const [order, setOrder] = useState("")



  const route = useRoute();



  function newdata() {
    useEffect(() => {
      const subscriber = firestore()
        .collection('Order')
        .doc(route.params.orderID)
        .onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data());

          var data = {
            RestaurantID: documentSnapshot.data().RestaurantID,
            Status: documentSnapshot.data().Status,
            Table: documentSnapshot.data().Table,
            Products: JSON.stringify(documentSnapshot.data().Products),
            Price: documentSnapshot.data().Price,
            Date: documentSnapshot.data().Date
          }

          setOrder(data)
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }, []);
  }
  
  newdata()


  if (isLoading == true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
    )
  }

  return (
    <View style={{ height: "100%", paddingTop: 20, flex: 1 }}>




      <Text style={{ marginLeft: 22, fontSize: 18, }}>Your order Status</Text>
      <View style={styles.container}>

        <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: "bold", color: "green", }}>{order.Status}</Text>

      </View>
      <Text style={{ marginLeft: 22, fontSize: 18}}>Order has been made at: </Text>
      <View style={styles.container}>

        <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: "bold", color: "green", }}>{order.Date}</Text>

      </View>




    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0.10,
    backgroundColor: '#DDDDDD',
    marginTop: "7%",
    borderRadius: 40,
    width: "85%",
    alignSelf: "center",
    marginBottom: "6%",
    justifyContent: "center"
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold"
  },
  checkOutButton:
  {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    height: "10%",
    backgroundColor: "green",
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: "8%",
  },
  textView: {
    paddingVertical: 5,
    marginLeft: 22
  }
});
