import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from './components/Header'
import { dataReducer, dataInitState } from './store/reducers/dataReducer';
import { CHANGE_SEARCH_INPUT, FETCHING_STARTED, CLEAR_SEARCH_TERM, SET_USERS, LOGOUT_SUCCESS } from './store/actions/types';

it('App Contains Header Comp', () => {
  const wrapper = shallow(<App />);
  const header = wrapper.find('header');
  expect(header).toBeTruthy()
});

describe('Data Reducer', () => {

  it('should return default state', () => {
    const newState = dataReducer(undefined, {});
    expect(newState).toEqual(dataInitState)
  });

  it('should change search input state', () => {
    const newState = dataReducer(undefined, { type: CHANGE_SEARCH_INPUT, payload: "anyvision" });
    expect(newState).toEqual({
      ...dataInitState,
      searchTerm: "anyvision"
    })
  });

  it('should change search input state', () => {
    const newState = dataReducer(undefined, { type: CHANGE_SEARCH_INPUT, payload: "ben" });
    expect(newState).toEqual({
      ...dataInitState,
      searchTerm: "ben"
    })
  });

  it('should change isFetching to true', () => {
    const newState = dataReducer(undefined, { type: FETCHING_STARTED });
    expect(newState).toEqual({
      ...dataInitState,
      isFetching: true
    })
  });

  it('should clear search term', () => {
    const newState = dataReducer(undefined, { type: CLEAR_SEARCH_TERM });
    expect(newState).toEqual({
      ...dataInitState,
      searchTerm: null
    })
  });

  it('should set users state', () => {
    const newState = dataReducer(undefined, { type: SET_USERS, payload: "what ever" });
    expect(newState).toEqual({
      ...dataInitState,
      usersData: "what ever"
    })
  });

  it('should change state after logout action', () => {
    const newState = dataReducer(undefined, { type: LOGOUT_SUCCESS });
    expect(newState).toEqual({
      ...dataInitState,
      searchTerm: null,
      isFetching: false,
      resultsData: [],
    })
  });




})

