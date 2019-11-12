import Axios from 'axios'
import history from '../../history/history'
import { FINISH_LOADING, CHANGE_SEARCH_INPUT, FETCHING_STARTED, UPDATE_RESULTS_DATA, CLEAR_SEARCH_TERM, SET_USERS, GET_ERROR, SET_USER, FETCHING_FINISH } from './types'

export const updateQuery = (dispatch, getState, SearchTerm) => {
    const searchTermLowercase = SearchTerm.toLowerCase()
    const token = getState().auth.token
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        data: {
            "query": `${searchTermLowercase}`
        }
    }
    if (token) { config.headers['x-auth-token'] = token; }

    return Axios.post('http://localhost:4005/query', null, config)
        .then(res => {
            dispatch({ type: FINISH_LOADING })
        }).catch(err => console.log(err))
}

export const searchResult = (searchInput) => {
    return dispatch => {
        dispatch({ type: CHANGE_SEARCH_INPUT, payload: searchInput });
    };
};


// export const fetchFullResultData = (trackId) => {
//     return (dispatch) => {
//         dispatch({ type: FETCHING_STARTED })
//         return fetch(`https://itunes.apple.com/search?term=${trackId}`)
//             .then(res => res.json())
//             .then(apiData => {
//                 setTrackData(apiData.results[0])
//                 dispatch({ type: FETCHING_FINISH })
//             })
//             .catch(err => console.log(err));
//     }
// }


export const fetchingSearchTerm = (SearchTerm) => {
    return (dispatch, getState) => {
        return fetch(
            `http://localhost:4005/api/search/${SearchTerm}`
        ).then(res => res.json())
            .then(apiData => {
                dispatch({ type: FETCHING_STARTED });
                dispatch({ type: UPDATE_RESULTS_DATA, payload: apiData.results })
                updateQuery(dispatch, getState, SearchTerm)
            })
            .catch(err => console.log(err));
    }
}

export const goBackFromItem = () => {
    return dispatch => {
        dispatch({ type: CLEAR_SEARCH_TERM });
        history.push('/index')
    }
}

export const fetchUsers = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if (token) { config.headers['x-auth-token'] = token; }

        return Axios.get('http://localhost:4005/users/allusers', config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    dispatch({ type: SET_USERS, payload: res.data })
                }
            })
            .catch(err => dispatch({ type: GET_ERROR, payload: err }))
    }
}

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if (token) { config.headers['x-auth-token'] = token; }

        return Axios.delete(`http://localhost:4005/users/deleteuser/${id}`, config)
            .then(res => {
                dispatch({ type: SET_USERS, payload: res.data.users })
                history.push('/admin')
            })
            .catch(err => dispatch({ type: GET_ERROR, payload: err }))
    }
}

export const getUserData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_STARTED })
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if (token) { config.headers['x-auth-token'] = token; }

        return Axios.get(`http://localhost:4005/users/data/${id}`, config)
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: SET_USER, payload: res.data })
                    dispatch({ type: FETCHING_FINISH })
                    history.push(`admin/${id}`)
                }
            })
            .catch(err => dispatch({ type: GET_ERROR, payload: err }))
    }
}

export const resetUserQueries = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_STARTED })
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if (token) { config.headers['x-auth-token'] = token; }

        return Axios.get(`http://localhost:4005/query/reset/${id}`, config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    dispatch({ type: SET_USER, payload: res.data })
                    dispatch({ type: FETCHING_FINISH })
                }
            })
            .catch(err => dispatch({ type: GET_ERROR, payload: err }))
    }
}


