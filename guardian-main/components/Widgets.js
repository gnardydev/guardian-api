import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Widgets = (props) =>{
    return(
        <View style={styles.items}>
            <View style={styles.itemsRight}>
                <TouchableOpacity style={styles.status}></TouchableOpacity>
                <Text>{props.text}</Text>
            </View>
            <View style={styles.textoStatus}><Text>{props.text2}</Text></View>      
        </View>
    )
}

const styles = StyleSheet.create({
    items:{
        backgroundColor: '#D1D1D1',
        padding: 15,
        borderRadius: 10,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemsRight:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    status:{
        width: 15,
        height: 15,
        backgroundColor: '#25FF01',
        opacity: 0.5,
        borderRadius: 15/2,
        marginRight: 15,
    },
    textoStatus:{
        textAlign: 'center',
        paddingLeft: 110,
        width: 200,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default Widgets;