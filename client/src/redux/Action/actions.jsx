
import axios from '../../config/axios';
import { SignInUser, signinFailure, updateFailure, updateUser} from "../user/userSlice"





export const asyncCurrenUser = () => async (dispatch,getState)=>{
   
        try {
            const {data}= await axios.post("/api/User/CurrentUser")
            console.log('data', data);
            dispatch(SignInUser(data.User));
        } catch (error) {
            signinFailure(error.message)
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
        const {data}=await axios.post("/api/auth/Signin", user);
        dispatch(asyncCurrenUser())
        
    } catch (error) {
        signinFailure(error.message)
    }
};

export const asyncGooglesignin=(user) => async (dispatch,getState)=>{
    try {
        // console.log({name:user.user.displayName},"hiii");
        await axios.post("/api/auth/google",{
            name:user.user.displayName,
            email:user.user.email,
            googlePhotoURL:user.user.
            photoURL,
        });
        dispatch(asyncCurrenUser())
    } catch (error) {
        dispatch(signinFailure(error.message))
    }
}

export const asyncUpdateUSer=(id,user) => async (dispatch,getState)=>{
    await axios.post(`/api/User/update/${id}`,user)
}