
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageProject.scss'
import * as actions from '../../../store/actions'
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'


class TableManagerProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectsRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchProjectRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listProjects !== this.props.listProjects) {
            this.setState({
                projectsRedux: this.props.listProjects
            })
        }

    }
    handleDeleteProject = (project) => {
        this.props.deleteAProjectRedux(project.id)
    }
    handleEditProject = (project) => {
        this.props.handleEditProjectFromParentKey(project)
    }

    render() {
        let arrProjects = this.state.projectsRedux
        return (
            <React.Fragment>
                <table id="TableManagerProject">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
            
                            {/* <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th> */}
                        </tr>

                        {arrProjects && arrProjects.length > 0 && arrProjects.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    
                                    {/* <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
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
            </React.Fragment>
        )


    }

}

const mapStateToProps = state => {
    return {
        listProjects: state.admin.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProjectRedux: () => dispatch(actions.fetchAllProjectsStart()),
        deleteAProjectRedux: (id) => dispatch(actions.deleteAProject(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerProject);


