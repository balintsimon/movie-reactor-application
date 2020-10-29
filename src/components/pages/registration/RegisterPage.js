import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./Register.css";
import { API_AUTHENTICATION } from "../../../Constants";

const RegisterPage = () => {
    let usernameFieldMessage = "Must be at least 6 characters long.";
    let passwordFieldMessage = "Must contain at least a number, " +
        "an upper and a lower case letter " +
        "and must be at least 8 characters long.";

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

    function displayPswdCheckMessage() {
        document.getElementById("pswd_message").style.display = "block";
    }

    function hidePswdCheckMessage() {
        document.getElementById("pswd_message").style.display = "none";
    }

    function displayUsernameMessage() {
        document.getElementById("username_message").style.display = "block";
    }

    function hideUsernameCheckMessage() {
        document.getElementById("username_message").style.display = "none";
    }

    function checkUsernameContent() {
        let usernameLength = 6;
        let lengthField = document.getElementById("username_length");
        let usernameField = document.getElementById("username");
        checkFieldLength(usernameLength, lengthField, usernameField);
    }

    function checkPswdContent() {
        let lowerCaseLetters = /[a-zá-üűő]/g;
        let capitalLetters = /[A-ZÁ-ÜŰÖŐ]/g;
        let numbers = /[0-9]/g;
        let pswdLength = 8;
        let lowerCaseLetterCheckField = document.getElementById("letter");
        let capitalLetterCheckField = document.getElementById("capital");
        let numberCheckField = document.getElementById("number");
        let length = document.getElementById("length");
        let passwordField = document.getElementById("password");

        checkFieldContains(lowerCaseLetters, lowerCaseLetterCheckField, passwordField);
        checkFieldContains(capitalLetters, capitalLetterCheckField, passwordField);
        checkFieldContains(numbers, numberCheckField, passwordField);
        checkFieldLength(pswdLength, length, passwordField);
        hidePasswordLabel();
    }

    function checkFieldContains(regex, fieldToModify, fieldToWatch) {
        if (fieldToWatch.value.match(regex)) {
            fieldToModify.classList.remove("invalid");
            fieldToModify.classList.add("valid");
        } else {
            fieldToModify.classList.remove("valid");
            fieldToModify.classList.add("invalid");
        }
    }

    function checkFieldLength(pswdLength, fieldToModify, fieldToWatch) {
        if (fieldToWatch.value.length >= pswdLength) {
            fieldToModify.classList.remove("invalid");
            fieldToModify.classList.add("valid");
        } else {
            fieldToModify.classList.remove("valid");
            fieldToModify.classList.add("invalid");
        }
    }

    function hidePasswordLabel() {
        let passwordField = document.getElementById("password");
        let field = document.getElementById("passwordlabel");
        if (passwordField.value.length !== 0) {
            field.style.display = "none";
            passwordField.style.marginBottom = "16px";
        } else {
            field.style.display = "";
            passwordField.style.marginBottom = "10px";
        }
    }

    return (
        <div className="register">
            <form className="register-form" onSubmit={sendRequest}>
                <div>
                    <input
                        className="input-container"
                        id="firstname"
                        type="text"
                        onChange={event => setFirstname(event.target.value)}
                        required
                    />
                    <label for="firstname">first name</label>
                </div>
                <div>
                    <input
                        className="input-container"
                        id="lastname"
                        type="text"
                        onChange={event => setLastname(event.target.value)}
                        required
                    />
                    <label for="lastname">last name</label>
                </div>
                    <select className="dropdown" defaultValue="MAN" name="gender" id="gender">
                        <option value="MAN">MALE</option>
                        <option value="WOMAN" >FEMALE</option>
                        <option value="GENERAL">PREFER NOT TO SAY</option>
                    </select>
                <div>
                    <input
                        className="input-container"
                        id="email"
                        type="text"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                    <label for="email">e-mail</label>
                </div>
                <div>
                    <input
                        className="input-container"
                       id="username"
                       // pattern="(?=.*[a-z]).{6,}"
                       title={usernameFieldMessage}
                       type="text"
                       onChange={event => setUsername(event.target.value)}
                       onFocus={displayUsernameMessage}
                       onBlur={hideUsernameCheckMessage}
                       onKeyUp={checkUsernameContent}
                       required
                    />
                    <label for="username">user name</label>
                </div>
                <div>
                    <input
                        className="input-container"
                       id="password"
                       pattern="(?=.*\d)(?=.*[a-zá-üűő])(?=.*[A-ZÁ-ÜŰÖŐ]).{8,}"
                       title={passwordFieldMessage}
                       type="password"
                       onChange={event => setPassword(event.target.value)}
                       onFocus={displayPswdCheckMessage}
                       onBlur={hidePswdCheckMessage}
                       onKeyUp={checkPswdContent}
                       required
                    />
                    <label id="passwordlabel" for="password">password</label>
                </div>
                <input type="submit" value="Register" className="button"/>
                { (message !== "") ?
                    <div className="errorMessage">{message}</div> : <div className="errorMessage"> </div>}
                <div id="username_message">
                    <h5>User name must:</h5>
                    <div id="username_length" className="invalid">be at least 6 characters long</div>
                </div>
                <div id="pswd_message">
                    <h5>Password must:</h5>
                    <div id="letter" className="invalid">contain a lowercase letter</div>
                    <div id="capital" className="invalid">contain a capital (uppercase) letter</div>
                    <div id="number" className="invalid">contain a number</div>
                    <div id="length" className="invalid">be at least 8 characters</div>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;