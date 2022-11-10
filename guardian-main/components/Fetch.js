import { React, useEffect, useState} from "react";
import { Button, View, Text, FlatList, ActivityIndicator } from "react-native";

export default function(){

    const [carregando, setCarregando] = useState(true)
    const [dados, setDados] = useState([])

    // useEffect(
    //     ()=>{
    //         fetch('url completa')
    //             .then((resp)=>resp.json())
    //             .then((json)=>setDados(json.))
    //     }
    // )

    return(
        <View>

        </View>
    )
}
