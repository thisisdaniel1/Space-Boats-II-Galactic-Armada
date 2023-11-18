import React, {useReducer} from "react";

// actions contains all the helper functions the reducer may need to call dispatch with
export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions = {};
        for (let key in actions){
            // key === "createNewFleet"
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={ {state: state, ...boundActions} }>
            {children}
        </Context.Provider>
    }

    return {Context, Provider};
}