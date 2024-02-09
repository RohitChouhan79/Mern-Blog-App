import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    isAuth:false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        SignInUser:(state,action)=>{
            state.currentUser=action.payload;
            state.isAuth=true;
        }
    },
});

export const {SignInUser}=userSlice.actions;
export default userSlice.reducer;