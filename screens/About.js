import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 
import firestore from '@react-native-firebase/firestore';

 
  export default function MapsAndStuff() {
    const [markers, setmarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    async function fetchMarkers() {

      setIsLoading(true);
      markerData = []
      const querySnapshot = await firestore().collection("Restaurants").get();
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        markerData.push({
          title: doc.data().Title,
          lat: doc.data().Lat,
          lon: doc.data().Lon,
          key: doc.id
        });
      });
  
      setmarkers(markerData);
      setIsLoading(false)
  
    }
    useEffect(() => { fetchMarkers() }, [])
    if (isLoading == true) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
      )
    }

  return(
    <View style={styles.cont}>
    
    <Text style={{color:"green", fontSize:20, marginBottom:5, alignSelf:"center", marginTop: 10 }}>App works in these restaurants!</Text>
    <View style={styles.container}>
  
      <MapView
      
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: 54.687715276800425,
          longitude: 25.272610148769594,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {markers.map(item =>     <Marker coordinate = {{latitude: item.lat,longitude: item.lon}}
         pinColor = {"green"}
         title={item.title}/>)}
      </MapView>
    </View>
    </View>)
  };

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "70%",
      width: "100%",
      marginTop: "15%",
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    cont:{
      flex: 1,
      height: "100%",
      width: "100%"
    }
   });