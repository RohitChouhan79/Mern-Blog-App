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
            state.loading=false;
            state.currentUser=null;
            state.isAuth=false;
            state.error=action.payload;
        },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateUser:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=action.payload;
        },
        deleteStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUser:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteFailure:(state,action)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=action.payload;
        },
        signoutStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signoutUser:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
            state.isAuth=false;
        },
        signoutFailure:(state,action)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=action.payload;
        }
    },
});

export const {SignInUser,signinStart,signinFailure,updateStart,updateFailure,updateUser,deleteStart,deleteFailure,deleteUser,signoutStart,signoutUser,signoutFailure}=userSlice.actions;
export default userSlice.reducer;