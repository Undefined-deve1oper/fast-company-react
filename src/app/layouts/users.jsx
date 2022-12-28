import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <UsersLoader>
            { userId ? (
                edit ? (
                    <EditUserPage/>
                ) : (
                    <UserPage userId={ userId }/>
                )
            ) : (
                <UsersListPage/>
            ) }
        </UsersLoader>
    );
};

export default Users;
