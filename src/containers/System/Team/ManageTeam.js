import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageTeam.scss'
import { CommonUtils } from '../../../utils'
import { createNewProjectService } from '../../../services/userService'
import { toast } from 'react-toastify'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import TableManageTeam from './TableManageTeam';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            imageBase64: '',
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

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
    handleSaveNewProject = async () => {
        // console.log('An check state: ', this.state)
        let res = await createNewProjectService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add a new team success!')
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
            })
        } else {
            toast.error('Something wrongs ...')
            console.log('>> An check res: ', res)
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    render() {
        return (
            <div className='manage-team-container'>
                <div className='mp-title'>Quản lý nhóm</div>

                <div className='add-new-team row'>
                    <div className='col-6 form-group'>
                        <label>Tên nhóm</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh nhóm</label>
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
                    <TableManageTeam />
                    <div className='col-12'>
                        <button className='btn-save-team'
                            onClick={() => this.handleSaveNewProject()}
                        >Save</button>
                    </div>
                </div>



            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);
