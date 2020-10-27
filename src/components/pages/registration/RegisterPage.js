import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./Register.css";
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
        history.push("/auth/login");
    };

    const sendRequest = (event) => {
        event.preventDefault();
        let dropdown = document.querySelector(".dropdown");
        let gender = dropdown.value;
        let params = {"username": username, "password": password, "firstname": firstname, "lastname": lastname, "email": email, "gender":gender};
        axios.post(`${API_AUTHENTICATION}/register`, params).then(response => checkResponse(response)) // TODO: check endpoint
    };

    return (
        <div className="register">
            <form className="register-form" onSubmit={sendRequest}>
                <div>
                    <input className="input-container" id="firstname" type="text" onChange={event => setFirstname(event.target.value)} required/>
                    <label for="firstname">first name</label>
                </div>
                <div>
                    <input className="input-container" id="lastname" type="text" onChange={event => setLastname(event.target.value)} required/>
                    <label for="lastname">last name</label>
                </div>
                    <select className="dropdown" defaultValue="MAN" name="gender" id="gender">
                        <option value="MAN">MALE</option>
                        <option value="WOMAN" >FEMALE</option>
                        <option value="GENERAL">PREFER NOT TO SAY</option>
                    </select>
                <div>
                    <input className="input-container" id="email" type="text" onChange={event => setEmail(event.target.value)} required/>
                    <label for="email">e-mail</label>
                </div>
                <div>
                    <input className="input-container" id="username" type="text" onChange={event => setUsername(event.target.value)} required/>
                    <label for="username">user name</label>
                </div>
                <div>
                    <input className="input-container" id="password" type="password" onChange={event => setPassword(event.target.value)} required/>
                    <label for="password">password</label>
                </div>
                <input type="submit" value="Register" className="button"/>
                { (message !== "") ?
                    <div className="errorMessage">{message}</div> : <div className="errorMessage"> </div>}
            </form>
        </div>
    )
}

export default RegisterPage;