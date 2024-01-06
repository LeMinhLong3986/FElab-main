import actionTypes from './actionTypes';
import {
    getAllCodeService, creatNewUserService,
    getAllUser, deleteUser, editUser, saveDetailMemberService,
    getAllProjectService, deleteProject,
    createNewProjectService, editProject, saveDetailProjectService
} from '../../services/userService'
import { toast } from 'react-toastify'
import { dispatch } from '../../redux';
import { reject } from 'lodash';
export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispacth, getState) => {
        try {
            dispacth({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispacth(fetchGenderSuccess(res.data))
            } else {
                dispacth(fetchGenderFailed())
            }
        } catch (e) {
            dispacth(fetchGenderFailed())
            console.log('fetGenderStart error ', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const fetchPositionStart = () => {
    return async (dispacth, getState) => {
        try {

            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispacth(fetchPositionSuccess(res.data))
            } else {
                dispacth(fetchPositionFailed())
            }
        } catch (e) {
            dispacth(fetchPositionFailed())
            console.log('fetchPositionFailed error ', e)
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispacth, getState) => {
        try {

            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispacth(fetchRoleSuccess(res.data))
            } else {
                dispacth(fetchRoleFailed())
            }
        } catch (e) {
            dispacth(fetchRoleFailed())
            console.log('fetchRoleFailed error ', e)
        }
    }
}


export const createNewUser = (data) => {
    return async (dispacth, getState) => {
        try {

            let res = await creatNewUserService(data)

            if (res && res.errCode === 0) {
                toast.success('Creat a new user success')
                dispacth(saveUserSuccess())
                dispacth(fetchAllUsersStart())
            } else {
                dispacth(saveUserFailed())
            }
        } catch (e) {
            dispacth(saveUserFailed())
            console.log('fetchRoleFailed error ', e)
        }
    }
}


export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('All')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error('fetch all user error!')
                dispatch(fetchAllUsersFailed())
            }

        } catch (e) {
            toast.error('Fetch all user error!')
            dispatch(fetchAllUsersFailed())
            console.log('fetchAllUserFailed error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const fetchRequiredUserInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_USER_INFOR_SUCCESS,
    users: data
})
export const fetchRequiredUserInforFailed = (data) => ({
    type: actionTypes.FETCH_REQUIRED_USER_INFOR_FAILED,
    users: data
})
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId)
            if (res && res.errCode === 0) {
                toast.success('Delete a user success')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('Delete all user error!')
                dispatch(deleteUserFailed())

            }
        } catch (e) {
            toast.error('Delete all user error!')
            dispatch(deleteUserFailed())
            console.log('Delete user failed', e)
        }
    }
}
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data)
            if (res && res.errCode === 0) {
                toast.success('Edit a user success')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('Edit all user error!')
                dispatch(editUserFailed())

            }
        } catch (e) {
            toast.error('Edit all user error!')
            dispatch(editUserFailed())
            console.log('Edit user failed', e)
        }
    }
}
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const saveDetailMember = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailMemberService(data)
            if (res && res.errCode === 0) {
                toast.success('Save infor member success')
                dispatch({ type: actionTypes.SAVE_DETAIL_MEMBER_SUCCESS })
            } else {
                toast.error('Save infor member error!')
                dispatch({ type: actionTypes.dispatch({ type: actionTypes.SAVE_DETAIL_MEMBER_SUCCESS }) })
            }

        } catch (e) {
            toast.error('Save infor member error!')
            dispatch({ type: actionTypes.dispatch({ type: actionTypes.SAVE_DETAIL_MEMBER_SUCCESS }) })
            console.log('SAVE_DETAIL_MEMBER_SUCCESS error', e)
        }
    }
}

// Long lam
export const getRequiredUserInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_USER_INFOR_START })
            let resProject = await getAllProjectService();
            if (resProject && resProject.errCode === 0)
            {
                let data = {
                    resProject: resProject.data
                }
                dispatch(fetchRequiredUserInforSuccess(data))
            } else {
                dispatch(fetchRequiredUserInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredUserInforFailed());
        }
    }
}

