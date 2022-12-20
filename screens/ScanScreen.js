import * as React from 'react';
import {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet , ScrollView, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setTable, setRestaurant } from '../redux/actions';
export default function ScanScreen({navigation}) {

const [collectedData, setCollectedData] = useState("");
const [scan, setScan] = useState(true)


const dispatch = useDispatch()
  const onPress = () => setScan(true)
  const CollectData = (data) =>{
    console.log(data)
    try {
      d = JSON.parse(data)
      
    firestore()
    .collection('Table')
    .doc(d.table)
    .get()
    .then(documentSnapshot => {
      console.log('Table exists: ', documentSnapshot.exists);
  
      if (documentSnapshot.exists) {
        console.log('Table data: ', documentSnapshot.data());
        info =({
          table: documentSnapshot.id,
          status: documentSnapshot.data().Status,
          res: documentSnapshot.data().RestaurantID
        })
        setCollectedData(info)
        console.log(collectedData)
        setScan(false)
  
      }
      else{
        
        Alert.alert('Alert', 'Thats not a valid QR code for this app',[
          {text: 'Ok', onPress: () => console.log('alert closed')}
        ])
      }
      
    });
  
    } catch (error) {
      Alert.alert('Alert', 'Thats not a valid QR code for this app',[
        {text: 'Ok', onPress: () => console.log('alert closed')}
      ])
    }
    
    



  
  

  }
  const onPressAdd = (item, navigation) =>{
    dispatch(setRestaurant(item.res))
    dispatch(setTable(item.table))
    navigation.navigate('Menu', {
      RestaurantID: item.res

  })
}


    return (
        
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {scan && <Text  style={{color:"green", fontSize:20, marginBottom:5 }}>
            Find a product Qr code and scan it!
          </Text>}
        {scan &&
        <QRCodeScanner
        showMarker = {false}
        reactivate = {true}
        onRead = {(data) => CollectData(data.data)}
        cameraContainerStyle = {{alignSelf: "center",}}
        cameraStyle={{overflow:'hidden', position: 'absolute', borderRadius:55, height: 500, width: 350,
         alignSelf: 'center', justifyContent: 'center' ,}}
        flashMode={RNCamera.Constants.FlashMode.off}
        
      />}
      {scan == false &&
      <View>
        
        <Text style={{color:"green", fontSize:20, marginBottom:25, marginTop:25, }}>Product information</Text>
       <View style={styles.infoCOntainer}>
        <Text style={{color:"green"}}>Table Number: {collectedData.table}</Text>
        <Text style={{color:"green"}}>Table is: {collectedData.status}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{color:"green"}}>New Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressAdd(collectedData, navigation)} style={styles.button}>
          <Text style={{color:"green"}}>Menu</Text>
        </TouchableOpacity>

        </View>
}
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderRadius:18,
      paddingHorizontal:25,
      marginBottom:25
      
    },
    infoCOntainer:{
      borderColor:"#DDDDDD",
      borderWidth: 2,
      backgroundColor:"#DDDDDD",
      padding:12,
      borderRadius:20,
      marginBottom:25
    },
    scrollViewContainer:{
flex:1,
       justifyContent: 'center',
        alignItems: 'center' 

    }
  });

  