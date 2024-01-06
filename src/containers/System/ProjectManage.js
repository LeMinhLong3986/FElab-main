import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import * as React from 'react';

import './ProjectManager.scss'

import { getAllProject, creatNewProjectService, deleteProject, editProject } from '../../services/userService';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalProject from './ModalProject';
import { emitter } from '../../utils/emitter'
import ModalEditProject from './ModalEditProject';
import Tooltip from '@mui/material/Tooltip'
class ProjectManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrProjects: [],
            isOpenModalProject: false,
            isOpenModalEditProject: false,
            projectEdit: {}
        }
    }
    state = {

    }
    async componentDidMount() {
        await this.getAllProjectFormReact()
    }

    getAllProjectFormReact = async () => {
        let response = await getAllProject('All')
        if (response && response.errCode === 0) {
            //setState la ham bat dong bo
            this.setState({
                arrProjects: response.projects,
            })
        }
    }
    handleAddNewProjects = () => {
        this.setState({
            isOpenModalProject: true,
        })
    }
    toggleProjectModal = () => {
        this.setState({
            isOpenModalProject: !this.state.isOpenModalProject,
        })
    }
    toggleEditProjectModal = () => {
        this.setState({
            isOpenModalEditProject: !this.state.isOpenModalEditProject
        })
    }

    creatNewProject = async (data) => {
        try {
            let response = await creatNewProjectService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllProjectFormReact()
                this.state({
                    isOpenModalProject: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteProject = async (project) => {
        try {
            let res = await deleteProject(project.id)
            if (res && res.errCode === 0) {
                await this.getAllProjectFormReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditProject = async(project) => {
        try {
            let res = await deleteProject(project.id)
            if (res && res.errCode === 0) {
                await this.getAllProjectFormReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    doEditProject = async (project) => {
        try {
            let res = await editProject(project)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditProject: false,

                })
                await this.getAllProjectFormReact()
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

        let arrProjects = this.state.arrProjects
        return (

            <div
                className="projects-container"
            >
                <ModalProject
                    isOpen={this.state.isOpenModalProject}
                    toggleFromParent={this.toggleProjectModal}
                    creatNewProject={this.creatNewProject}
                />
                {
                    this.state.isOpenModalEditProject &&
                    <ModalEditProject
                        isOpen={this.state.isOpenModalEditProject}
                        toggleFromParent={this.toggleEditProjectModal}
                        currentProject={this.state.ProjectEdit}
                        editProject={this.doEditProject}
                    />
                }

                <div className='title text-center'>
                    Projects
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
                        onClick={() => this.handleAddNewProjects()}>
                        Add New Projects
                    </Button>

                </div>
                <div className='projects-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                {/* <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th> */}
                            </tr>

                            {arrProjects && arrProjects.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.descriptionMarkdown}</td>
                                        {/* <td>{item.lastName}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.role}</td>
                                        <td>{item.isActive}</td> */}
                                        <td>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                <Tooltip title='Edit this projects' >
                                                    <EditIcon
                                                        sx={{
                                                            color: '#F79F1F',
                                                            borderColor: '#F79F1F',
                                                            '&:hover': { borderColor: '#EE5A24' },
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            
                                                            this.handleEditProject(item)
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title='Delete this projects' >
                                                    <DeleteIcon
                                                        sx={{
                                                            color: '#eb2f06',
                                                            borderColor: '#e55039',
                                                            '&:hover': { borderColor: '#b71540' },
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            this.handleDeleteProject(item)
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectManage);
export default connect(mapStateToProps, mapDispatchToProps)(ProjectManage)
