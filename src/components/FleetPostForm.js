import React, {useState, useContext} from "react"
import {View, TouchableOpacity, Text, TextInput, Button, StyleSheet, Modal} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Context} from "../context/AdmiralContext"

const FleetPostForm = (props) => {

    const [icon, setIcon] = useState(props.initialValue.icon)
    const [name, setName] = useState(props.initialValue.name)
    const [attack, setAttack] = useState(props.initialValue.attack)
    const [defense, setDefense] = useState(props.initialValue.defense)

    const {state, euroTransaction} = useContext(Context)

    const icons = ["horseshoe", "polymer", "plus-minus-box", "pizza", "pi", "pentagram", "peace", "axe", "axe-battle"]
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    return <View>
        {/* pressing when unhide the popup/modal */}
        <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons style={{fontSize: 40}} name={icon}/>
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(!isModalVisible)
            }}
        >
            <View style={{flex: 1, justifyContext: "center", alignItems: "center"}}>
                <View style={{backgroundColor: "white", padding: 20}}>

                    <View style={{flexDirection: "row", justifyContext: "space-between"}}>
                        {icons.map( (icon, index) => (
                            <TouchableOpacity key={`${icon}-${index}`} onPress={() => {setIcon(icon)}}>
                                <MaterialCommunityIcons
                                    name={icon}
                                    size={40}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Button title="Close" onPress={toggleModal} />
                </View>
            </View>
        </Modal>

        <Text style={styles.label}>Enter Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)}/>
        <Text style={styles.label}>Enter Attack ({attack})</Text>
        <Button title="Add Attack" onPress={() => {setAttack(attack+1); euroTransaction(-10)}}/>
        <Button title="Lose Attack" onPress={() => {setAttack(attack-1); euroTransaction(10)}}/>

        <Text style={styles.label}>Enter Defense ({defense})</Text>
        <Button title="Add Defense" onPress={() => {setDefense(defense+1); euroTransaction(-10)}}/>
        <Button title="Lose Defense" onPress={() => {setDefense(defense-1); euroTransaction(10)}}/>

        <Text>{"\n"}</Text>

        <Button title="Save Fleet" onPress={() => {
            props.onSubmit(icon, name, attack, defense);
        }}/>
    </View>
}

FleetPostForm.defaultProps = {
    initialValue:{
        icon: "crosshairs-question",
        name: "",
        attack: 100,
        defense: 100,
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label:{
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
})

export default FleetPostForm;