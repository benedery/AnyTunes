import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import './Header.css'
import { logout } from "../store/actions/authActions";

const Header = ({ isLoggedIn, handleLogout, admin }) => {
    const adminPanel = () => {
        if (admin) {
            return (
                <React.Fragment>
                    <Typography variant="h6" className="subheader__title">
                        <NavLink to="/admin" style={{ textDecoration: "none" }} activeClassName="selected" >
                            User Managment
                        </NavLink>
                    </Typography>
                </React.Fragment>
            )
        }
        else return null
    };
    return (
        <div>
            <AppBar position="static" className="header__root">
                <Toolbar>
                    <div className="header_toolbar">
                        <Typography variant="h6" className="header__title">
                            <Link to="/index" style={{ textDecoration: "none", color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
                                AnyTunes
                         </Link>
                        </Typography>
                    </div>
                    <div id="header__submenu">
                        {!isLoggedIn &&
                            <React.Fragment>
                                <Typography variant="h6" className="subheader__title">
                                    <NavLink to="/" style={{ textDecoration: "none" }} activeClassName="selected" >
                                        Login
                                       </NavLink>
                                </Typography>
                                <Typography variant="h6" className="subheader__title">
                                    <NavLink to="/register" style={{ textDecoration: "none" }} activeClassName="selected">
                                        Register
                                       </NavLink>
                                </Typography>
                            </React.Fragment>
                        }
                        {isLoggedIn &&
                            <React.Fragment>
                                {adminPanel()}
                                <Typography variant="h6" className="subheader__title">
                                    <NavLink to="/topten" style={{ textDecoration: "none", fontWeight: "bold" }} activeClassName="selected" >
                                        TOP 10
                                                          </NavLink>
                                </Typography>
                                <Typography variant="h6" className="subheader__title">
                                    <NavLink to="/" style={{ textDecoration: "none" }} activeClassName="selected" onClick={handleLogout}>
                                        Logout
                                                          </NavLink>
                                </Typography>
                            </React.Fragment>
                        }

                    </div>
                </Toolbar>
            </AppBar>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        admin: state.auth.user.isAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => dispatch(logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)