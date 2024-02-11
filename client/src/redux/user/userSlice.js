import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    isAuth:false,
    error:null,
    loading:false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        SignInUser:(state,action)=>{
            state.currentUser=action.payload;
            state.isAuth=true;
            state.loading=false,
            state.error=null;
        },
        signinFailure:(state,action)=>{
            state.loading=false
            state.currentUser=null
            state.isAuth=false,
            state.error=action.payload
        }
    },
});

export const {SignInUser,signinStart,signinFailure}=userSlice.actions;
export default userSlice.reducer;