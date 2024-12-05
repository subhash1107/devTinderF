import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        },
        removeConnection:(state,action)=>{
            return [];
        },
        
    }
})
export const {addConnection,removeConnection}=connectionSlice.actions;
export default connectionSlice.reducer;