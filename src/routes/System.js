import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManagerUser from '../containers/System/Admin/ManagerUser';
import Header from '../containers/Header/Header';
import ManagerSchedule from '../containers/System/Admin/ManagerSchedule';

import ManageTeam from '../containers/System/Team/ManageTeam';
import ProjectManage from '../containers/System/project/ProjectManage'

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/user-admin" component={ManagerUser} />
                            <Route path="/system/manage-schedule" component={ManagerSchedule} />
                            <Route path="/system/manage-project" component={ProjectManage} />
                            <Route path="/system/manage-team" component={ManageTeam} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
