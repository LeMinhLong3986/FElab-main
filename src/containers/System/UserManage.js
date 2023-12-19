import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import * as React from 'react';

import './UserManager.scss'

import { getAllUser, creatNewUserService, deleteUser, editUser } from '../../services/userService';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';
import Tooltip from '@mui/material/Tooltip'
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    state = {

    }
    async componentDidMount() {
        await this.getAllUserFormReact()
    }

    getAllUserFormReact = async () => {
        let response = await getAllUser('All')
        if (response && response.errCode === 0) {
            //setState la ham bat dong bo
            this.setState({
                arrUsers: response.users,
            })
        }
    }
    handleAddNewUsers = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    creatNewUser = async (data) => {
        try {
            let response = await creatNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFormReact()
                this.state({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUser(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFormReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = async (user) => {
        // console.log('check edit user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUser(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,

                })
                await this.getAllUserFormReact()
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }
    }
    divStyle = () => {

    }

    render() {

        let arrUsers = this.state.arrUsers
        return (

            <div
                className="users-container"
            >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    creatNewUser={this.creatNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center'>
                    Lab members
                </div>
                <div className='px-3 '>
                    <Button startIcon={<AddBoxIcon />} sx={{
                        color: 'white',
                        bgcolor: '#2e86de',
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        pl: 2,
                        py: 1,
                        ':hover': {
                            bgcolor: '#2980b9',
                        },
                        textTransform: 'none',

                    }}
                        onClick={() => this.handleAddNewUsers()}>
                        Add New Members
                    </Button>

                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
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

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
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
                </div>
            </div >
        )
    }
}



const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
