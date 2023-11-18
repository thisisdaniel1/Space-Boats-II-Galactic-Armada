import React, {useState, useContext, useEffect} from "react"
import {View, Text, StyleSheet, Modal, Button, TouchableOpacity} from "react-native"
import {Context as FleetContext} from "../context/FleetContext"
import {Context as ArmadaContext} from "../context/ArmadaContext"
import {Context as AdmiralContext} from "../context/AdmiralContext"
import FleetViewAddIcon from "../components/FleetViewAddIcon"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import { calculateWings, executeBattle } from "../context/battleFunctions"

const BattleScreen = (props) => {

    const width = props.navigation.getParam("width");
    const height = props.navigation.getParam("height");

    const enemyLeftParameters = {
        left: 0.25,
        top: 0.05,
        width: 0.1,
        height: 0.1,
    }

    const enemyTopParameters = {
        left: 0.45,
        top: 0.15,
        width: 0.1,
        height: 0.1,
    }

    const enemyRightParameters = {
        left: 0.65,
        top: 0.05,
        width: 0.1,
        height: 0.1,
    }

    const leftParameters = {
        left: 0.25,
        top: 0.5,
        width: 0.1,
        height: 0.1,
    }

    const topParameters = {
        left: 0.45,
        top: 0.4,
        width: 0.1,
        height: 0.1,
    }

    const rightParameters = {
        left: 0.65,
        top: 0.5,
        width: 0.1,
        height: 0.1,
    }

    const {state} = useContext(FleetContext)
    const {state: ArmadaState, generateEnemyFleets, updateArmadaWings, resetArmadaWings} = useContext(ArmadaContext)
    const {state: AdmiralState, updateLevel, euroTransaction, addNickname} = useContext(AdmiralContext)

    const [leftWing, setLeftWing] = useState("plus");
    const [centerWing, setCenterWing] = useState("plus");
    const [rightWing, setRightWing] = useState("plus");
    const [selectedWing, setSelectedWing] = useState("left")

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = (wing) => {
        setSelectedWing(wing)

        setModalVisible(!isModalVisible)
    }

    const closeModal = () => {
        setModalVisible(!isModalVisible)
    }

    // starts as the list of available fleets not yet assigned, with fleets represented by their icons
    const [avaiableFleets, setAvailableFleets] = useState(state.map((fleet) => fleet.icon));
    const [selectedFleets, setSelectedFleets] = useState([])

    const handleFleetSelection = (icon) => {

        // if the fleet is not already selected
        if (!selectedFleets.includes(icon)){

            // removes the selected icon from the avaiablefleets array
            const updatedFleetIcons = avaiableFleets.filter((fleetIcon) => fleetIcon !== icon)
            setAvailableFleets(updatedFleetIcons)

            setSelectedFleets([...selectedFleets, icon])

            const calculation = calculateWings(icon, state)
            const {totalAttack, totalDefense} = calculation
            updateArmadaWings(selectedWing, totalAttack, totalDefense)

            changeIcon(icon)
        }
    }

    /*
    const handleRemoveFleet = (icon) => {
        // select only fleets not matching the x and set that as the new selection
        const updatedSelectedFleets = selectedFleets.filter((fleetIcon) => fleetIcon !== icon)
        setSelectedFleets(updatedSelectedFleets)

        // add the fleet back to available fleets
        setAvailableFleets([...avaiableFleets, icon])

        // console.log(selectedWing)
        switch (selectedWing){
            case "left":
                setLeftWing("plus")
                break
            case "center":
                setCenterWing("plus")
                break
            case "right":
                setRightWing("plus")
                break
            default:
                console.log("missing wing " + selectedWing)
                break
        }
    }
    */

    const handleRemoveAllIcons = () => {
        setSelectedFleets([])
        setAvailableFleets(state.map((fleet) => fleet.icon))
        setLeftWing("plus")
        setCenterWing("plus")
        setRightWing("plus")

        console.log(ArmadaState)

        resetArmadaWings()
    }

    const changeIcon = (icon) => {
        switch(selectedWing){
            case "left":
                setLeftWing(icon)
                break
            case "center":
                setCenterWing(icon)
                break
            case "right":
                setRightWing(icon)
                break
            default:
                console.log("missing wing " + {selectedWing})
                break;
        }

        closeModal();
    }

    // starts battle once so that the enemy stats are calculated correctly
    useEffect(() => {
        if (AdmiralState.nick === "Green"){
            startBattle()
            setMessage("A suprise attack catches the enemy off guard. You loot 100 euros off their wrecks.")
            addNickname("Regular")
        }
    }, [])

    useEffect(() => {
        if (AdmiralState.nick === "Regular" && AdmiralState.level === 3) {
          setMessage("Congratulations Commander, you have been promoted to Grand Admiral. Here's 300 more euros for your spending.")
          addNickname("Grand Admiral")
          euroTransaction(100)
        }
    }, [AdmiralState.level]);

    useEffect(() => {
        if (AdmiralState.spaceEuros === 0) {
            props.navigation.navigate("Index", {
                loseMessage: "You are dishonorably dismissed from service after being accused of corrupt spending. However, you are able to work your way back through admiral school and find yourself once again in a space dock."
            })
        }
    }, [AdmiralState.spaceEuros]);

    const [message, setMessage] = useState("")

    const startBattle = () => {
        generateEnemyFleets(AdmiralState.level)
        
        const battleResults = executeBattle(ArmadaState)
        // console logs for testing
        console.log("Enemy Stats: ", battleResults.enemyStats)
        console.log("Friendly Stats: ", battleResults.friendlyStats)
        console.log("Message: ", battleResults.message)

        switch (battleResults.message){
            case "You lost the engagement. The brass chewed you out of 100 euros.":
                euroTransaction(-100)
                break;
            case "You won. The bounties on those ships earned you 100 euros.":
                euroTransaction(100)
                updateLevel(1)
                break;
        }

        setMessage(battleResults.message)
    }

    return <View>
        <Text>{message}</Text>
        <FleetViewAddIcon disabled={true} position={[width, height]} parameters={enemyLeftParameters} icon="crosshairs-question"/>
        <FleetViewAddIcon disabled={true} position={[width, height]} parameters={enemyTopParameters} icon="crosshairs-question"/>
        <FleetViewAddIcon disabled={true} position={[width, height]} parameters={enemyRightParameters} icon="crosshairs-question"/>

        <FleetViewAddIcon 
            fleetDetails={() => toggleModal("left")}
            position={[width, height]}
            parameters={leftParameters}
            icon={leftWing}
        />
        <FleetViewAddIcon
            fleetDetails={() => toggleModal("center")}
            position={[width, height]}
            parameters={topParameters}
            icon={centerWing}
        />

        <View>
        {/* the clear all button that clears all selected fleets and resets everything */}
        <TouchableOpacity 
            style={{
                position: "absolute",
                    left: width * 0.45,
                    top: height * 0.5,
                    width: width* 0.1,
                    height: height * 0.1,
            }}
            onPress={() => handleRemoveAllIcons()}
        >
            <MaterialCommunityIcons name="xamarin" size={40}/>
        </TouchableOpacity>

        <TouchableOpacity 
            style={{
                position: "absolute",
                    left: width * 0.45,
                    top: height * 0.6,
                    width: width* 0.1,
                    height: height * 0.1,
            }}
            onPress={() => startBattle()}
        >
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={40}/>
        </TouchableOpacity>
        </View>

        <FleetViewAddIcon 
            fleetDetails={() => toggleModal("right")} 
            position={[width, height]} 
            parameters={rightParameters} 
            icon={rightWing}
        />
    
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
        >
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{backgroundColor: "white", padding: 20}}>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        {avaiableFleets.map( (fleetIcon, index) => (
                            <TouchableOpacity 
                                key={`available-${index}`}
                                onPress={() => handleFleetSelection(fleetIcon)}
                                disabled={selectedFleets.includes(fleetIcon)}    
                            >
                                <MaterialCommunityIcons
                                    name={fleetIcon}
                                    size={40}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Button title="Close" onPress={toggleModal} />
                </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({

})

export default BattleScreen;