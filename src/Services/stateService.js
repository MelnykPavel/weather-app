import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const initialState = {
  showSearchBar: false,
  searchParams: {
    lat: 59.437,
    lon: 24.7536,
    units: "metric",
    lang: "en",
    city: "Tallinn",
  },
  forecastSelectedData: null,
  errorMessage: null,
};

export const setSearchParams = createAction("setSearchParams");
export const setShowSearchBar = createAction("setShowSearchBar");
export const setForecastSelectedData = createAction("setForecastSelectedData");
export const setErrorMessage = createAction("setErrorMessage");

const reducer = createReducer(initialState, {
  [setSearchParams]: (iState, action) => {
    iState.searchParams = action.payload;
  },
  [setShowSearchBar]: (iState, action) => {
    iState.showSearchBar = action.payload;
  },
  [setForecastSelectedData]: (iState, action) => {
    iState.forecastSelectedData = action.payload;
  },
  [setErrorMessage]: (iState, action) => {
    iState.errorMessage = action.payload;
  },
});

export const store = configureStore({ reducer });
