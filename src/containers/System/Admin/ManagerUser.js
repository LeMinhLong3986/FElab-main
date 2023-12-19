
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerUser.scss'
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { getAllUser } from '../../../services/userService';
import { getDetailInforMember } from '../../../services/userService'
import { CRUD_ACTIONS } from '../../../utils/constant';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagerUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
            listMembers: [],
            hasOldData: false
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            let dataSelect = this.buildDataInputSelect(this.props.listUsers)
            this.setState({
                listMembers: dataSelect
            })
        }
        if (prevProps.allRequiredUserInfor !== this.props.allRequiredUserInfor) {
            let { resProject }=this.props.allRequiredUserInfor;

            let dataSelectProject = this.buildDataInputSelect(resProject, 'PROJECT')

            this.setState({
                listProject: dataSelectProject
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailMember({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            userId: this.state.selectedOption.value,
            projectId: this.state.selectedProject && this.state.selectedProject.value ? this.state.selectedProject.value: '',

        })
        // console.log('check state: ', this.state)
    }
    handleChangeSelect = async (selectedOption) => {

        this.setState({ selectedOption })
        let { listProject } = this.state;
        let res = await getDetailInforMember(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            let projectId = '', selectedProject = '';

            if (res.data.User_Infor) {
                projectId = res.data.User_Infor.projectId;

                selectedProject = listProject.find(item => {
                    return item && item.value === projectId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                selectedProject: selectedProject
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                selectedProject: ''
            })
        }
        console.log('selected option: ', res)
    }
    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value })
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                object.label = `${item.firstName} ${item.lastName}`
                object.value = item.id
                result.push(object)
            })
            // Long lam
            if (type === 'PROJECT') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }

        
        return result
    }
    render() {
        let { hasOldData } = this.state
        let arrUsers = this.state.usersRedux
        // console.log('members', this.state)
        return (
            <React.Fragment>
                <div className='manage-user-container'>
                    <div className='manage-user-title'>
                        Tao them thong tin thanh vien
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chon thanh vien</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listMembers}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Thong tin gioi thieu</label>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            >
                                adsdadasdasd
                            </textarea>
                        </div>
                    </div>
                    <div className='manage-user-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                        <button onClick={() => this.handleSaveContentMarkdown()}
                            className='save-content-user'
                        >
                            Luu thong tin
                        </button>
                    </div>
                </div>

            </React.Fragment>
        )


    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: (id) => dispatch(actions.fetchAllUsersStart()),
        saveDetailMember: (data) => dispatch(actions.saveDetailMember(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerUser);


