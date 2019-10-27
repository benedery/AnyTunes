import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchQueries } from '../store/actions/authActions'
import { connect } from "react-redux";

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

const TopTen = ({ fetchTopTen, rows }) => {

    useEffect(() => {
        fetchTopTen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableHeadTitle}>Search Term</TableCell>
                        <TableCell align="right" className={classes.tableHeadTitle}>Time Searched</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.timeSearched}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        rows: state.auth.queries
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopTen: () => dispatch(fetchQueries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTen)