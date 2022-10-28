import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/navBar";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/login" component={Login}/>
                <Route path="/" exact component={Main}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    );
}

export default App;
