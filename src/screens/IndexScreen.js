import React, {useContext, useState, useEffect} from "react"
import {View, Text, StyleSheet, Button} from "react-native"
import {Context} from "../context/AdmiralContext"

const IndexScreen = (props) => {
    // gets admiral context now so that i can use euro transaction
    const {euroTransaction} = useContext(Context)
    
    const [loseMessage, setLoseMessage] = useState("")
    useEffect(() => {
        setLoseMessage(props.navigation.getParam("loseMessage"))
    }, [props.navigation])

    return <View>
        <Text>{loseMessage}</Text>
        <Text>Welcome to Galactic Command, Admiral. We await orders on the Space Dock.</Text>
        <Button title={"Start Your Adventure"} onPress={() => {props.navigation.navigate("SpaceDock", {admiralContext: euroTransaction})}}/>
    </View>
}

IndexScreen.defaultProps = {
    initialValue:{
        loseMessage: ""
    }
}

const styles = StyleSheet.create({

})

export default IndexScreen;