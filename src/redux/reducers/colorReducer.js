import { DARK_MODE_OFF, DARK_MODE_ON } from "../actions/colorAction";

const initialState = {
    darkmode: localStorage.getItem("dark")
}

export const colorReducer = (state = initialState, action) => {
    switch(action.type) {
        case DARK_MODE_ON:
            return { ...state, darkmode: "On" };
        case DARK_MODE_OFF:
            return { ...state, darkmode: "Off" };
        default:
            return state;
    }
}


export const darkmodeSelector = (state) => state.color.darkmode