import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import * as React from 'react';
import { toast } from 'react-toastify'
import './ProjectManage.scss'

import { getAllProjectService, createNewProjectService, deleteProject, editProject } from '../../../services/userService';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { emitter } from '../../../utils/emitter';
import ModalEditProject from './ModalEditProject';
import Tooltip from '@mui/material/Tooltip';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ProjectManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrProjects: [],
            isOpenModalProject: false,
            isOpenModalEditProject: false,
            projectEdit: {},
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            imageBase64: '',
        }
    }
    state = {

    }
    async componentDidMount() {
        await this.getAllProjectFormReact()
    }

    getAllProjectFormReact = async () => {
        let response = await getAllProjectService()
    
        if (response && response.errCode === 0) {
            //setState la ham bat dong bo
            this.setState({
                arrProjects: response.data,
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
            let response = await createNewProjectService(data)
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
                await this.getAllProjectFormReact();
                toast.success('Delete a project success!')
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditProject = async(project) => {
        this.setState({
            isOpenModalEditProject: true,
            projectEdit: project
        })
    }

    handleSaveNewProject = async () => {
        // console.log('An check state: ', this.state)
        let res = await createNewProjectService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add a new project success!')
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
            })
            await this.getAllProjectFormReact()
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } else {
            toast.error('Something wrongs ...')
            console.log('>> An check res: ', res)
        }
    }

    doEditProject = async (project) => {
        try {
            console.log('project', project);
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
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    render() {

        let arrProjects = this.state.arrProjects
        return (

            <div
                className="projects-container"
            >

                {
                    this.state.isOpenModalEditProject &&
                    <ModalEditProject
                        isOpen={this.state.isOpenModalEditProject}
                        toggleFromParent={this.toggleEditProjectModal}
                        currentProject={this.state.projectEdit}
                        editProject={this.doEditProject}
                    />
                }

                <div className='title text-center'>
                    Projects
                </div>
                <div className='add-new-project row'>
                    <div className='col-6 form-group'>
                        <label>Tên dự án</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh dự án</label>
                        <input className='form-control' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}></input>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px', paddingTop: '15px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                <div className='projects-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
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
                                        <td dangerouslySetInnerHTML={{ __html: item.descriptionHTML }} />
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
                    <div className='col-12'>
                        <button className='btn-save-project'
                            onClick={() => this.handleSaveNewProject()}
                        >Save</button>
                    </div>
                </div>
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
