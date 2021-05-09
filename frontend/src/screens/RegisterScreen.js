import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){
    const dispatch= useDispatch();

    const[name, setName]= useState('');
    const[email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [location, setLocation]= useState('');
    const [certification, setCertification]= useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state)=> state.userRegister);
    const {userInfo,loading, error} = userRegister;
    
    const submitHandler= (e)=> {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match!');
        }else{
            console.log(name +"  "+ email + " "+ location + " "+certification );
            dispatch(register(name, email,password,location,certification));
        }
        
    }

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
        }
    },
    [props.history,redirect, userInfo]);

    return (
        <div>
            <form className = "form" onSubmit= {submitHandler}>
                <div>
                    <h1> Register as a New User</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant= "danger">{error}</MessageBox> }
                <div>
                    <label htmlFor= "name"> Name</label>
                    <input 
                    type= "text" 
                    id= "name" 
                    placeholder= "Enter your Name: " 
                    required
                    onChange= { (e)=> setName(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor= "email"> Email address</label>
                    <input 
                    type= "email" 
                    id= "email" 
                    placeholder= "Enter your email address" 
                    required
                    onChange= { (e)=> setEmail(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor= "password"> Password</label>
                    <input 
                    type= "password" 
                    id= "password" 
                    placeholder= "Enter a strong password" 
                    required
                    onChange= { (e)=> setPassword(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor= "confirmPassword"> Confirm Password</label>
                    <input 
                    type= "password" 
                    id= "confirmPassword" 
                    placeholder= "Re-enter your password: " 
                    required
                    onChange= { (e)=> setConfirmPassword(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor= "location"> Enter your location: </label>
                    <input 
                    type= "text" 
                    id= "location" 
                    placeholder= "enter location: " 
                    required
                    onChange= { (e)=> setLocation(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor= "certification"> Enter your Certification: </label>
                    <input 
                    type= "text" 
                    id= "certification" 
                    placeholder= "enter certification: " 
                    required
                    onChange= { (e)=> setCertification(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label/>
                    <button className = "primary" type = "submit">
                    Register
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account ? {' '}
                        <Link to = "/signin"> Sign - In</Link>
                    </div>
                </div>


            </form>
        </div>
    )
}
