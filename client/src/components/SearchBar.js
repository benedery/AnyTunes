import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import { searchResult } from "../store/actions/dataActions";
import { connect } from "react-redux";
import './SearchBar.css';

const SearchBar = ({ handleSearch }) => {
    const [searchInput, setSearchInput] = useState("");
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(searchInput);
        }
    };
    const handleSearchBtnPress = (e) => {
        e.preventDefault()
        handleSearch(searchInput)
    }
    return (
        <div>
            <h2>Search For Song/Artist</h2>
            <form>
                <Input
                    id="searchInput"
                    onChange={e => handleInputChange(e)}
                    autoFocus={true}
                    value={searchInput}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="searchbar-search-btn"
                    onClick={(e) => handleSearchBtnPress(e)}
                >
                    Submit
          </button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch, searchInput) => {
    return {
        handleSearch: (searchInput) => dispatch(searchResult(searchInput))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SearchBar);
