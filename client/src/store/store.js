import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import dataReducer from "./reducers/dataReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
});

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};
const presistedState = loadState();

const store = createStore(rootReducer, presistedState, applyMiddleware(thunk, logger));

store.subscribe(() => {
    saveState({
        data: store.getState().data,
        auth: store.getState().auth
    });
});

export default store;
