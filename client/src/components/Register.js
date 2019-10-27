import { useState } from "react";
import React from "react";
import './Register.css'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { registerUser } from '../store/actions/authActions'


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = ({ handleRegister, error, props }) => {
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = { username, password }
        console.log(newUser)
        handleRegister(newUser)
    }
    return (
        <Container component="main" maxWidth="xs" onSubmit={e => handleSubmit(e)}>
            <h1>Welcome To AnyTunes</h1>
            <h3>Please Register</h3>
            <CssBaseline />
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
          </Button>
            </form>
            <Box mt={8}>
            </Box>
        </Container >
    );
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: (newUser) => dispatch(registerUser(newUser))
    }
}
export default connect(mapStateToProps,
    mapDispatchToProps
)(Register)