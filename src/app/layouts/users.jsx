import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();
    const user = edit ? <EditUserPage id={userId}/> : <UserPage id={userId}/>;

    return (
        <>
            { userId
                ? user
                : <UsersListPage/>
            }
        </>);
};

export default Users;
