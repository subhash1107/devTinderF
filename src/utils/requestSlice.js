import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            return state.filter(r=>r._id!=action.payload);
        },
        clearRequest:(state,action)=>{
            return []
        },
    }

})
export const{addRequest,removeRequest,clearRequest} = requestSlice.actions;
export default requestSlice.reducer;