import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useSelector, useDispatch } from 'react-redux';
import { setCounter, increaseCounter, decreaseCounter, setSum } from '../redux/actions';

export default function MenuItem({ item }) {

    const {counter} = useSelector(state=>state.counterReducer)
    const {sum} = useSelector(state=>state.sumReducer) // redux
    const dispatch = useDispatch()
    const [counterr, setCounterr] = useState(0);
    const [number, setNumber] = useState(0);
    const [cart, setCart] = useState([]);


const pressHandlerAdd = (price, item) => {
    data =({
        Title: item.Title,
        Price: item.Price,
      })
    dispatch(increaseCounter(data))
    addPrice(price)
    console.log(counter)
}
const pressHandlerRem = (item) => {
    if(number > 0){
        setNumber(number -1)
    }
    for(var i = Object.keys(counter).length -1; i >= 0; i--){
        console.log(i)
        if(counter[i].Title === item.Title){

            data = counter.splice(i, 1)
            dispatch(setCounter(counter))
            i = i -1000
            remPrice(item.Price)
        }
    }
    
}

const addPrice = (price) =>{

    dispatch(setSum(sum + price))


}
const remPrice = (price) =>{

    dispatch(setSum(sum - price))


}

    return (
        <View>
            <View style={{ flexDirection: "row", flex: 0.8 }}>

                <Image source={{ uri: item.Photo }} resizeMode='cover' style={styles.previewImage} />

                <View style={{ flexDirection: "column", alignItems: "center" }}>

                    <RNBounceable onPress={() => { setNumber(number +1); pressHandlerAdd(item.Price, item)}}>
                        <View style={styles.bounceButtonTopStyle}>
                            <Text style={styles.bounceButtonTextStyle}>Add</Text>


                        </View>

                    </RNBounceable>
                    <Text style={{ fontSize: 25, marginLeft: 10, marginVertical: 10, color:"green" }}>{number}</Text>

                    <RNBounceable onPress={() => { if(number > 0){ {setNumber(number-1) }; pressHandlerRem(item)}}} >
                        <View style={styles.bounceButtonStyle}>
                            <Text style={styles.bounceButtonTextStyle}>Remove</Text>


                        </View>

                    </RNBounceable>

                </View>

            </View>
            <View style={{ flexDirection: "row", flex: 0.3 }}>
                <Text style={{ color: "green", paddingTop: 10, fontWeight: "bold", fontSize: 25, flex: 0.8 }}>{item.Title}
                </Text>
                <Text style={{ color: "green", paddingTop: 10, fontWeight: "bold", fontSize: 25, flex: 0.3 }}>{item.Price} Eur.</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    horizontalText: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginBottom: 5,
        color: 'green',
    },
    previewImage: {
        width: 280,
        height: "100%",
        borderRadius: 30,
        overflow: "hidden",



    },
    bounceButtonTextStyle: {
        fontWeight: "bold",
        fontSize: 14,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    bounceButtonStyle: {
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    bounceButtonTopStyle: {
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 40
    }
});