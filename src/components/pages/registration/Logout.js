import React from "react";
import axios from "axios";
import "./../../../Constants";
import {API_AUTHENTICATION} from "../../../Constants";

const Logout = () => {

    const logout = () => {
        localStorage.clear();
        axios.post(`${API_AUTHENTICATION}/logout`, {}, {withCredentials: true})
            .then(() => {
                window.location.href = "/";
            });
    };

    return (<React.Fragment>{logout()}</React.Fragment>);
}

export default Logout;