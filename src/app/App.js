import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar/>

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={ Users }/>
                            <Route path="/login/:type?" component={ Login }/>
                            <Route path="/logout" component={LogOut}/>
                            <Route path="/" exact={ true } component={ Main }/>
                            <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>

            <ToastContainer/>
        </div>
    );
}

export default App;
