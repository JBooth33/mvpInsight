
//import React from 'react';
import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/userChart";

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

//import classNames from 'classnames';
import "./UserList.css";



// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });


//Gives each item in the list an ID
let id = 0;
function createData(companyID, firstName, lastName, phoneNumber, title, role, emailAddress, status) {
    id += 1;
    return { id, companyID, firstName, lastName, phoneNumber, title, role, emailAddress, status };
}

//Adds sorting functionality
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
    { id: 'companyID', numeric: false, disablePadding: true, label: 'Company ID' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'lastnName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
    { id: 'emailAddress', numeric: false, disablePadding: false, label: 'Email Address' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'dateCreated', numeric: false, disablePadding: false, label: 'Date Created' },
];

//Renders the table to whatever sort is specified
class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    componentDidMount() {
        this.getUsers();
    }

    EnhancedTableToolbar.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
    };

    EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

    const styles = theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
        },
        table: {
            minWidth: 1020,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    });


class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'companyID',
            selected: [],
            data: [
                createData(111, 'Jonathon', 'Engelien', 7153237605, 'CEO', 'Admin', 'jonathon.engelien@gmail.com', 'active'),
                createData(112, 'James', 'Smith', 7153237605, 'Accountant', 'Admin', 'jonathon.engelien@gmail.com', 'active'),
            ],
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render() {
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.companyID}
                                            </TableCell>
                                            <TableCell string>{n.firstName}</TableCell>
                                            <TableCell string>{n.lastName}</TableCell>
                                            <TableCell numeric>{n.phoneNumber}</TableCell>
                                            <TableCell string>{n.title}</TableCell>
                                            <TableCell string>{n.role}</TableCell>
                                            <TableCell string>{n.emailAddress}</TableCell>
                                            <TableCell string>{n.status}</TableCell>
                                            <TableCell string>{n.dateCreated}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                    </Col>
                </Row>
            </Container>
                );
            }
        }
        
        export default Users;
        
        ///////////////////////////// KEEP //////////////////////////
// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
// });


// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//     id += 1;
//     return { id, name, calories, fat, carbs, protein };
// }


// const data = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// function SimpleTable(props) {
//     const { classes } = props;

//     return (
//         <Paper className={classes.root}>
//             <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell numeric>User ID</TableCell>
//                         <TableCell numeric>Company ID</TableCell>
//                         <TableCell numeric>First Name</TableCell>
//                         <TableCell numeric>Last Name</TableCell>
//                         <TableCell numeric>Phone Number</TableCell>
//                         <TableCell numeric>Role</TableCell>
//                         <TableCell numeric>Email Address</TableCell>
//                         <TableCell numeric>Status</TableCell>
//                         <TableCell numeric>Date Created</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map(n => {
//                         return (
//                             <TableRow key={n.id}>
//                                 <TableCell component="th" scope="row" padding="none">
//                                     {n.ObjectID}
//                                 </TableCell>
//                                 <TableCell string>{n.companyID}</TableCell>
//                                 <TableCell string>{n.firstName}</TableCell>
//                                 <TableCell string>{n.lastName}</TableCell>
//                                 <TableCell numeric>{n.phoneNumber}</TableCell>
//                                 <TableCell string>{n.role}</TableCell>
//                                 <TableCell string>{n.emailAddress}</TableCell>
//                                 <TableCell string>{n.status}</TableCell>
//                                 <TableCell string>{n.dateCreated}</TableCell>
//                             </TableRow>
//                         );
//                     })}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// }

// SimpleTable.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTable);