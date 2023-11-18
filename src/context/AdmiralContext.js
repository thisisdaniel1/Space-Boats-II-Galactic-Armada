import React, {useReducer} from "react"
import createDataContext from "./createDataContext";

const admiralReducer = (state, action) => {
    switch(action.type){
        case "addNickname":
            return {...state, nick: action.payload}
        case "euroTransaction":
            return {...state, spaceEuros: state.spaceEuros + action.payload}
        case "updateLevel":
            return {...state, level: state.level + action.payload}
        default:
            return state;
    }
}

const addNickname = (dispatch) => {
    return (nick) => {
        dispatch({ type: "addNickname", payload: nick})
    }
}

const euroTransaction = (dispatch) => {
    return (euro) => {
        dispatch({ type: "euroTransaction", payload: euro})
    }
}

const updateLevel = (dispatch) => {
    return (level) => {
        dispatch({ type: "updateLevel", payload: level})
    }
}

export const {Context, Provider} = createDataContext(admiralReducer, {addNickname: addNickname, euroTransaction: euroTransaction, updateLevel: updateLevel},
    {nick: "Green", spaceEuros: 300, level: 0});