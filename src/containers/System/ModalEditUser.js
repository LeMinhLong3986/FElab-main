
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            role: '',
            statusM: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                statusM: user.statusM,
            })
        }
        console.log('didmount edit modal', this.props.currentUser)
    }
    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeAddUser = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValue = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phone', 'role', 'statusM']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValue = false
                alert('Missing sparameter: ' + arrInput[i])
                break
            }
        }
        return isValue
    }

    handleSaveUSer = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //call api edit user
            this.props.editUser(this.state)
        }
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-container-user'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeAddUser(event, 'email') }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                disabled
                                value={this.state.password}
                                type='password' onChange={(event) => { this.handleOnChangeAddUser(event, 'password') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                value={this.state.firstName}
                                type='text' onChange={(event) => { this.handleOnChangeAddUser(event, 'firstName') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                value={this.state.lastName}
                                type='text' onChange={(event) => { this.handleOnChangeAddUser(event, 'lastName') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Phone </label>
                            <input
                                value={this.state.phone}
                                type='text' onChange={(event) => { this.handleOnChangeAddUser(event, 'phone') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Role</label>
                            <input
                                value={this.state.role}
                                type='text' onChange={(event) => { this.handleOnChangeAddUser(event, 'role') }}></input>
                        </div>
                        <div className='input-container max-width-input '>
                            <label>Status</label>
                            <input
                                value={this.state.statusM}
                                type='text' onChange={(event) => { this.handleOnChangeAddUser(event, 'statusM') }}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveUSer() }}
                    >
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


