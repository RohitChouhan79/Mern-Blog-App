
import axios from '../../config/axios';
import { SignInUser, signinFailure,} from "../user/userSlice"





export const asyncCurrenUser = (user) => async (dispatch,getState)=>{

        try {
            const {data}= await axios.post("/api/User/CurrentUser",user)
            // console.log(data,"saksna");
            dispatch(SignInUser(data.User));
        } catch (error) {
            signinFailure(error.message)
        }
    }
    

export const asyncsignup = (user) => async (dispatch, getState) => {
    try {
       const {data} = await axios.post("/api/auth//Signup", user);
       console.log(data,'tata')
        dispatch(asyncCurrenUser(data))
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncsignin = (user) => async (dispatch, getState) => {
    try {
        const {data}=await axios.post("/api/auth/Signin", user);
        dispatch(asyncCurrenUser(data))
        
    } catch (error) {
        signinFailure(error.message)
    }
};

export const asyncGooglesignin = (user) => async (dispatch, getState) => {
    try {
        const response = await axios.post("/api/auth/google", {
            name: user.user.displayName,
            email: user.user.email,
            googlePhotoURL: user.user.photoURL,
        });
        const data = response.data; // Capture the response data
        console.log(data);
        dispatch(asyncCurrenUser(data));
    } catch (error) {
        dispatch(signinFailure(error.message));
    }
}


export const asyncUpdateUSer=(id,user) => async (dispatch,getState)=>{
    await axios.post(`/api/User/update/${id}`,user)
}