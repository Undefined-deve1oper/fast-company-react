import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();
    const userIndividuallyPage = edit ? <EditUserPage/> : <UserPage id={userId}/>;

    return (
        <>
            { userId
                ? userIndividuallyPage
                : <UsersListPage/>
            }
        </>);
};

export default Users;
