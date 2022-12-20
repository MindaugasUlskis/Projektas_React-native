import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNBounceable from "@freakycoder/react-native-bounceable";


export default function StaticMeniu() {
  const [products, setProducts] = useState([]);
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [chosen, setChosen] = useState("01")


  async function fetchProducts() {

    setIsLoading(true);
    productData = []
    const querySnapshot = await firestore().collection("Products").get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      productData.push({
        Title: doc.data().Title,
        Price: doc.data().Price,
        key: doc.id,
        RestaurantID: doc.data().RestaurantID
      });
    });

    setProducts(productData);
    setIsLoading(false)

  }
  async function fetchNames() {

    setIsLoading(true);
    NameData = []
    const querySnapshot = await firestore().collection("RestaurantBranchNames").get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      NameData.push({
        Title: doc.data().Title,
        key: doc.id,
        RestaurantID: doc.data().RestaurantID
      });
    });

    setNames(NameData);
    setIsLoading(false)

  }
  const onPressCheckOut = (navigation) =>{
    navigation.navigate('CheckOut')
  }

  useEffect(() => { fetchProducts() }, [])
  useEffect(() => { fetchNames() }, [])

  if (isLoading == true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
    )
  }
  return (
    <View style={{ height: "100%", paddingTop: 10 }}>
      <Text style={{ color: "green", fontSize: 20, marginBottom: 5, alignSelf: "center" }}>
        Menu
      </Text>
      <ScrollView  horizontal= {true}>
        { names.map(name=>
                <View><Text style={styles.horizontalText} onPress={() => clickHandler(name.RestaurantID)}>{name.Title}</Text></View>
          )}
      </ScrollView>
      <ScrollView>

        {products.map(item =>
          <View style={styles.container}>
            

            <View>
            <Text style={{ color: "green", paddingTop: 20 }}>
              Product: {item.Title}
            </Text>
            <Text style={{ color: "green" }}>
              Price: {item.Price} Eur.
            </Text>
            </View>
            <View>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: "5%",
    height: 120,
    flexDirection: "row",
    justifyContent:"space-between"

  },
  horizontalText:{
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 5,
    color: 'green',
  }
});
