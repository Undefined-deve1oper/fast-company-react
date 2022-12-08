import { useMemo } from "react";

export const useFilter = (users, query) => {
    const searchAndSearchedUsers = useMemo(() => {
        return users.filter((user) => user.name?.toLowerCase().trim().includes(query.toLowerCase().trim()));
    }, [query, users]);

    return searchAndSearchedUsers;
};
