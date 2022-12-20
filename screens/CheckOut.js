import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute, } from '@react-navigation/native'; 
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import RNBounceable from "@freakycoder/react-native-bounceable";
import moment from 'moment'; 
import auth from '@react-native-firebase/auth';

import { setCounter, increaseCounter, decreaseCounter, setSum, setTable, setRestaurant } from '../redux/actions';
 
  export default function CheckOut ({ navigation }, props)  {
    const route = useRoute();
    
    const [products, setProducts] = useState([]);
    
    const [isLoading, setIsLoading] = useState()

    const {counter} = useSelector(state=>state.counterReducer) // redux
    const {sum} = useSelector(state=>state.sumReducer) // redux
    const {restaurant} = useSelector(state=>state.restaurantReducer) // redux
    const {table} = useSelector(state=>state.tableReducer) // redux
    const dispatch = useDispatch()

    const uploadAndNavigate = async (navigation) => {{
        setIsLoading(true)
        docID = uuid.v4()

        firestore().collection('Order').doc(docID).set({
            UserID:auth().currentUser.uid,
            Date:moment().format("DD/MM/YYYY HH:mm:ss"),
            RestaurantID: restaurant,
            Table:table,
            Status: "Order received",
            Price:sum.toFixed(2),
            Products:counter,
        })
        resetStates()
        navigation.navigate('OrderStatus', {
            orderID:docID
        })
        setIsLoading(false)

    }
    
    };

    const resetStates = () => {
    dispatch(setCounter([]))
    dispatch(setSum(0))
    dispatch(setTable(""))
    dispatch(setRestaurant(""))
    }

    const clickHandlerProcceed = (navigation) => {
        
      uploadAndNavigate(navigation)
  }
  const clickHandlerEdit = (navigation) => {
      navigation.goBack()

  }
  const clickHandlerCancel = (navigation) => {
    resetStates()
    navigation.navigate("Scan")
  }
  if (isLoading == true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
    )
  }
  
      return (
        <View style={{ height: "100%", paddingTop: 20, flex: 1 }}>
         
          <View style={styles.container}>
          <ScrollView style={{minHeight:"100%"}}>
    
            {counter.map(item =>
              <View style={styles.textView}>
                <Text style= {{fontSize:16}}>{item.Title}  {item.Price}</Text>
    

              </View>
            )}
    
          </ScrollView>
          <Text style={{marginLeft:22, fontSize:18, fontWeight:"bold", color:"green", marginTop:"5%"}}>For a total off: {sum.toFixed(2)} Eur.</Text>

          </View>
          <RNBounceable style={styles.checkOutButton} onPress={() => clickHandlerProcceed(navigation)}>
          <Text style={styles.btnText}>Pay for the order</Text>
        </RNBounceable>
        <RNBounceable style={styles.checkOutButton} onPress={() => clickHandlerEdit(navigation)}>
          <Text style={styles.btnText}  >Change Order</Text>
        </RNBounceable><RNBounceable style={styles.checkOutButton} onPress={() => clickHandlerCancel(navigation)}>
          <Text style={styles.btnText }>Cancel Order</Text>
        </RNBounceable>
        </View>
      );
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 0.80,
        backgroundColor: '#DDDDDD',
        marginTop:"7%",
        borderRadius: 40,
        width:"85%",
        alignSelf:"center",
        marginBottom:"18%"
      },
     btnText:{
fontSize:22,
fontWeight:"bold"
     },
        checkOutButton:
        {
          width:"90%",
          alignSelf:"center",
          alignItems:"center",
          height:"10%",
          backgroundColor:"green",
          borderRadius:25,
          justifyContent:"center",
          marginBottom:"8%",
        },
        textView:{
            paddingVertical:5,
            marginLeft:22
        }
    });
    