import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Searchbar from "../../common/Searchbar";
import { useFilter } from "../../../hooks/useFilter";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());

    const currentUserId = useSelector(getCurrentUserId());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 8;

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };
    const handleSearchQuery = (value) => {
        setSelectedProf(undefined);
        setSearchQuery(value);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            const searchedUsers = useFilter(data, searchQuery);
            const selectedUsersProf = selectedProf
                ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : data;

            const filteredUsers = searchQuery
                ? searchedUsers // Список юзеров отфильтрованных по поиску
                : selectedUsersProf; // Список юзеров отфильтрованных по професси

            return filteredUsers.filter((user) => user._id !== currentUserId);
        }

        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                { professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={ selectedProf }
                            items={ professions }
                            onItemSelect={ handleProfessionSelect }
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={ clearFilter }
                        >
                            Очистить
                        </button>
                    </div>
                ) }
                <div className="d-flex flex-column">
                    <SearchStatus length={ count }/>
                    <Searchbar value={ searchQuery } onChange={ handleSearchQuery }/>
                    { count > 0 && (
                        <UserTable
                            users={ usersCrop }
                            onSort={ handleSort }
                            selectedSort={ sortBy }
                            onToggleBookMark={ handleToggleBookMark }
                        />
                    ) }
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={ count }
                            pageSize={ pageSize }
                            currentPage={ currentPage }
                            onPageChange={ handlePageChange }
                        />
                    </div>
                </div>
            </div>
        );
    }
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
