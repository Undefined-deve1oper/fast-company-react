import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/qualities.service";
import { isOutdated } from "../utils/date";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualitiesService.fetchAll();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        return qualitiesIds.map((qualId) => state.qualities.entities.find((quality) => quality._id === qualId));
    }
    return [];
};

export default qualitiesReducer;