export const createNewProject = (data) => {
    return async (dispacth, getState) => {
        try {

            let res = await createNewProjectService(data)

            if (res && res.errCode === 0) {
                toast.success('Creat a new project success')
                dispacth(saveProjectSuccess())
                dispacth(fetchAllProjectsStart())
            } else {
                dispacth(saveProjectFailed())
            }
        } catch (e) {
            dispacth(saveProjectFailed())
            console.log('fetchRoleFailed error ', e)
        }
    }
}

export const saveProjectFailed = () => ({
    type: actionTypes.CREATE_PROJECT_FAILED
})
export const saveProjectSuccess = () => ({
    type: actionTypes.CREATE_PROJECT_SUCCESS
})

export const fetchAllProjectsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProjectService()
       
            if (res && res.errCode === 0) {
               
                dispatch(fetchAllProjectsSuccess(res.data.reverse()))
                
            } else {
                toast.error('fetch all project error!')
                dispatch(fetchAllProjectsFailed())
            }

        } catch (e) {
            toast.error('Fetch all project error!')
            dispatch(fetchAllProjectsFailed())
            console.log('fetchAllProjectFailed error', e)
        }
    }
}

export const fetchAllProjectsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PROJECT_SUCCESS,
    projects: data
})
export const fetchAllProjectsFailed = () => ({
    type: actionTypes.FETCH_ALL_PROJECT_FAILED,
})

export const fetchRequiredProjectInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_PROJECT_INFOR_SUCCESS,
    users: data
})
export const fetchRequiredProjectInforFailed = (data) => ({
    type: actionTypes.FETCH_REQUIRED_PROJECT_INFOR_FAILED,
    users: data
})

export const deleteAProject = (projectId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteProject(projectId)
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success('Delete a project success')
                console.log('123');
                dispatch(deleteProjectSuccess())
                dispatch(fetchAllProjectsStart())
            } else {
                toast.error('Delete all project error!')
                dispatch(deleteProjectFailed())

            }
        } catch (e) {
            toast.error('Delete all project error!')
            dispatch(deleteProjectFailed())
            console.log('Delete project failed', e)
        }
    }
}
export const deleteProjectSuccess = (data) => ({
    type: actionTypes.DELETE_PROJECT_SUCCESS,
})
export const deleteProjectFailed = () => ({
    type: actionTypes.DELETE_PROJECT_FAILED,
})

export const editAProject = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editProject(data)
            if (res && res.errCode === 0) {
                toast.success('Edit a project success')
                dispatch(editProjectSuccess())
                dispatch(fetchAllProjectsStart())
            } else {
                toast.error('Edit all project error!')
                dispatch(editProjectFailed())

            }
        } catch (e) {
            toast.error('Edit all project error!')
            dispatch(editProjectFailed())
            console.log('Edit project failed', e)
        }
    }
}
export const editProjectSuccess = (data) => ({
    type: actionTypes.EDIT_PROJECT_SUCCESS,
})
export const editProjectFailed = () => ({
    type: actionTypes.EDIT_PROJECT_FAILED,
})

export const saveDetailProject = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailProjectService(data)
            if (res && res.errCode === 0) {
                toast.success('Save infor project success')
                dispatch({ type: actionTypes.SAVE_DETAIL_PROJECT_SUCCESS })
            } else {
                toast.error('Save infor project error!')
                dispatch({ type: actionTypes.dispatch({ type: actionTypes.SAVE_DETAIL_PROJECT_SUCCESS }) })
            }

        } catch (e) {
            toast.error('Save infor project error!')
            dispatch({ type: actionTypes.dispatch({ type: actionTypes.SAVE_DETAIL_PROJECT_SUCCESS }) })
            console.log('SAVE_DETAIL_PROJECT_SUCCESS error', e)
        }
    }
}
