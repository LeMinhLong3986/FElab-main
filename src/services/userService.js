import axios from '../axios'
// import axios from "axios";


export const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
export const getAllUser = (inputId) => {
    //template string
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
export const creatNewUserService = (data) => {
    console.log('check data post', data)
    return axios.post('/api/create-new-user', data)
}
export const deleteUser = (userId) => {
    return axios.delete('/api/delete-user'
        , {
            data: {
                id: userId
            }
        })
}
export const editUser = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
export const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
export const saveDetailMemberService = (data) => {
    return axios.post('/api/save-infor-members', data)
}

export const getDetailInforMember = (inputId) => {
    return axios.get(`/api/get-detail-member-by-id?id=${inputId}`)
}

// Long lam
export const getAllProjectService = async () => {
    return await axios.get('/api/get-all-project')
}
export const createNewProjectService = async (data) => {
    return await axios.post('/api/create-new-project', data)
}
export const deleteProject = async (projectId) => {
    console.log('projectId', projectId);
    return await axios.delete('/api/delete-project'
        , {
            data: {
                id: projectId
            }
        })
}

export const editProject = (inputData) => {
    return axios.put('/api/edit-project', inputData)
}

export const saveDetailProjectService = (data) => {
    return axios.post('/api/save-infor-projects', data)
}

export const getDetailInforProject = (inputId) => {
    return axios.get(`/api/get-detail-project-by-id?id=${inputId}`)
}

export const getAllDetailProjectById = (inputId) => {
    return axios.get(`/api/get-detail-project-by-id?id=${inputId}`)
}