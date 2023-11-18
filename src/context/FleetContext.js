import React, {useReducer} from "react"
import createDataContext from "./createDataContext";

const fleetReducer = (state, action) => {
    switch(action.type){
        case "createNewFleet":
            return [...state, {
                id: Math.floor(Math.random() * 99999999),
                icon: action.payload.icon,
                name: action.payload.name,
                attack: action.payload.attack,
                defense: action.payload.defense
                }]
        case "deleteFleet":
            return state.filter((fleet) => {
                // if this function returns true than it is placed in a new array
                // this new array becomes the state
                // therefore it includes only ids not matching the deleted id
                return fleet.id !== action.payload
            })
        case "editFleet":
            return state.map((fleet) => {
                // returns an array with (possibly) altered versions of the original array
                if (fleet.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return fleet;
                }
            })
        case "editIcon":
            return state.map((fleet) => {
                if (fleet.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return fleet;
                }
            })
        default:
            return state;
    }
}

const createNewFleet = (dispatch) => {
    return (icon, name, attack, defense, callback) => {
        dispatch({ type: "createNewFleet", payload: {icon: icon, name: name, attack: attack, defense: defense}})
        callback();
    }
}

const deleteFleet = (dispatch) => {
    return (id) => {
        dispatch({type: "deleteFleet", payload: id})
    }
}

const editFleet = (dispatch) => {
    return (id, icon, name, attack, defense, callback) => {
        dispatch({type: "editFleet", payload: {id: id, icon: icon, name: name, attack: attack, defense: defense}})
        callback();
    }
}

const editIcon = (dispatch) => {
    return (id, icon, name, attack, defense) => {
        dispatch({type: "editIcon", payload: {id: id, icon: icon, name: name, attack: attack, defense: defense}})
    }
}

export const {Context, Provider} = createDataContext(fleetReducer, {createNewFleet: createNewFleet, editFleet: editFleet, deleteFleet: deleteFleet, editIcon: editIcon},
    []);