import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./Authentication.css";
import { API_AUTHENTICATION } from "../../../Constants";

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const checkResponse = (response) => {
        if (response.data.correct) {
            localStorage.setItem("token", response.data.token)
            redirect();
        } else {
            setMessage(response.data.msg);
        }
    };

    const redirect = () => {
        history.push("/auth/login"); // TODO: check endpoint
    };

    const sendRequest = (event) => {
        event.preventDefault();
        let dropdown = document.querySelector(".dropdown");
        let gender = dropdown.value;
        let params = {"username": username, "password": password, "firstname": firstname, "lastname": lastname, "email": email, "gender":gender};
        axios.post(`${API_AUTHENTICATION}/register`, params).then(response => checkResponse(response)) // TODO: check endpoint
    };

    return (
        <div className="login">
            <form className="form" onSubmit={sendRequest}>
                    <input className="input" type="text" placeholder="firstname" onChange={event => setFirstname(event.target.value)} required/>
                    <input className="input" type="text" placeholder="lastname" onChange={event => setLastname(event.target.value)} required/>
                    <select className="dropdown" defaultValue="MAN" name="gender" id="gender">
                        <option value="MAN">MAN</option>
                        <option value="WOMAN">WOMAN</option>
                        <option value="GENERAL">GENERAL</option>
                    </select>
                    <input className="input" type="text" placeholder="email" onChange={event => setEmail(event.target.value)} required/>
                    <input className="input" type="text" placeholder="username" onChange={event => setUsername(event.target.value)} required/>
                    <input className="input" type="password" placeholder="password" onChange={event => setPassword(event.target.value)} required/>
                    <input type="submit" value="Register" className="button"/>
                { (message !== "") ?
                    <div className="errorMessage">{message}</div> : <div className="errorMessage"> </div>}
            </form>
        </div>
    )
}

export default RegisterPage;