import React, {useContext} from "react"
import {StyleSheet} from "react-native"
import {Context} from "../context/FleetContext"
import FleetPostForm from "../components/FleetPostForm"

const FleetCreateScreen = (props) => {

    const {createNewFleet} = useContext(Context);

    return <FleetPostForm 
        // initialIcon={{icon: "crosshairs-question"}}
        onSubmit={(icon, name, attack, defense) => {
            createNewFleet(icon, name, attack, defense, () => {props.navigation.navigate("SpaceDock")})
        }}
    /> 
}

const styles = StyleSheet.create({
})

export default FleetCreateScreen;