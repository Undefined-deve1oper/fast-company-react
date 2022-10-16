import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Main</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/users">Users</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
