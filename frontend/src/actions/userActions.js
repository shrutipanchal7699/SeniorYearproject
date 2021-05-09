import Axios from "axios";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants"

export const signin= (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        const {data}= await Axios.post('http://localhost:5000/user/login', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("userToken", data.token);

        //const dataTemp = localStorage.getItem("userToken");
        //console.log(dataTemp)

    } catch (error){
        dispatch({ type: USER_SIGNIN_FAIL, 
        payload:
        error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
     });
    }

};

export const register= (name, email,password,location,certification) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email,password,location,certification}});
    try{
        // const {data}= await Axios.post('/api/users/register', {name, email, password});
        console.log(name +"  "+ email + " "+ location + " "+certification );
        const {data}= await Axios.post('http://localhost:5000/user/signup', {name, email,password,location,certification});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error){
        dispatch({ type: USER_REGISTER_FAIL, 
        payload:
        error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
     });
    }

};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGNOUT});
}