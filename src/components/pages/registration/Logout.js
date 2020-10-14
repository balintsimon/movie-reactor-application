import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./../../../Constants";
import {API_AUTHENTICATION} from "../../../Constants";

const Logout = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        axios.post(`${API_AUTHENTICATION}/logout`)
            .then(() => {
                window.location.href = "/";
            });
    };

    return (<React.Fragment>{logout()}</React.Fragment>);
}

export default Logout;