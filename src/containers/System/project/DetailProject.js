import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailProject.scss'
class DetailProject extends Component {
    // Long lam
    constructor(props) {
        super(props);
        this.state = {
            arrUserId: [],
            dataDetailProject: {},
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;

            let res = await getAllDetailProjectById({
                id: id
            });


            if (res && res.errCode ===  0) {
                let data = res.data;
                let arrUserId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.userProject;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrUserId.push(item.userId)
                        })
                    }
                }

                this.setState({
                    dataDetailProject: res.data,
                    arrUserId: arrUserId,
                })
            }
        }    
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { arrUserId, dataDetailProject } = this.state;

        let { language } = this.props;
        return (
            <div className="detail-project-container">
                <HomeHeader />
                <div className="detail-project-body">
                    <div className="description-project">
                        {dataDetailProject && !_.isEmpty(dataDetailProject)
                            &&
                            <>
                                <div>{dataDetailProject.name}</div>
                                <div dangerouslySetInnerHTML={{__html: dataDetailProject.descriptionHTML}}>

                                </div>

                            </>
                        }

                    </div>

                    {arrUserId && arrUserId.length > 0 &&
                        arrUserId.map((item,index) => {
                            return (
                                <div className='each-user' key={index}>
                                    <div className='us-content-left'>
                                        <div className='profile-user'>
                                            <ProfileUser
                                                userId={item}
                                                isShowDescriptionUser={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}

                                            />
                                        </div>
                                    </div>
                                    <div className='us-content-right'>
                                        <div className='user-schdule'>
                                            <UserSchedule
                                                userIdFromParent={item}
                                            />

                                        </div>
                                        <div className='user-extra-infor'>
                                            <UserExtraInfor
                                                userIdFromParent={item}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject);
