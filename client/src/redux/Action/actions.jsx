import axios from '../../config/axios';
import { SignInUser} from "../user/userSlice"


export const asyncCurrenUser = () => async (dispatch,getState)=>{
   
        try {
            const {data}= await axios.post("/api/User/CurrentUser")
            console.log('data', data);
            dispatch(SignInUser(data.User));
        } catch (error) {
            console.log(error.message, 'errorssssss');
        }
    }
    

export const asyncsignup = (user) => async (dispatch, getState) => {
    try {
       const {data} = await axios.post("/api/auth//Signup", user);
       console.log(data,'tata')
        dispatch(asyncCurrenUser())
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncsignin = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/api/auth/Signin", user);
        dispatch(asyncCurrenUser())
        
    } catch (error) {
        console.log(error.response.data);
    }
};