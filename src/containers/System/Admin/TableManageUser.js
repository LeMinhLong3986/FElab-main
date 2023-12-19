
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManagerUser.scss'
import * as actions from '../../../store/actions'
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'


class TableManagerUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }

    }
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.usersRedux
        return (
            <React.Fragment>
                <table id="TableManagerUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.role}</td>
                                    <td>{item.isActive}</td>
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                            <Tooltip title='Edit this members' >
                                                <EditIcon
                                                    sx={{
                                                        color: '#F79F1F',
                                                        borderColor: '#F79F1F',
                                                        '&:hover': { borderColor: '#EE5A24' },
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        this.handleEditUser(item)
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Delete this members' >
                                                <DeleteIcon
                                                    sx={{
                                                        color: '#eb2f06',
                                                        borderColor: '#e55039',
                                                        '&:hover': { borderColor: '#b71540' },
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        this.handleDeleteUser(item)
                                                    }}

                                                />
                                            </Tooltip>
                                        </Box>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )


    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);


