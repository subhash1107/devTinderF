import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state,action)=>{
            const newFeed = state.filter(n=>n._id!=action.payload)
            return newFeed;
        },
        clearFeed:(state,action)=>{
            return null;
        }
    },
})

export const{addFeed,removeFeed,clearFeed} = feedSlice.actions;
export default feedSlice.reducer;