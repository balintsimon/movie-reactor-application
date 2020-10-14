import React, {useState} from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {API_AUTHENTICATION} from "../../../Constants";
import "./Authentication.css";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const checkResponse = (response) => {
        if (response.data.correct) {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("gender", response.data.gender);
            window.location.href = "/";
        } else {
            setMessage(response.data.msg);
        }
    };

    const sendRequest = (event) => {
        event.preventDefault();
        let params = {"username": username, "password": password}; // TODO: check how to prevent this information from being intercepted?
        axios
            .post(`${API_AUTHENTICATION}/login`, params, {withCredentials: true})
            .then(response => checkResponse(response))
    };

    return (
        <div className="login">
            <form className="form" onSubmit={sendRequest}>
                <input className="input" type="text" placeholder="username" onChange={event => setUsername(event.target.value)} required/>
                <input className="input" type="password" placeholder="password" onChange={event => setPassword(event.target.value)} required/>
                <input type="submit" value="Login" className="button"/>
                <div className="registerLink" >
                    <RouterLink className="registerLink" to="/auth/register">Not registered yet? Register</RouterLink>
                </div>
                { (message !== "") ?
                    <div className="errorMessage">{message}</div> : <div className="errorMessage"> </div>}
            </form>
        </div>
    )
}

export default LoginPage;