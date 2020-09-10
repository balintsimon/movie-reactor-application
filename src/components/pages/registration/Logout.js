import React from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        redirect();
    };

    const redirect = () => {
        history.push("/");
        window.location.reload();
    };

    return (<React.Fragment>{logout()}</React.Fragment>);
}

export default Logout;