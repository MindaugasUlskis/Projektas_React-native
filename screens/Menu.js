import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute, } from '@react-navigation/native'; 
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../components/MenuInfo';
import RNBounceable from "@freakycoder/react-native-bounceable";
 
  export default function Menu ({ navigation }, props)  {
    const route = useRoute();
    const [products, setProducts] = useState([]);
    
    const [isLoading, setIsLoading] = useState()

    const {counter} = useSelector(state=>state.counterReducer) // redux
    const {sum} = useSelector(state=>state.sumReducer) // redux
  

    const clickHandler = (navigation) => {
navigation.navigate("CheckOut")
    
  }
  
    async function fetchProducts() {
      
  
      setIsLoading(true);
      productData = []
      const querySnapshot = await firestore().collection("Products").get();
      querySnapshot.forEach((doc) => {

        if (doc.data().RestaurantID == route.params.RestaurantID) {
        productData.push({
          Title: doc.data().Title,
          Price: doc.data().Price,
          key: doc.id,
          RestaurantID: doc.data().RestaurantID,
          Photo: doc.data().Photo
        });}
      });
  
      setProducts(productData);
      setIsLoading(false)
      console.log(products)
  
    }
    useEffect(() => { fetchProducts() }, [])
    if (isLoading == true) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
        )
      }
      return (
        <View style={{ height: "100%", paddingTop: 10, flex: 1 }}>
         
          <View style={{flex: 0.87}}>
          <ScrollView style={{minHeight:"100%"}}>
    
            {products.map(item =>
              <View style={styles.container}>
                <MenuItem item = {item} />
    

              </View>
            )}
    
          </ScrollView>
          <RNBounceable style={styles.checkOutButton} onPress={() => clickHandler(navigation)} >
          <Text style={styles.btnText}>Check out for a total of: {sum.toFixed(2)} Eur.</Text>
        </RNBounceable>
          {counter.map(item =>
            <Text>{item.Title}</Text>)}
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
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: "5%",
        height: 200,
        flexDirection: "row",
        justifyContent:"space-between"
    
      },
     btnText:{
fontSize:22,
fontWeight:"bold"
     },
        checkOutButton:
        {
          width:"100%",
          alignSelf:"center",
          alignItems:"center",
          height:"14%",
          backgroundColor:"green",
          borderRadius:25,
          justifyContent:"center",


        }
    });
    