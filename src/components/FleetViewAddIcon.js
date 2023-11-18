import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const FleetViewAddIcon = (props) => {

    const [width, height] = props.position;
    const position = {
        left: width * props.parameters.left,
        top: height * props.parameters.top,
        width: width * props.parameters.width,
        height: width * props.parameters.height
    }

    return <View>
                <TouchableOpacity
                    disabled={props.disabled}
                    style={{position: "absolute",
                        ...position,
                        borderWidth: 2,
                    }}
                    onPress={() => {
                        props.fleetDetails()
                    }}
                >
                    <MaterialCommunityIcons name={props.icon} size={30}/>

                    {/* I wanted to display the stats of each wing on the battlescreen and was able to do so. But this made the screen too large and I couldn't get scrollview to work with the flatlist and blah blah blah */}
                    {/* <FlatList 
                        data={props.wingDetails ? [props.wingDetails] : []}
                        keyExtractor={(item) => item.wing}
                        renderItem={ ({item}) => {
                            return <View>
                                <Text>Wing: {item.wing}</Text>
                                <Text>Attack: {item.attack}</Text>
                                <Text>Defense: {item.defense}</Text>
                            </View>
                        }}
                    /> */}
                </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
})

export default FleetViewAddIcon;