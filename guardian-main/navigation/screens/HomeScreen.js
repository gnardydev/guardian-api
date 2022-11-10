import React from "react";
import { View, Text } from "react-native";
import Widgets from "../../components/Widgets";
import { StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import { Button, FlatList, ActivityIndicator } from "react-native";
import { Header } from "@rneui/base";
import axios from "axios";

export default function HomeScreen({ navigation }) {
    const [carregando, setCarregando] = useState(true)
    const [dados, setDados] = useState([])
    const [loadData, setLoadData] = useState(false)

    useEffect(
        ()=>{
            setLoadData(false)
            fetchData();
        }, [loadData]
    )
    
    
    async function fetchData(){
        const response = await axios.get("http://192.168.0.20:8000/sensorMove");
        setDados(response.data);
        console.log(response.data); //salvar no useState e renderizar no front
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={styles.deviceWrapper}>
                    <Text style={styles.logoNtitle}>Guardian</Text>
                    <Fontisto name="heartbeat-alt" size={30} color="black"/>
                    <Text style={styles.sectionTitle}>Olá cuidador</Text>
                    <Button onPress={fetchData}
                    title='Atualizar dados'
                    color='grey'></Button>
                    <View style={styles.items}>
                        <Widgets text={'Trancas'} text2={'1'} />
                        <Widgets text={'Sensor de som'} text2={'45db'} />
                        <Widgets text={dados.device} text2={dados.data} />
                        <Widgets text={'Luzes'} text2={'Online'} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    deviceWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoNtitle: {
        textAlign: 'center',
        paddingLeft: 110,
        width: 200,
        fontSize: 20,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    statusCircle: {
        width: 12,
        height: 12,
        borderColor: '000000',
        borderWidth: 2,
        borderRadius: 5,
    },

});