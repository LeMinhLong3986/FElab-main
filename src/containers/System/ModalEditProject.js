import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash';

class ModalEditProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: '',
            descriptionMarkdown: '',
            // email: '',
            // password: '',
            // firstName: '',
            // lastName: '',
            // phone: '',
            // role: '',
            // statusM: '',
        }
    }

    componentDidMount() {
        let project = this.props.currentProject
        if (project && !_.isEmpty(project)) {
            this.setState({
                id: project.id,
                name: project.name,
                descriptionMarkdown: project.descriptionMarkdown,
                // email: project.email,
                // password: 'harcode',
                // firstName: project.firstName,
                // lastName: project.lastName,
                // phone: project.phone,
                // role: project.role,
                // statusM: project.statusM,
            })
        }
        console.log('didmount edit modal', this.props.currentProject)
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
        let arrInput = ['name']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValue = false
                alert('Missing sparameter: ' + arrInput[i])
                break
            }
        }
        return isValue
    }

    handleSaveProject = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //call api edit Project
            this.props.editProject(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new Project</ModalHeader>
                <ModalBody>
                    <div className='modal-project-body'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeAddProject(event, 'name') }}
                                value={this.state.name}
                                disabled
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Descirption</label>
                            <input
                                disabled
                                value={this.state.descriptionMarkdown}
                                type='text' onChange={(event) => { this.handleOnChangeAddProject(event, 'descriptionMarkdown') }}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveProject() }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProject);
