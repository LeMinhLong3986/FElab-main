import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import { getAllCodeService } from '../../../services/projectService'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'

import './ProjectRedux.scss'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import * as actions from '../../../store/actions'
import TableManageProject from './TableManageProject';



import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';

// const sexs = [
//     {
//         value: 'M',
//         label: 'Nam'
//     },
//     {
//         value: 'F',
//         label: 'Nữ'
//     },
//     {
//         value: 'O',
//         label: 'Khác'
//     },
// ];
const statusProject = [
    {
        value: '1',
        label: 'Active'
    },
    {
        value: '0',
        label: 'None'
    },
];
// const roleLab = [
//     {
//         value: 'admin',
//         label: 'Quản lý'
//     },
//     {
//         value: 'Project',
//         label: 'Nhân viên'
//     },
// ];
class ProjectRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            // firstName: '',
            // lastName: '',
            // email: '',
            // password: '',
            // role: '',
            // phone: '',
            // sex: '',
            // isActive: '',
            // // showPassword: false,

            // genderArr: [],
            // roleArr: [],
            // positionArr: [],
            previewImgURL: '',
            isOpen: false,

            action: '',
            ProjectEditId: '',
        }

    }
    handleChange = (event) => {
        this.setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

    }


    handleSubmit = (event) => {
        event.preventDefault();
    }
    handleClickShowPassword = (event) => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    // handleClickShowPassword = () => this.setShowPassword((show) => !show);

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async componentDidMount() {
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('check res: ', res)
        // } catch (e) {
        //     console.log(e)
        // }
        // this.props.getGenderStart();
        // this.props.getPositionStart()
        // this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.genderRedux !== this.props.genderRedux) {
        //     this.setState({
        //         genderArr: this.props.genderRedux
        //     })
        // }
        // if (prevProps.roleRedux !== this.props.roleRedux) {
        //     this.setState({
        //         roleArr: this.props.roleRedux
        //     })
        // }
        // if (prevProps.positionRedux !== this.props.positionRedux) {
        //     this.setState({
        //         positionArr: this.props.positionRedux
        //     })
        // }
        if (prevProps.listProjects !== this.props.listProjects) {
            // let arrGenders = this.props.genderRedux
            // let arrRoles = this.props.roleRedux
            // let arrPositions = this.props.positionRedux
            this.setState({
                name: '',
                // firstName: '',
                // lastName: '',
                // email: '',
                // password: '',
                // role: '',
                // phone: '',
                // sex: '',
                // isActive: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveProject = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state
        //fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewProject({
                name: this.state.name,
                // firstName: this.state.firstName,
                // lastName: this.state.lastName,
                // email: this.state.email,
                // phone: this.state.phone,
                // role: this.state.role,
                // isActive: this.state.isActive,
                // password: this.state.password,
                // deleteAt: this.state.deleteAt,
                // avatar: this.state.avatar,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAProjectRedux({
                id: this.state.ProjectEditId,
                name: this.state.name,
                // firstName: this.state.firstName,
                // lastName: this.state.lastName,
                // email: this.state.email,
                // phone: this.state.phone,
                // role: this.state.role,
                // isActive: this.state.isActive,
                // password: this.state.password,
                // deleteAt: this.state.deleteAt,
                // avatar: this.state.avatar,
            })
        }

    }
    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['name']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }
    handleEditProjectFromParent = (project) => {
        let imageBase64 = ''
        if (Project.image) {
            imageBase64 = new Buffer(project.image, 'base64').toString('binary')
        }
        this.setState({
            ProjectEditId: project.id,
            name: project.name,
            // firstName: Project.firstName,
            // lastName: Project.lastName,
            // email: Project.email,
            // phone: Project.phone,
            // role: Project.role,
            // isActive: Project.isActive,
            // password: 'HARDCODE',
            deleteAt: project.deleteAt,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: imageBase64,
        })
    }
    render() {
        // console.log('check state: ', this.state)
        // let genders = this.state.genderArr;
        // let roles = this.state.roleArr
        // let positions = this.state.positionArr
        let language = this.props.language;
        // let isLoadingGender = this.props.isLoadingGender
        // console.log('check props from redux', this.props.genderRedux);
        return (
            < div className='project-redux-container' >
                <div className="title" >
                    Manage project with redux
                </div>
                <div className='project-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <form
                                autoComplete="off"
                                noValidate
                                onSubmit={() => this.handleSubmit()}
                            >
                                <Card>
                                    <CardHeader
                                        subheader="The information can be edited"
                                        title="Profile"
                                    />
                                    <CardContent sx={{ pt: 0 }}>
                                        <Box sx={{ m: -1.5 }}>


                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                {/*email*/}
                                                <Grid
                                                    xs={12}
                                                    md={6}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        label="Name"
                                                        name="name"
                                                        onChange={(event) => this.handleChange(event)}
                                                        required
                                                        value={this.state.name}
                                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    />
                                                </Grid>
                                                {/*password*/}
                                                {/* <Grid
                                                    xs={12}
                                                    md={6}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        label="Password"
                                                        name="password"
                                                        onChange={(event) => this.handleChange(event)}
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        value={this.state.password}
                                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    />


                                                    {/* <FormControl fullWidth required sx={{}} variant="outlined" >
                                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={(event) => this.handleClickShowPassword(event)}
                                                                        onMouseDown={(event) => this.handleMouseDownPassword(event)}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Password"
                                                            onChange={(event) => this.handleChange(event)}
                                                            value={this.state.password}
                                                        />
                                                    </FormControl> */}
                                                {/* </Grid>
                                                {/*firstName*/}
                                                

                                                {/* <Grid
                                                    xs={12}
                                                    md={6}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        label="Positions"
                                                        name="position"
                                                        onChange={(event) => this.handleChange(event)}
                                                        required
                                                        select
                                                        SelectProps={{ native: true }}
                                                        value={positions}
                                                    >
                                                        {positions.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid> */}


                                                {/* <Grid
                                                    xs={12}
                                                    md={6}
                                                >
                                                    <Box
                                                        sx={{ width: '20px' }}
                                                    // fullWidth
                                                    // label="Role"
                                                    // name="role"
                                                    // onChange={(event) => this.handleChange(event)}
                                                    // required
                                                    // select
                                                    // SelectProps={{ native: true }}
                                                    // value={this.state.sexs}
                                                    >
                                                        <select >
                                                            {roles && roles.length > 0 &&
                                                                roles.map((item, index) => {
                                                                    return (
                                                                        <option key={index}>{item.valueVi}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </Box>
                                                </Grid> */} 

                                                <Grid xs={12} md={2}>
                                                    <div>
                                                        <input
                                                            id='previewImg'
                                                            type='file'
                                                            hidden
                                                            onChange={(event) => this.handleOnChangeImage(event)}
                                                        />
                                                        <label className='label-upload' htmlFor='previewImg'>
                                                            Tải ảnh <i className='fas fa-upload' />
                                                        </label>
                                                        <div
                                                            className='preview-image'
                                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                            onClick={() => this.openPreviewImage()}
                                                        >
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                    <Divider sx={{ my: '1.2rem' }} />
                                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                                        <Button variant="contained"
                                            sx={{
                                                borderRadius: '12px',
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                bgcolor: 'rgb(99, 102, 241)',
                                                fontSize: '16px',
                                                '&:hover': {
                                                    bgcolor: '#3c40c6'
                                                }
                                            }}
                                            onClick={() => this.handleSaveProject()}>
                                            {this.state.action === CRUD_ACTIONS.EDIT ? 'Save details' : 'Edit project'}
                                            {/* Save details */}
                                        </Button>
                                    </CardActions>
                                    <Divider sx={{ my: '1.2rem' }} />
                                    <Box sx={{ height: '330px' }}>
                                        <TableManageProject
                                            handleEditProjectFromParentKey={this.handleEditProjectFromParent} />
                                    </Box>
                                </Card>
                            </form>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && <Lightbox mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })} />}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        // genderRedux: state.admin.genders,
        // isLoadingGender: state.admin.isLoadingGender,
        // roleRedux: state.admin.roles,
        // positionRedux: state.admin.positions,
        listProjects: state.admin.Projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // getPositionStart: () => dispatch(actions.fetchPositionStart()),
        // getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewProject: (data) => dispatch(actions.createNewProject(data)),
        fetchProjectRedux: () => dispatch(actions.fetchAllProjectsStart()),
        editAProjectRedux: (data) => dispatch(actions.editAProject(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRedux);
