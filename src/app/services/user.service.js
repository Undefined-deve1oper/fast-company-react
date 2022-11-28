import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
    getUserById: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
};

export default userService;
