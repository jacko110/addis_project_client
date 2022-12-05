import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Alert = {
    message: string;
    isError: boolean;
}

const initialState: Alert[] = [];

const alertSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.push(action.payload);
        },
        removeAlert: (state, action: PayloadAction<Alert>) => {            
            let new_state = state.filter(alert => alert.message !== action.payload.message)
            state.splice(0, state.length, ...new_state);
        }
    }
});

export const { addAlert, removeAlert } = alertSlice.actions;
export type AlertState = ReturnType<typeof alertSlice.reducer>;
export type AlertAction = ReturnType<typeof addAlert>;
export default alertSlice.reducer;