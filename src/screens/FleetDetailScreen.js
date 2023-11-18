import React, {useContext} from "react"
import {StyleSheet} from "react-native"
import {Context} from "../context/FleetContext"
import FleetPostForm from "../components/FleetPostForm";

const FleetDetailScreen = (props) => {

    const fleetID = props.navigation.getParam("id");

    // list of all fleets
    const {state, editFleet} = useContext(Context);

    // selects the post with the current id to edit
    const fleet = state.find((currentFleet) => {
        return currentFleet.id === fleetID;
    })

    return <FleetPostForm
        onSubmit={(icon, name, attack, defense) => {editFleet(fleetID, icon, name, attack, defense, () => {props.navigation.pop()})}}
        initialValue={{icon: fleet.icon, name: fleet.name, attack: fleet.attack, defense: fleet.defense}}
    />
}

const styles = StyleSheet.create({

})

export default FleetDetailScreen;