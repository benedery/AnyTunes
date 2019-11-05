import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchUsers, deleteUser, getUserData } from '../store/actions/dataActions'
import { connect } from "react-redux";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './AdminPanel.css'

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

const AdminPanel = ({ fetchAllUsers, rows, handleDelete, getData }) => {

    useEffect(() => {
        fetchAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableHeadTitle}>User</TableCell>
                        <TableCell align="right" className={classes.tableHeadTitle}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                <p onClick={() => getData(row._id)} className="link-username">{row.username} </p>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleDelete(row._id)}><button className="delete-btn"><DeleteForeverIcon></DeleteForeverIcon></button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        rows: state.data.usersData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchUsers()),
        handleDelete: (id) => dispatch(deleteUser(id)),
        getData: (id) => dispatch(getUserData(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)