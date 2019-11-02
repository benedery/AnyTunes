import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import './AdminPanel.css'
import { getUserData } from '../store/actions/dataActions';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '50px auto',
        maxWidth: 400,
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
    },
    tableHead: {
        background: 'linear-gradient(-30deg, #d754ad 0%, #d754ad 10%, #f96785 62%, #fe7333 100%)',
    },
    tableHeadTitle: {
        color: 'white',
        fontWeight: "bolder",
        fontSize: '1.2rem'
    }
}));

const UserDetails = ({ user, getData, match, isAdmin, querisCount }) => {
    console.log(querisCount)

    useEffect(() => {
        getData(match.params.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableHeadTitle}>User</TableCell>
                        <TableCell align="right" className={classes.tableHeadTitle}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Username
                        </TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            User ID
                        </TableCell>
                        <TableCell align="right">{user._id}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            Queries
                        </TableCell>
                        <TableCell align="right">{querisCount}</TableCell>
                    </TableRow>
                    {user.queries.map(query => (
                        <TableRow key={query.name}>
                            <TableCell component="th" scope="row">
                                {query.name}
                            </TableCell>
                            <TableCell align="right">{query.timeSearched}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow >
                        <TableCell component="th" scope="row">
                            <Button className="btn-delete">DELETE USER</Button>
                        </TableCell>
                        <TableCell align="right">
                            <Button className="btn-reset">RESET QUERIES</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.data.uniqueUserData[0],
        isAdmin: state.data.uniqueUserData[0].isAdmin,
        querisCount: state.data.uniqueUserData[0].queries.reduce((acc, curr) => {
            return acc + curr.timeSearched
        }, 0)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (id) => dispatch(getUserData(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)