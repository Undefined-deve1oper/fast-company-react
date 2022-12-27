import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList());
    }, []);

    return (
        <div>
            <AuthProvider>
                <NavBar/>

                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={ Users }/>
                    <Route path="/login/:type?" component={ Login }/>
                    <Route path="/logout" component={LogOut}/>
                    <Route path="/" exact={ true } component={ Main }/>
                    <Redirect to="/"/>
                </Switch>
            </AuthProvider>

            <ToastContainer/>
        </div>
    );
}

export default App;
