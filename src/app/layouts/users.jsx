import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUser";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                { userId ? (
                    edit ? (
                        <EditUserPage/>
                    ) : (
                        <UserPage id={ userId }/>
                    )
                ) : (
                    <UsersListPage/>
                )}
            </UserProvider>
        </>);
};

export default Users;
