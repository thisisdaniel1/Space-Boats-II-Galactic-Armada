import React, {useContext} from "react"
import {Text, View, StyleSheet} from "react-native"
import {Context} from "../context/AdmiralContext"

const AdmiralHeader = (props) => {

    const {state} = useContext(Context)

    return <View>
        <Text>
            Nick: {state.nick}                 €: {state.spaceEuros}                  lvl: {state.level}
        </Text>
    </View>
}

const styles = StyleSheet.create({
})

export default AdmiralHeader;