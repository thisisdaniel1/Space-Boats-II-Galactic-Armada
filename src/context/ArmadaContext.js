import createDataContext from "./createDataContext";

const armadaReducer = (state, action) => {
    switch(action.type){
        // creates three new fleets for each wing tagged as enemies
        case "generateEnemyFleets":
            return [...state, {enemy: true, wing: "left", attack: 50 * action.payload.level, defense: 50 * action.payload.level},
                    {enemy: true, wing: "center", attack: 50 * action.payload.level, defense: 50 * action.payload.level},
                    {enemy: true, wing: "right", attack: 50 * action.payload.level, defense: 50 * action.payload.level}]
        
        case "updateArmadaWings":
            // saw chatgpt doing this, makes more sense and saves me from having to type "action.payload" a bunch
            const { wing, attack, defense } = action.payload;

            // for each wing, return that wing with the updated stats
            return state.map((armadaWing) => 
                armadaWing.wing === wing ? {...armadaWing, attack, defense} : armadaWing
            )
        case "resetArmadaWings":
            return state.map((armadaWing) => ({
                ...armadaWing,
                attack: 0,
                defense: 0
            }))
        default:
            return state;
    }
}

const generateEnemyFleets = (dispatch) => {
    return (level) => {
        dispatch({ type: "generateEnemyFleets", payload: {level: level}})
    }
}

const updateArmadaWings = (dispatch) => {
    return (wing, attack, defense) => {
        dispatch({ type: "updateArmadaWings", payload: {wing, attack, defense} })
    }
}

const resetArmadaWings = (dispatch) => {
    return () => {
        dispatch({type: "resetArmadaWings"})
    }
}

export const {Context, Provider} = createDataContext(armadaReducer, {generateEnemyFleets: generateEnemyFleets, updateArmadaWings: updateArmadaWings, resetArmadaWings},
    [{wing: "left", attack: 0, defense: 0}, {wing: "center", attack: 0, defense: 0}, {wing: "right", attack: 0, defense: 0}]);