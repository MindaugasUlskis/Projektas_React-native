import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute, } from '@react-navigation/native'; 
import MenuItem from '../components/MenuInfo';
import RNBounceable from "@freakycoder/react-native-bounceable";
 
  export default function MyOrders ({ navigation }, props)  {
    const route = useRoute();
    const [products, setProducts] = useState([]);
    
    const [isLoading, setIsLoading] = useState()


  

    const clickHandler = (navigation) => {
navigation.navigate("CheckOut")
    
  }
  
    
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
    