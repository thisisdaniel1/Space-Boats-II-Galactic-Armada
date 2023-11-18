import React, {useContext} from "react"
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions} from "react-native"
import {Context as FleetContext} from "../context/FleetContext"
import {Context as AdmiralContext} from "../context/AdmiralContext"
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons"

const SpaceDockScreen = (props) => {

    const {state, deleteFleet} = useContext(FleetContext);
    // was going to modify nickname here after battles but out of time
    const {state: AdmiralState, addNickname, euroTransaction} = useContext(AdmiralContext)

    const {width, height} = Dimensions.get("window");

    return <View>
        <FlatList
            data={state}
            keyExtractor={(fleet) => {return fleet.id}}
            renderItem={ ({item}) => {
                return <TouchableOpacity onPress={() => {props.navigation.navigate("FleetDetail", {id: item.id})}}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons style={styles.icon} name={item.icon}/>
                        <Text>{item.name} - A: {item.attack} - D: {item.defense}</Text>
                        <TouchableOpacity onPress={ () => {deleteFleet(item.id)}}>
                            <Feather style={styles.icon} name="trash"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }}
        />
        <Button title="Battle Time" onPress={() => {props.navigation.navigate("Battle", {width: width, height: height})}} />
    </View>
}

SpaceDockScreen.navigationOptions = (props) => {
    // creating new fleets cost 100 space euros
    // strangely enough i cannot use hooks in the nav options (only in body) so i use it in indexscreen and pass it here
    // also i realize that creating a fleet with this button doesn't actually save it but hey maybe the forms costed you 50 space euros
    const createNewFleetCost = () => {
        const euroTransaction = props.navigation.getParam("admiralContext")

        euroTransaction(-100)
    }

    return{
        headerRight: () => (
            <TouchableOpacity onPress={() => {props.navigation.navigate("FleetCreate"); createNewFleetCost()}}>
                <Feather name="plus" size={30}/>
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20, //padding from top and from left and right
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    title:{
        fontSize: 18
    },
    icon:{
        fontSize: 24
    }
})

export default SpaceDockScreen;