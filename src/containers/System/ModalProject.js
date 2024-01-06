import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
class ModalProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            // email: '',
            // password: '',
            // firstName: '',
            // lastName: '',
            // phone: '',
            // role: '',
            // statusM: '',
        }
        this.listenToEmitter()
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '',
                description: '',
                // email: '',
                // password: '',
                // firstName: '',
                // lastName: '',
                // phone: '',
                // role: '',
                // statusM: '',

            })
        })
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeAddProject = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValue = true
        let arrInput = ['name', 'description']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValue = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return isValue
    }

    handleAddNewProject = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.creatNewProject(this.state, 'abc')
        }
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-container-project'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new project</ModalHeader>
                <ModalBody>
                    <div className='modal-project-body'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeAddProject(event, 'name') }}
                                value={this.state.name}
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Description</label>
                            <input
                                value={this.state.descriptionMarkdown}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'descriptionMarkdown') }}></input>
                        </div>
                        {/* <div className='input-container'>
                            <label>First name</label>
                            <input
                                value={this.state.firstName}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'firstName') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                value={this.state.lastName}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'lastName') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Phone </label>
                            <input
                                value={this.state.phone}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'phone') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Role</label>
                            <input
                                value={this.state.role}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'role') }}></input>
                        </div>
                        <div className='input-container max-width-input '>
                            <label>Status</label>
                            <input
                                value={this.state.statusM}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'statusM') }}></input>
                        </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleAddNewProject() }}
                    >
                        Save change
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProject);

