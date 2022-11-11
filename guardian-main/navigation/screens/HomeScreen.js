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
    const [carregando, setCarregando] = useState(true);

    //Definir dados a serem pegados pela api (arduino)
    const [microfone, setMicrofone] = useState("");
    const [sensorMove, setSensorMove] = useState("");
    const [servoMotor, setServoMotor] = useState({
        ip: 'admin',
        data: 'false'
      });
    
    const [loadData, setLoadData] = useState(false);

    useEffect(
        ()=>{
            //Reabilitar variavel
            setLoadData(false);

            //Chamar função de get
            fetchDataMicrofone();
            // fetchDataSensorMove();

        }, [loadData]
    )
    
    
    async function fetchDataMicrofone(){

        //pegar Dado do Microfone
        const response = await axios.get("http://192.168.0.20:8000/microfone");
        setMicrofone(response.data);
        console.log(response.data); //salvar no useState e renderizar no front
    }

    async function fetchDataSensorMove(){

        //pegar Dado do Microfone
        const response = await axios.get("http://192.168.0.20:8000/sensorMove");
        setSensorMove(response.data);
        console.log(response.data);
        
    }
    
    async function fetchDataServoMotor(){

        //Enviar Dados para o sensor
        axios.post('http://192.168.0.20:8000/servoMotor', {
            ...servoMotor,
            data: (servoMotor.data == "true" ? "false" : "true"),
        })
          .then(function (response) {
            setServoMotor({
                ...servoMotor,
                data: (servoMotor.data == "true" ? "false" : "true"),
            });
            console.log("Tranca Modificada com sucesso");
          })
          .catch(function (error) {
            console.log("Ocorreu um erro");
          });
        
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={styles.deviceWrapper}>
                    <Text style={styles.logoNtitle}>Guardian</Text>
                    <Fontisto name="heartbeat-alt" size={30} color="black"/>
                    <Text style={styles.sectionTitle}>Olá cuidador</Text>
                    <Button onPress={()=>{
                        fetchDataSensorMove()
                    }}
                    title='Atualizar dados Sensor Movimento'
                    color='#D1D1D1'></Button>
                    <Button onPress={()=>{
                        // setLoadData(true)
                        fetchDataMicrofone()

                    }}
                    title='Atualizar dados Detector de Som'
                    color='#D1D1D1'></Button>
                    <Button style={styles.button}
                    onPress={()=>{
                        fetchDataServoMotor();
                    }}
                    
                    title='Modificar Tranca'
                    color='#D1D1D1'>
                    </Button>
                    <View style={styles.items}>
                        <Widgets text={'Trancas'} text2={servoMotor.data == "true" ? "Fechado" : "Aberto" } />
                        <Widgets text={'Proximidade'} text2={sensorMove.data} />
                        <Widgets text={'Sensor de Som'} text2={microfone.data} />
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 7,
        elevation: 3,
        backgroundColor: 'black',
      }
});